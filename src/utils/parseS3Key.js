
const parseS3Key = (path) => {
    let str = path.split("amazonaws.com/");
    return str[1]
}

module.exports = parseS3Key;