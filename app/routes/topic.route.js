const topic = require('../controllers/topic.controller')
module.exports = (app) => {
      const path = '/api/topic'
      app.get(path + '/all', topic.getTopics)
      app.post(path + '/create', topic.create)
      app.get(path + '/:id', topic.getOne)
      app.put(path + '/reply/:id', topic.reply)
      app.put(path + '/delete/:id', topic.deleteComment)
      app.delete(path + '/deleteTopic/:id', topic.delete)
}