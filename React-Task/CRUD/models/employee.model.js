"use strict";
exports.__esModule = true;
var constant_1 = require("./../constant/RegEx");
const mongoose = require('mongoose');


var employeeSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: 'This field is required.'
    },
    email: {
        type: String,
        required: 'This field is required.'
    },
    mobile: {
        type: String,
        required: 'This field is required.'
    },
    city: {
        type: String,
        required: 'This field is required.'
    },
    age: {
        type: String,
        required: 'This field is required.'
    },
    salary: {
        type: String,
        required: 'This field is required.'
    }
});

// Custom validation for email
employeeSchema.path('email').validate((val) => {
    
    return constant_1.RegEx.emailregex.test(val);
}, 'Invalid e-mail.');

employeeSchema.path('fullName').validate((val) => {
    
    return constant_1.RegEx.fullnameregex.test(val);
}, 'Invalid name.');

employeeSchema.path('mobile').validate((val) => {
    
    return constant_1.RegEx.numregex.test(val);
}, 'Invalid mobile no.');

employeeSchema.path('city').validate((val) => {
    
    return constant_1.RegEx.cityregex.test(val);
}, 'Invalid city.');

employeeSchema.path('age').validate((val) => {
    
    return constant_1.RegEx.ageregEx.test(val);
}, 'Invalid age.');

employeeSchema.path('salary').validate((val) => {
    
    return constant_1.RegEx.numregex.test(val);
}, 'Invalid salary.');


mongoose.model('Employee', employeeSchema);