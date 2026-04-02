require('dotenv').config();
const express = require('express');
const pool = require('./src/config/db');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

const alunoRoutes = require('./src/Routes/AlunoRoutes');
const cursoRoutes = require('./src/Routes/CursoRoutes');
const turmaRoutes = require('./src/Routes/TurmaRoutes');

app.use('/alunos', alunoRoutes);
app.use('/cursos', cursoRoutes);
app.use('/turmas', turmaRoutes);

app.get('/', (req, res) => {
    res.send("API REST com Node.js e PostgreSQL está funcionando!");
});

app.listen(PORT, () => {
    console.log(` Servidor rodando em http://localhost:${PORT}`)
    console.log(`Acesse http://localhost:${PORT}/alunos`)
    console.log(`Acesse http://localhost:${PORT}/cursos`)
    console.log(`Acesse http://localhost:${PORT}/turmas`)
}
);