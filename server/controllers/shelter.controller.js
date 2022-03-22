const { Shelter } = require('../models/shelter.model');

module.exports.list = (request, response) => {
    Shelter.find({})
        .then(pets => response.json(pets))
        .catch(err => response.json(err))
}

module.exports.listOwnerLimit = (request, response) => {
    Shelter.find({owner_id: request.params.id}).sort([['updatedAt', -1]])
        .then(pets => response.json(pets))
        .catch(err => response.json(err))
}

module.exports.listPosterLimit = (request, response) => {
    Shelter.find({poster_id: request.params.id}).sort([['updatedAt', -1]]).limit(10)
        .then(pets => response.json(pets))
        .catch(err => response.json(err))
}

module.exports.listOwner = (request, response) => {
    Shelter.find({owner_id: request.params.id}).sort([['updatedAt', -1]])
        .then(pets => response.json(pets))
        .catch(err => response.json(err))
}

module.exports.listPoster = (request, response) => {
    Shelter.find({poster_id: request.params.id}).sort([['updatedAt', -1]])
        .then(pets => response.json(pets))
        .catch(err => response.json(err))
}

module.exports.create = (request, response) => {
    const { image, name, type, description, skill1, skill2, skill3, poster_id, owner_id } = request.body;
    Shelter.create({
        image,
        name,
        type,
        description,
        skill1,
        skill2,
        skill3, 
        poster_id,
        owner_id
    })
        .then(pet => {
            response.json(pet)
        })
        .catch(err => {
            response.status(400).json(err)
        })
}


module.exports.detail = (request, response) => {
    Shelter.findOne({_id:request.params.id})
        .then(pet => response.json(pet))
        .catch(err => response.json(err))
}

module.exports.update = (request, response) => {
    Shelter.findOneAndUpdate({_id: request.params.id}, request.body, {new:true})
        .then(updatedPet => response.json(updatedPet))
        .catch(err => response.status(400).json(err))
}

module.exports.delete = (request, response) => {
    Shelter.deleteOne({_id: request.params.id})
        .then(deleteConfirmation => response.json(deleteConfirmation))
        .catch(err => response.json(err))
}