const QueryFile = require('pg-promise').QueryFile
const path = require('path')

function sql(file) {
    const fullPath = path.join(__dirname, file)

    const options = {
        minify: true,
        params: {
            schema: 'public'
        }
    }

    const qf = new QueryFile(fullPath, options)

    if (qf.error) {
        console.error(qf.error)
    }

    return qf
}

module.exports = {
    users: {
        getAll: sql('users/getAll.sql'),
        drop: sql('users/drop.sql'),
        createUser: sql("users/createUser.sql"),
        findByIdAndEmail: sql('users/findByIdAndEmail.sql'),
        findByEmail: sql('users/findByEmail.sql'),
        findByPodcastUsername: sql('users/findByPodcastUsername.sql'),
        findById: sql('users/findById.sql'),
        findByUsername: sql('users/findByUsername.sql'),
        changeUsername: sql('users/changeUsername.sql')
    },
    tokens: {
        getAll: sql('tokens/getAll.sql')
    },
    userRoles: {
        create: sql('userRoles/create.sql'),
        empty: sql('userRoles/empty.sql'),
        init: sql('userRoles/init.sql'),
        drop: sql('userRoles/drop.sql'),
        add: sql('userRoles/add.sql')
    },
}
