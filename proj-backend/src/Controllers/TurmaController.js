const turmaModel = require('../Models/TurmaModel');
const alunoModel = require('../Models/AlunoModel'); // Importante para checar alunos antes de deletar

const getAllTurmas = async (req, res) => {
    try {
        const turmas = await turmaModel.getAllTurma();
        res.status(200).json(turmas);
    } catch (error) {
        console.error('Erro ao obter turmas:', error);
        res.status(500).json({ error: 'Erro ao obter turmas' });
    }
};

const getTurmaById = async (req, res) => {
    const { idTurma } = req.params;
    try {
        const turma = await turmaModel.getById(idTurma);
        if (turma) {
            res.status(200).json(turma);
        } else {
            res.status(404).json({ error: 'Turma não encontrada' });
        }
    } catch (error) {
        console.error('Erro ao obter turma:', error);
        res.status(500).json({ error: 'Erro ao obter turma' });
    }
};

const createTurma = async (req, res) => {
    const { anoLetivo, periodo, idCurso } = req.body;
    
    if (!anoLetivo || !periodo || !idCurso) {
        return res.status(400).json({ error: 'Ano letivo, período e curso são obrigatórios' });
    }

    try {
        const newTurma = await turmaModel.createTurma(anoLetivo, periodo, idCurso);
        res.status(201).json(newTurma);
    } catch (error) {
        console.error('Erro ao criar turma:', error);
        // Se o idCurso não existir no banco, o Postgres retorna erro de Foreign Key
        if (error.code === '23503') {
            return res.status(400).json({ error: 'O curso informado não existe' });
        }
        res.status(500).json({ error: 'Erro ao criar turma' });
    }
};

const updateTurma = async (req, res) => {
    const { idTurma } = req.params;
    const { anoLetivo, periodo, idCurso } = req.body;

    if (!anoLetivo || !periodo || !idCurso) {
        return res.status(400).json({ error: 'Todos os campos são obrigatórios para atualização' });
    }

    try {
        const updatedTurma = await turmaModel.updateTurma(idTurma, anoLetivo, periodo, idCurso);
        if (updatedTurma) {
            res.status(200).json(updatedTurma);
        } else {
            res.status(404).json({ error: 'Turma não encontrada' });
        }
    } catch (error) {
        console.error('Erro ao atualizar turma:', error);
        if (error.code === '23503') {
            return res.status(400).json({ error: 'O curso informado para atualização não existe' });
        }
        res.status(500).json({ error: 'Erro ao atualizar turma' });
    }
};

const deleteTurma = async (req, res) => {
    const { idTurma } = req.params;
    try {
        // Validação crucial: Não deletar turma que tem alunos
        // Usamos a função 'countTurmaAssociada' que está no AlunoModel
        const alunosNaTurma = await alunoModel.countTurmaAssociada(idTurma);
        
        if (alunosNaTurma > 0) {
            return res.status(409).json({ 
                error: `Não é possível excluir: esta turma possui ${alunosNaTurma} aluno(s) matriculado(s).` 
            });
        }

        const turmaRemovida = await turmaModel.deleteTurma(idTurma);
        if (turmaRemovida) {
            res.status(200).json({ mensagem: `Turma ${idTurma} removida com sucesso.` });
        } else {
            res.status(404).json({ error: 'Turma não encontrada.' });
        }
    } catch (error) {
        console.error(`Erro ao remover turma:`, error);
        res.status(500).json({ error: "Erro interno ao tentar remover a turma." });
    }
};

module.exports = {
    getAllTurmas,
    getTurmaById,
    createTurma,
    updateTurma,
    deleteTurma
};