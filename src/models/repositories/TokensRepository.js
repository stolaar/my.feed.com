const sql = require('../sql').tokens

// TODO: move queries to separate sql files
class TokensRepository {
    constructor(db, pgp) {
        this.db = db
        this.pgp = pgp
    }

    getAll() {
        return this.db.any(sql.getAll)
    }

    drop() {
        return this.db.any(sql.drop)
    }

    add(values) {
        return this.db.one('INSERT INTO tokens (user_id, token) VALUES (${user_id}, ${token}) RETURNING *', values)
    }

    findToken(token) {
        return this.db.any("SELECT * FROM tokens WHERE token = $1", token);
    }

    remove(token) {
        return this.db.any("DELETE FROM tokens WHERE token = $1", token);
    }
}

module.exports = TokensRepository
