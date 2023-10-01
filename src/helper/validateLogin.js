export default function validateLogin(values) {
    const userErrors = {}
    const email_pattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/

    const password_pattern = /^(?=.*[A-Za-z].*[A-Za-z])(?=.*\d)[A-Za-z\d]{5,16}$/

    if(!email_pattern.test(values.email)){
        userErrors.email = "Email is incorrect make sure it has @ sign"
    }

    if(!password_pattern.test(values.password)){
        userErrors.password = "Your password must have been at least 5 catacter,2 letter and 1 number"
    }
    return userErrors
}