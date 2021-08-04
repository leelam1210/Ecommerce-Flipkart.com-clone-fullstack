export const validRegister = (formAuth) => {
    const { firstName, lastName, email, password, confirmPassword } = formAuth;
    const errors = [];

    if (!firstName || !lastName) {
        errors.push("Please add First Name and Last Name!.");
    }
    // } else if ((`${firstName} ${lastName}`).length > 20) {
    //     errors.push("Your name is up to 20 chars long.");
    // }

    if (!email) {
        errors.push("Please add your email or phone number.");
    } else if (!validPhone(email) && !validateEmail(email)) {
        errors.push("Email or phone number format is incorrect.");
    }

    // if (password.length < 6) {
    //     errors.push("Password must be at least 6 chars.");
    // } else if (password !== confirmPassword) {
    //     errors.push("Confirm password did not match.");
    // }

    const msg = checkPassword(password, confirmPassword);
    if (msg) errors.push(msg);

    return {
        errMsg: errors,
        errLength: errors.length,
    }
}

export const checkPassword = (password, confirmPassword) => {
    if (password.length < 6) {
        return ("Password must be at least 6 chars.");
    } else if (password !== confirmPassword) {
        return ("Confirm password did not match.");
    }

}

export const validPhone = (phone) => {
    const re = /^[+]/g
    return re.test(phone)
}

export const validateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
