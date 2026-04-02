const pool = require("../config/db");

const getAllAlunos = async () => {
    const result = await pool.query(
        `SELECT idAluno, nomeCompleto, cpf, dataNascimento, email, idTurma
        FROM alunos
        ORDER BY idAluno`
    );
    return result.rows;
};

const getAlunoById = async (idAluno) => {
    const result = await pool.query(
        `SELECT idAluno, nomeCompleto, cpf, dataNascimento, email, idTurma 
         FROM alunos 
         WHERE idAluno = $1`, 
        [idAluno]
    );
    return result.rows[0];
};

const createAluno = async (nomeCompleto, cpf, dataNascimento, email, idTurma) => {
    const result = await pool.query(
        'INSERT INTO alunos (nomeCompleto, cpf, dataNascimento, email, idTurma) VALUES ($1, $2, $3, $4, $5) RETURNING *',
        [nomeCompleto, cpf, dataNascimento, email, idTurma]
    );
    return result.rows[0];
};

const updateAluno = async (idAluno, nomeCompleto, cpf, dataNascimento, email, idTurma) => {
    const result = await pool.query(
        'UPDATE alunos SET nomeCompleto = $1, cpf = $2, dataNascimento = $3, email = $4, idTurma = $5 WHERE idAluno = $6 RETURNING *',
        [nomeCompleto, cpf, dataNascimento, email, idTurma, idAluno]
    );
    return result.rows[0];
};

const deleteAluno = async (idAluno) => {
    const result = await pool.query(
        'DELETE FROM alunos WHERE idAluno = $1 RETURNING *', 
        [idAluno]
    );
    return result.rows[0];
};

const countTurmaAssociada = async (turmaId) => {
    const result = await pool.query(
        'SELECT COUNT(*) FROM alunos WHERE idTurma= $1',
        [turmaId]
    );
    return parseInt(result.rows[0].count);
}

module.exports = {
    getAllAlunos,
    getAlunoById,
    createAluno,
    updateAluno,
    deleteAluno,
    countTurmaAssociada
};