class UserRolesRepository {
  constructor(db, pgp) {
    this.db = db;
    this.pgp = pgp;

    // createColumnsets(pgp);
  }

  async create() {
    // const drop = await this.drop();
    const create = await this.db.none(sql.create);
    return [];
  }

  async init() {
    const count = await this.db.one(
      "SELECT count(*) FROM user_roles",
      [],
      a => +a.count
    );
    if (count > 0) {
      return null;
    }
    return this.db.result(sql.init, [], result => result.rows);
  }

  drop() {
    return this.db.none(sql.drop);
  }

  empty() {
    return this.db.none(sql.empty);
  }

  addRole({ role = "", user_id = 1 }) {
    return this.db.one(sql.add, { user_id, role });
  }

  removeRole({ role = "", user_id = "" }) {
    return this.db.result(
      "DELETE FROM user_roles WHERE user_id = $1 AND role = $2",
      [+user_id, role],
      r => r.rowCount
    );
  }

  findByUserId(id) {
    return this.db.oneOrNone(
      "SELECT * FROM user_roles WHERE user_id = $1",
      +id
    );
  }

  getUserRoles(id) {
    return this.db.any("SELECT role FROM user_roles WHERE user_id = $1", +id);
  }

  getAll() {
    return this.db.any("SELECT * FROM user_roles");
  }
}

module.exports = UserRolesRepository;
