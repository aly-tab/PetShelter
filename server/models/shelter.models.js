const mongoose = require('mongoose');

const ShelterSchema = new mongoose.Schema({
    image: {
        type: String
    },
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
    },
    poster_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    owner_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"  
    }
}, {timestamps: true});

module.exports.Shelter = mongoose.model('Shelter', ShelterSchema);