export default function bookValidation(bookInfo) {
    const bookErrors = {}
    const title_pattern = /^[A-Za-z ]{3,}$/
    const author_pattern = /^[A-Za-z ]{3,}$/
    const publication_year_pattern = /^\d{4}$/
    const price_pattern = /^\d+(\.\d{1,2})?$/
    const details_pattern = /.{50,}$/

    if(!title_pattern.test(bookInfo.title)){
        bookErrors.title = "Book title must have been 3 letter long"
    }
    if(!author_pattern.test(bookInfo.author)){
        bookErrors.author = "Author name must have been 3 letter long"
    }
    if(!publication_year_pattern.test(parseInt(bookInfo.publicationYear))){
        bookErrors.publicationYear = "Publication year contain 4 digit number such as 1954"
    }
    if(!price_pattern.test(parseInt(bookInfo.price))){
        bookErrors.price = "Required number as price"
    }
    if(!details_pattern.test(bookInfo.details)){
        bookErrors.details = "A Book Details must be 50 caracter long"
    }

    return bookErrors
}