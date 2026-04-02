const cursoModel = require('../Models/CursoModel');

const getAllCursos = async (req, res) => {
    try {
        const cursos = await cursoModel.getAllCursos();
        res.status(200).json(cursos);
    } catch (error) {
        console.error('Erro ao obter cursos:', error);
        res.status(500).json({ error: 'Erro ao obter cursos' });
    }
};

const getCursoById = async (req, res) => {
    const { idCurso } = req.params;
    try {
        const curso = await cursoModel.getCursoById(idCurso);
        if (curso) {
            res.status(200).json(curso);
        } else {
            res.status(404).json({ error: 'Curso não encontrado' });
        }
    } catch (error) {
        console.error('Erro ao obter curso:', error);
        res.status(500).json({ error: 'Erro ao obter curso' });
    }
};

const createCurso = async (req, res) => {
    const { nome } = req.body;
    if (!nome) {
        return res.status(400).json({ error: 'O nome do curso é obrigatório' });
    }
    try {
        const newCurso = await cursoModel.createCurso({ nome });
        res.status(201).json(newCurso);
    } catch (error) {
        console.error('Erro ao criar curso:', error);
        if (error.code === '23505') {
            return res.status(400).json({ error: 'Este curso já está cadastrado' });
        }
        res.status(500).json({ error: 'Erro ao criar curso' });
    }
};

const updateCurso = async (req, res) => {
    const { idCurso } = req.params;
    const { nome } = req.body;
    if (!nome) {
        return res.status(400).json({ error: 'O nome do curso é obrigatório' });
    }
    try {
        const updatedCurso = await cursoModel.updateCurso(idCurso, nome);
        if (updatedCurso) {
            res.status(200).json(updatedCurso);
        } else {
            res.status(404).json({ error: 'Curso não encontrado' });
        }
    } catch (error) {
        console.error('Erro ao atualizar curso:', error);
        if (error.code === '23505') {
            return res.status(400).json({ error: 'Já existe um curso com este nome' });
        }
        res.status(500).json({ error: 'Erro ao atualizar curso' });
    }
};

const deleteCurso = async (req, res) => {
    const { idCurso } = req.params;
    try {
        // Validação de Integridade: Verifica se existem turmas antes de deletar
        const turmasAssociadas = await cursoModel.countTurmaAssociada(idCurso);
        
        if (turmasAssociadas > 0) {
            return res.status(409).json({ 
                error: `Não é possível excluir: existem ${turmasAssociadas} turmas vinculadas a este curso.` 
            });
        }

        const cursoRemovido = await cursoModel.deleteCurso(idCurso);
        if (cursoRemovido) {
            res.status(200).json({ mensagem: `Curso ${idCurso} removido com sucesso.` });
        } else {
            res.status(404).json({ error: 'Curso não encontrado.' });
        }
    } catch (error) {
        console.error(`Erro ao remover curso:`, error);
        res.status(500).json({ error: "Erro interno ao tentar remover o curso." });
    }
};

module.exports = {
    getAllCursos,
    getCursoById,
    createCurso,
    updateCurso,
    deleteCurso
};