const permissionsEnum = {
  writeAccess: 'write',
  readAccess: 'read'
}

const roles = {
  superAdmin: 'SUPER_ADMIN',
  endUser: "END_USER"
}

const rolesConfig = [
  {
    roles: [roles.superAdmin],
    permissions: [permissionsEnum.writeAccess, permissionsEnum.readAccess]
  },
  {
    roles: [roles.endUser],
    permissions: [permissionsEnum.readAccess]
  }
]

const rbacConfig = {
  rolesConfig,
  debug: process.env.NODE_ENV === 'development'
}

module.exports = { permissionsEnum, roles, rolesConfig, rbacConfig }
