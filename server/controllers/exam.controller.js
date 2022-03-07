const { Exam } = require('../models/exam.model');
module.exports.list = (request, response) => {
    Exam.find({})
        .then(pets => response.json(pets))
        .catch(err => response.json(err))
}

module.exports.create = (request, response) => {
    const { name, type, description, skill1, skill2, skill3 } = request.body;
    Exam.create({
        name,
        type,
        description,
        skill1,
        skill2,
        skill3
    })
        .then(pet => {
            response.json(pet)
        })
        .catch(err => {
            response.status(400).json(err)
        })
}


module.exports.detail = (request, response) => {
    Exam.findOne({_id:request.params.id})
        .then(pet => response.json(pet))
        .catch(err => response.json(err))
}

module.exports.update = (request, response) => {
    Exam.findOneAndUpdate({_id: request.params.id}, request.body, {new:true})
        .then(updatedPet => response.json(updatedPet))
        .catch(err => response.status(400).json(err))
}

module.exports.delete = (request, response) => {
    Exam.deleteOne({_id: request.params.id})
        .then(deleteConfirmation => response.json(deleteConfirmation))
        .catch(err => response.json(err))
}