var Department = require('mongoose').model('Department')

exports.getContent = (req, res, next) => {
    Department.find((err, department) => {
           if (err) {
                  console.log('Failure')
                  return next(err)
           }
           else {
                  console.log(department)
                  res.json(department)
           }
    })
}

exports.create = (req, res, next) => {
    var department = new Department(req.body)
    department.save((err) => {
           if (err) {
                  console.log('Failure')
                  return next(err)
           }
           else {
                  console.log('Success')
                  res.json(department)
           }
    })
}

exports.update = (req, res, next) => {
    Department.update({name: req.body.oldname}, {
        name: req.body.name
    }, {multi: true}, function(err, docs){
        if(err) res.json(err)
        else    res.status(204).end()
    })
}

exports.updateContent = (req, res, next) => {
    Department.update({_id: req.body.id}, {
        content: req.body.content
    }, {multi: true}, function(err, docs){
        if(err) res.json(err)
        else    res.status(204).end()
    })
}

exports.delete = (req, res, next) => {
    Department.remove({name: req.params.name}, function(err, docs){
        if(err) res.json(err)
        else    res.status(204).end()
    })
}

exports.deleteContent = (req, res, next) => {
    Department.remove({_id: req.params.id}, function(err, docs){
        if(err) res.json(err)
        else    res.status(204).end()
    })
}