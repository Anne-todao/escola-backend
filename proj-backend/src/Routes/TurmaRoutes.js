const express = require('express');
const router = express.Router();
const TurmaController = require('../Controllers/TurmaController');

router.get('/', TurmaController.getAllTurmas);
router.get('/:idTurma', TurmaController.getTurmaById);
router.post('/', TurmaController.createTurma);
router.put('/:idTurma', TurmaController.updateTurma);
router.delete('/:idTurma', TurmaController.deleteTurma);

module.exports = router;