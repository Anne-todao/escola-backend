const express = require('express');
const router = express.Router();
const CursoController = require('../Controllers/CursoController');
  
router.get('/', CursoController.getAllCursos);
router.get('/:idCurso', CursoController.getCursoById);
router.post('/', CursoController.createCurso);
router.put('/:idCurso', CursoController.updateCurso);
router.delete('/:idCurso', CursoController.deleteCurso);

module.exports = router;