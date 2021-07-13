function transformPosts(posts) {
    return posts.reduce((acc, curr) => {
        const currentCategoryIndex = acc.findIndex(val => val.label === curr.label)

        if(currentCategoryIndex > -1) {
            acc[currentCategoryIndex].posts = [...acc[currentCategoryIndex].posts, ...curr.posts]
        } else  {
            acc.push(curr)
        }
        return acc
    }, [])
}

module.exports = transformPosts
