const ShelterController = require('../controllers/shelter.controller');

module.exports = function(app) {
    app.get("/api/shelter", ShelterController.list);
    app.get("/api/shelter/poster/limit/:id", ShelterController.listPosterLimit);
    app.get("/api/shelter/owner/limit/:id", ShelterController.listOwnerLimit);
    app.get("/api/shelter/poster/:id", ShelterController.listPoster);
    app.get("/api/shelter/owner/:id", ShelterController.listOwner);
    app.post("/api/shelter", ShelterController.create);
    app.get("/api/shelter/:id",ShelterController.detail);
    app.put("/api/shelter/:id", ShelterController.update);
    app.delete('/api/shelter/:id', ShelterController.delete);
}