var Topic = require('mongoose').model('Topic')
var path = require("path")

exports.getTopics = (req, res, next) => {
    Topic.find((err, Topic) => {
        if (err) {
            console.log('Failure: ' + err)
            return next(err)
        }
        else {
            console.log(Topic)
            res.json(Topic)
        }
    })
}


exports.create = (req, res, next) => {
    var topic = new Topic(req.body)
    topic.save((err) => {
        if (err) {
            console.log('Failure')
            return next(err)
        }
        else {
            console.log('Success')
            res.json(topic)
        }
    })
}

exports.getOne = (req, res, next) => {
        Topic.findOne({ _id: req.params.id }, (err, data) => {
            if (err) {
                console.log('Failure: ' + err)
                return next(err)
            }
            else {
                console.log(data)
                res.json(data)
            }
        })

}

exports.reply = (req, res, next) => {
        Topic.findOneAndUpdate(
            {_id: req.params.id },
            { $push: { offer: {offerusername : req.body.reply,offerdescription: req.body.description }}}
        , (err, data) => {
            if (err) {
                console.log('Failure: ' + err)
                return next(err)
            }
            else {
                console.log(data)
                res.json(data)
            }
        })
}

exports.deleteComment = (req, res, next) => {
    Topic.update(
        {_id: req.params.id },
        { offer: req.body.offer}
    , (err, data) => {
        if (err) {
            console.log('Failure: ' + err)
            return next(err)
        }
        else {
            console.log(data)
            res.json(data)
        }
    })
}

exports.delete = (req, res, next) => {
    Topic.remove({_id: req.params.id}, function(err, docs){
        if(err) res.json(err)
        else    res.status(204).end()
    })
}

exports.update = (req, res, next) => {
    Topic.update({_id: req.params.id}, {
        topicName: req.body.topicName,
        description: req.body.description
    }, {multi: true}, function(err, docs){
        if(err) res.json(err)
        else    res.status(204).end()
    })
}