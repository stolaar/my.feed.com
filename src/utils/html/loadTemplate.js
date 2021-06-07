const fs = require('fs')

function loadTemplate(templatePath) {
    return fs.readFileSync(templatePath, 'utf-8')
}

module.exports = loadTemplate
