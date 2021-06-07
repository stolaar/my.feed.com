const UserService = require("../users/UserService");
const rolesConfig = require("../../config/roles")

// Role based access control service
class RBACService {
  constructor(config = rolesConfig, userService) {
    this.userService = userService || new UserService();

    this.roles = config.rolesConfig.reduce((accumulator, item) => {
      for (let role of item.roles) {
        accumulator[role] = item.permissions;
      }
      return accumulator;
    }, {});
  }

  getUserRoles(userId) {
    if (!userId) console.error("No userId defined");
    return this.userService.getUserRoles(userId);
  }

  async addUserRoles(userId, roles) {
    if (!userId || !roles) {
      console.error("userId or roles is not defined");
      return;
    }

    if (roles.length === 0) {
      console.error("roles length is 0, expected at least 1");
      return;
    }

    const userRoles = await this.getUserRoles(userId);
    console.log('userRoles', userRoles)
    for (let role of roles) {
      if (this.roles[role]) {
        if (userRoles) {
          if (!userRoles.includes({ role }))
            await this.userService.addUserRole(role, userId);
        }
        await this.userService.addUserRole(role, userId);
      } else {
        console.error(role + " role is not defined in initial config");
        return;
      }
    }
  }

  async isAllowed(userId = "", permissionId = "") {
    if (!userId || !permissionId) {
      return false;
    }

    const roles = await this.getUserRoles(userId);

    if (roles) {
      return roles.some(({ role }) => this.roles[role].includes(permissionId));
    } else {
      return false;
    }
  }

  async getUserPermissions(userId) {
    const roles = await this.getUserRoles(userId);
    return roles.reduce((acc, { role }) => {
      this.roles[role].forEach(permission => {
        if(!acc.find(val => val === permission)) acc.push(permission)
      })
      return acc
    }, [])
  }

  async middleware(
    params = { userId: "", permissionId: "" },
    error = () => {},
    success = () => {}
  ) {
    if (!params || !error || !success) {
      error();
      return;
    }
    const isAllowed = await this.isAllowed(params.userId, params.permissionId);
    if (isAllowed) {
      success();
    } else {
      error();
    }
  }
}

module.exports = RBACService;
