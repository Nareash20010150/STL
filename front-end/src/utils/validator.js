export const v_email = (val) => {
    const EMAIL_REGEX = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/

    return EMAIL_REGEX.test(val)
}

export const v_containsNumber = (val) => {
    return /[0-9]/.test(val)
}

export const v_containsUppercase = (val) => {
    return /[A-Z]/.test(val)
}

export const v_containsLowercase = (val) => {
    return /[a-z]/.test(val)
}

export const v_containsSpecialChars = (val) => {
    return /[^a-zA-Z0-9]/.test(val)
}

export const v_required = (val) => {
    if (!val) return false
    else return true
}

export const v_inRange = (value, min, max) => {
    if (value.length >= min || value.length < max) return true
    else return false
}

export const v_min = (value, min) => {
    if (value.length >= min) return true
    else return false
}

export const v_max = (value, max) => {
    if (value.length > max) return true
    else return false
}

export const v_match = (val1, val2) => {
    if (val1 === val2) return true
    else return false
}
