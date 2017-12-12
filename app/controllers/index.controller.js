var path = require("path")

exports.index = (req, res) => {
    res.send('This is index!')
}

exports.help = (req, res) => {
    res.send('Help me')
}

exports.home = (req, res) => {
    if (req.user) {
          // res.sendFile((path.join(__dirname + '/../views/home.html')))
          res.render((path.join(__dirname + '/../views/home.html')), { username: req.user.username })
          
    }
    else {
           res.json({name: 'sira'})
    }
}