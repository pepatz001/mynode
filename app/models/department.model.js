import mongoose from 'mongoose';
var Schema = mongoose.Schema;

var DepartmentSchema = new Schema({
    name: String,
    content: [{
        topic: String,
        name: String,
        code: String
    }],
    created: {
        type: Date,
        default: Date.now
    },
    update: Number
}); 

mongoose.model('Department', DepartmentSchema);