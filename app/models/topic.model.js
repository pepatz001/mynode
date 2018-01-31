const  mongoose  = require('mongoose')
var Schema = mongoose.Schema

var TopicSchema = new Schema({
      topicName: {
        type: String,
        required: true,
        trim: true
      },
      description: {
        type: String
      },
      owner: {
        type: String,
        trim: true
      },
      created: {
        type: Date,
        default: Date.now
      },
      offer:[{
        offerusername: String,
        offerdescription: String,
        created: {
            type: Date,
            default: Date.now
        },
        replyOffer:[{
          offerusername: String,
          offerdescription: String,
          created: {
              type: Date,
              default: Date.now
          }
        }]
      }]
})

mongoose.model('Topic', TopicSchema)