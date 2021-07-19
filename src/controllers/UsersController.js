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
            const configurations = await this.usersService.getConfigurations(id)
            // console.log('configurations', configurations)
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

    async deleteConfiguration(req, res, next) {
        try {
            const {body, user: {id}, query: {id: configId}} = req
            await this.usersService.deleteConfiguration(id, configId)
            return res.sendStatus(200)
        } catch (err) {
            console.error('err', err)
            next(err)
        }
    }

    async updateConfiguration(req, res, next) {
        try {
            const {body, user: {id}} = req
            await this.usersService.updateConfiguration(id, body.feed_configuration_id, body)
            return res.sendStatus(200)
        } catch (err) {
            console.error('err', err)
            next(err)
        }
    }
}

module.exports = UsersController
