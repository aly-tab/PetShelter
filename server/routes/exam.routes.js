const AthleteController = require('../controllers/exam.controller');

module.exports = function(app) {
    app.get("/api/exam", AthleteController.list);
    app.post("/api/exam", AthleteController.create);
    app.get("/api/exam/:id", AthleteController.detail);
    app.put("/api/exam/:id", AthleteController.update);
    app.delete('/api/exam/:id', AthleteController.delete);
}