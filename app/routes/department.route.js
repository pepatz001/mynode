var department = require('../controllers/department.controller')

module.exports = (app) => {
    var path = '/api/department'

    app.get(path + '/getContent', department.getContent)
    app.post(path + '/create', department.create)
    app.delete(path + '/delete/:name', department.delete)
    app.delete(path + '/deleteContent/:id', department.deleteContent)
    app.put(path + '/edit/', department.update)
    app.put(path + '/editContent/', department.updateContent)
}