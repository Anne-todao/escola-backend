const pool = require("../config/db");

const getAllTurma = async () => {
    const result = await pool.query(
        `SELECT t.idTurma, t.anoLetivo, t.periodo, c.nome AS nome_curso   
        FROM turmas t
        JOIN cursos c ON t.idCurso = c.idCurso
        ORDER BY t.idTurma`
    );
    return result.rows;
};

const getById = async (idTurma) => {
    const result = await pool.query(
        `SELECT t.idTurma, t.anoLetivo, t.periodo, c.nome AS nome_curso
        FROM turmas t
        JOIN cursos c ON t.idCurso = c.idCurso
        WHERE t.idTurma = $1`, 
     [idTurma]);
    return result.rows[0];
};

const getByCursoId = async (idCurso) => {
    const result = await pool.query(
        `SELECT t.idTurma, t.anoLetivo, t.periodo, c.nome AS nome_curso
        FROM turmas t
        JOIN cursos c ON t.idCurso = c.idCurso
        WHERE t.idCurso = $1
        ORDER BY t.anoLetivo`, 
     [idCurso]);
    return result.rows;
};


const createTurma = async (anoLetivo, periodo, idCurso) => {
    const result = await pool.query(
        'INSERT INTO turmas (anoLetivo, periodo, idCurso) VALUES ($1, $2, $3) RETURNING *',
        [anoLetivo, periodo, idCurso]
    );
    return result.rows[0];
};

const updateTurma = async (idTurma, anoLetivo, periodo, idCurso) => {
    const result = await pool.query(
        'UPDATE turmas SET anoLetivo = $1, periodo = $2, idCurso = $3 WHERE idTurma = $4 RETURNING *',
        [anoLetivo, periodo, idCurso, idTurma]
    );
    return result.rows[0];
};

const deleteTurma = async (idTurma) => {
    const result = await pool.query(
        'DELETE FROM turmas WHERE idTurma = $1 RETURNING *',
        [idTurma]
    );
    return result.rows[0];
};

const countAlunosAssociados = async (turmaId) => {
    const result = await pool.query(
        'SELECT COUNT(*) FROM alunos WHERE idTurma = $1',
        [turmaId]
    );
    return parseInt(result.rows[0].count);
}

module.exports = {
    getAllTurma,
    getById,
    getByCursoId,
    createTurma,
    updateTurma,
    deleteTurma,
    countAlunosAssociados
};