function parseQueryString(str) {
    return str ? str.replace('?', '').split('&').reduce((acc, element) => {
        const [key, value] = element.split('=')
        acc[key] = value
        return acc
    }, {}) : {}
}

export default parseQueryString
