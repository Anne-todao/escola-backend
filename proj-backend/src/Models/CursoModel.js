const pool = require("../config/db");

const getAllCursos = async () => {
    const result = await pool.query('SELECT * FROM cursos ORDER BY IDcurso');
    return result.rows;
}

const getCursoById = async (idCurso) => {
    const result = await pool.query('SELECT * FROM cursos WHERE idCurso = $1', [idCurso]);
    return result.rows[0];
}

const createCurso = async (curso) => {
    const result = await pool.query(
        'INSERT INTO cursos (nome) VALUES ($1) RETURNING *',
        [curso.nome]
    );
    return result.rows[0];
};

const updateCurso = async (idCurso, nome) => {
    const result = await pool.query(
        'UPDATE cursos SET nome = $1 WHERE idCurso = $2 RETURNING *',
        [nome, idCurso]
    );
    return result.rows[0];
};

const deleteCurso = async (idCurso) => {
    const result = await pool.query('DELETE FROM cursos WHERE idCurso = $1 RETURNING *', [idCurso]);
    return result.rows[0];
};

const countTurmaAssociada = async (cursoId) => {
    const result = await pool.query(
        'SELECT COUNT(*) FROM turmas WHERE idCurso= $1',
        [cursoId]
    );
    return parseInt(result.rows[0].count);
}

module.exports = {
    getAllCursos,
    getCursoById,
    createCurso,
    updateCurso,
    deleteCurso,
    countTurmaAssociada
};