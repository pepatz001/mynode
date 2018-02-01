import mongoose from 'mongoose';
var Schema = mongoose.Schema;

var DepartmentSchema = new Schema({
    name: String,
    content: {
        topic: String,
        name: String,
        code: String
    },
    created: {
        type: Date,
        default: Date.now
    },
    update: {
        type: Number,
        default: 0
    }
}); 

mongoose.model('Department', DepartmentSchema);