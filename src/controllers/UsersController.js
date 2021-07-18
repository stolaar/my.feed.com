const BaseController = require("./BaseController")
const UsersService = require("../services/users/UserService")

class UsersController extends BaseController {
    constructor(usersService = new UsersService()) {
        super()
        this.usersService = usersService
    }

    async getConfigurations(req, res, next) {
        try {
            const {user: {id}} = req
            const {configurations} = await this.usersService.getConfigurations(id)
            return res.status(200).send(configurations)
        } catch (err) {
            console.error('err', err)
            next(err)
        }
    }

    async createConfiguration(req, res, next) {
        try {
            const {body, user: {id}} = req
            const configurations = await this.usersService.createConfiguration(id, body)
            return res.status(200).send(configurations)
        } catch (err) {
            console.error('err', err)
            next(err)
        }
    }
}

module.exports = UsersController
