// create new file ./app/controllers/user.controller.js
var User = require('mongoose').model('User') //.model('ชื่อCollections')
var path = require("path")
var mongoose = require('mongoose')

exports.getUsers = (req, res, next) => {
    User.find((err, user) => {
        if (err) {
            console.log('Failure')
            return next(err)
        } else {
            console.log(user)
            res.json(user)
        }
    })
}

exports.create = (req, res, next) => {
    var user = new User(req.body)
    user.save((err) => {
           if (err) {
                  console.log('Failure')
                  return next(err)
           }
           else {
                  console.log('Success')
                  res.json(user)
           }
    })
}

exports.login = (req, res) => {
    if (!req.user) {
           res.sendFile((path.join(__dirname+'/../views/login.html')))
    }
    else {
           return res.redirect('/home')
    }
}

exports.logout = (req, res) => {
    req.logout()
    res.redirect('/')
}


exports.saveOAuthUserProfile = (req, profile, done) => {
    User.findOne({
               provider: profile.provider,
               providerId: profile.providerId
    }, function(err, user) {
           if (err) return done(err)
           else {
                  if (!user) {
                         var possibleUsername = profile.username 
     || (profile.email ? profile.email.split('@')[0] : '')
                         console.log('NAME: ' + profile.username)
                 User.findUniqueUsername(possibleUsername, null, (availableUsername) => {
                         profile.username = availableUsername
                         user = new User(profile)
                         user.save((err) => {
                                if (err) { return req.res.redirect('/login') }
                                return done(err, user)
                         })
                     })
                  }
                 else { return done(err, user) }
            }
    })
}

exports.delete = (req, res, next) => {
    User
    .findByIdAndRemove(req.params.id)
    .exec()
    .then(doc => {
        if(!doc) { return res.status(404).end() }
        return res.status(204).end()
    })
    .catch(err => next(err))
}

exports.update = (req, res, next) => {
    User.update({_id: req.params.id}, {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        username: req.body.username,
        email: req.body.email,
        tel: req.body.tel,
        password: req.body.password,
        department: req.body.department
    }, function(err, docs){
            if(err) res.json(err)
            else    res.status(204).end()
    })
}