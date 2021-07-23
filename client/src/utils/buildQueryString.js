function buildQueryString(query = {}) {
    return  Object
        .keys(query)
        .reduce((acc, curr) => acc ? `${acc}&${curr}=${query[curr]}` : `?${curr}=${query[curr]}`, '')
}

export default buildQueryString
