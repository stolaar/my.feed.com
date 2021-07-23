function removePostsDuplicates(posts = []) {
    return posts.reduce((acc, curr) => {
        if(!acc.find(value => value.link === curr.link)) acc.push(curr)
        return acc
    }, [])
}

module.exports = removePostsDuplicates
