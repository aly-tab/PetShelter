const mongoose = require('mongoose');

const ExamSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [
            true,
            "Name is required"
        ],
        minlength: [
            2, 
            "Name must be at least 2 characters"
        ]
    },
    type: {
        type: String,
        required: [
            true,
            "Type is required"
        ],
        minlength: [
            2, 
            "Type must be at least 2 characters"
        ]
    },
    description: {
        type: String,
        required: [
            true,
            "Description is required"
        ],
        minlength: [
            2, 
            "Description must be at least 5 characters"
        ]
    },
    skill1: {
        type: String,

    },
    skill2: {
        type: String,
    },
    skill3: {
        type: String,
    }
}, {timesteamps: true})

module.exports.Exam = mongoose.model('Exam', ExamSchema);