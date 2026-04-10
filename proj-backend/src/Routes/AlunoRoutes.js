const express = require('express');
const router = express.Router();
const alunoController = require('../Controllers/AlunoController');

router.get('/', alunoController.getAllAlunos);
router.get('/visao', alunoController.listar_visao);
router.get('/:idAluno', alunoController.getAlunoById);
router.post('/', alunoController.createAluno);
router.put('/:idAluno', alunoController.updateAluno);
router.delete('/:idAluno', alunoController.deleteAluno);


module.exports = router;