class UserRolesRepository {
  constructor(model) {
    this.model = model
  }

  drop() {
    return this.model.drop()
  }

  empty() {
    return this.model.truncate()
  }

  addRole({ role = "", user_id = 1 }) {
    return this.model.create({role, user_id})
  }

  removeRole({ role = "", user_id = "" }) {
    return this.model.remove({user_id, role})
  }

  findByUserId(id) {
    return this.model.find({user_id: id})
  }

  getUserRoles(id) {
    return this.model.find({user_id: id})
  }

  getAll() {
    return this.model.selectAll()
  }
}

module.exports = UserRolesRepository;
