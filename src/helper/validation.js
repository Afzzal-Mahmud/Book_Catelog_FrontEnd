export default function validation(values) {
    const errors = {}
    const name_pattern = /^[A-Za-z ]{3,}$/
    const email_pattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/

    const password_pattern = /^(?=.*[A-Za-z].*[A-Za-z])(?=.*\d)[A-Za-z\d]{5,16}$/

    if(!name_pattern.test(values.name)){
        errors.name = "Name must have been 3 letter long"
    }
    if(!email_pattern.test(values.email)){
        errors.email = "Email does not match make sure it has @ sign"
    }

    if(!password_pattern.test(values.password)){
        errors.password = "Your password must contain at least 2 letter and 1 number and minimum length is 5"
    }
    return errors
}