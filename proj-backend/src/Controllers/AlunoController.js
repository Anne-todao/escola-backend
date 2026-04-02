const alunoModel = require('../Models/AlunoModel');

const getAllAlunos = async (req, res) => {
    try {
        const alunos = await alunoModel.getAllAlunos();
        res.status(200).json(alunos);
    } catch (error) {
        console.error('Erro ao obter alunos:', error);
        res.status(500).json({ error: 'Erro ao obter alunos' });
    }
};

const getAlunoById = async (req, res) => {
    const { idAluno } = req.params;
    try {
        const aluno = await alunoModel.getAlunoById(idAluno);
        if (aluno) {
            res.status(200).json(aluno);
        } else {
            res.status(404).json({ error: 'Aluno não encontrado' });
        }
    } catch (error) {
        console.error('Erro ao obter aluno:', error);
        res.status(500).json({ error: 'Erro ao obter aluno' });
    }
};

const createAluno = async (req, res) => {
    const { nomeCompleto, cpf, dataNascimento, email, idTurma } = req.body;
    if (!nomeCompleto || !cpf || !dataNascimento || !email || !idTurma) {
        return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
    }
    try {
        const newAluno = await alunoModel.createAluno(nomeCompleto, cpf, dataNascimento, email, idTurma);
        res.status(201).json(newAluno);
    } catch (error) {
        console.error('Erro ao criar aluno:', error);
        if (error.code === '23505') {
            return res.status(400).json({ error: 'Aluno já cadastrado' });
        } 
        res.status(500).json({ error: 'Erro ao criar aluno' });
    }
};

const updateAluno = async (req, res) => {
    const { idAluno } = req.params;
    const { nomeCompleto, cpf, dataNascimento, email, idTurma } = req.body;
    if (!nomeCompleto || !cpf || !dataNascimento || !email || !idTurma) {
        return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
    }
    
    try {
        const updatedAluno = await alunoModel.updateAluno(idAluno, nomeCompleto, cpf, dataNascimento, email, idTurma);
        if (updatedAluno) {
            res.status(200).json(updatedAluno);
        } else {
            res.status(404).json({ error: 'Aluno não encontrado' });
        }
    } catch (error) {
        console.error('Erro ao atualizar aluno:', error);
        if (error.code === '23505') {
            return res.status(400).json({ error: 'Aluno já cadastrado' });
        }
        res.status(500).json({ error: 'Erro ao atualizar aluno' });
    }
};

const deleteAluno = async (req, res) => {
    const { idAluno } = req.params;
    try {
        const alunoRemovido = await alunoModel.deleteAluno(idAluno);
        if (alunoRemovido) {
            res.status(200).json({ mensagem: `Aluno ${idAluno} removido com sucesso.` });
        } else {
            res.status(404).json({ error: 'Aluno não encontrado.' });
        }
    } catch (error) {
        console.error(`Erro ao remover aluno:`, error);
        res.status(500).json({ error: "Erro interno ao tentar remover o aluno." });
    }
};

module.exports = {
    getAllAlunos,
    getAlunoById,
    createAluno,
    updateAluno,
    deleteAluno
};