import mongoose from 'mongoose';
var Schema = mongoose.Schema;

var DepartmentSchema = new Schema({
    name: String,
    content: Object
}); 

mongoose.model('Department', DepartmentSchema);