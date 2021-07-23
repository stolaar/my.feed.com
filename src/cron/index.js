const cron = require('node-cron');
const postJobs = require('./posts')

const tasks = [...postJobs]

module.exports = () => {
    tasks.forEach(task => {
        const { executeAt, opts, handler } = task
        cron.schedule(executeAt, handler, opts).start()
    })
}
