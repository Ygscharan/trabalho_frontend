const express = require('express');
const { PrismaClient } = require('@prisma/client');

const app = express();
const prisma = new PrismaClient();

app.use(express.json());

// Rota para login
app.post('/login', async (req, res) => {
    const { email, senha } = req.body;

    const user = await prisma.user.findFirst({
        select: {
            nome: true,
            email: true
        },
        where: {
            email,
            senha
        }
    })

    if (user) {
        return res.json({
            message: "Usuário logado com sucesso!",
            user
        })
    }
});

// Rota para cadastro
app.post('/user', async (req, res) => {
    const { nome, email, senha } = req.body;

    const user = await prisma.user.create({
        data: {
            nome,
            email,
            senha
        }
    })

    return res.json({
        message: "Usuário cadastrado com sucesso!",
        user
    });
});

// Rota para listar todos os usuários
app.get('/users', async (req, res) => {
    const users = await prisma.user.findMany(
        {
            select: {
                nome: true,
                email: true
            }
        }
    );

    return res.json({
        message: "Usuários listados com sucesso!",
        users
    });
});

// Rota para recuperar um usuário específico
app.get('/user/:id', async (req, res) => {
    const { id } = req.params;

    const user = await prisma.user.findUnique({
        select: {
            nome: true,
            email: true
        },
        where: {
            id: Number(id)
        }
    });

    return res.json({
        message: "Usuário recuperado com sucesso!",
        user
    });
});

// Rota para atualizar um usuário
app.put('/user/:id', async (req, res) => {
    const { id } = req.params;
    const { nome, email, senha } = req.body;

    const user = await prisma.user.update({
        select: {
            nome: true,
            email: true
        },
        where: {
            id: Number(id)
        },
        data: {
            nome,
            email,
            senha
        }
    });

    return res.json({
        message: "Usuário atualizado com sucesso!",
        user
    });
});

// Rota para deletar um usuário
app.delete('/user/:id', async (req, res) => {
    const { id } = req.params;

    const user = await prisma.user.delete({
        select: {
            nome: true,
            email: true
        },
        where: {
            id: Number(id)
        }
    });

    return res.json({
        message: "Usuário deletado com sucesso!",
        user
    });
});

// Rota para criar uma TASAKJSDKASD
app.post('/task', async (req, res) => {
    const { title, description } = req.body;

    const task = await prisma.task.create({
        data: {
            title,
            description
        }
    })

    return res.json({
        message: "Tarefa criada com sucesso!",
        task
    });
});

// Rota para listar todas as tarefas do usuário
app.get('/tasks', async (req, res) => {
    const tasks = await prisma.task.findMany();

    return res.json({
        message: "Tarefas listadas com sucesso!",
        tasks
    });
});

// Rota para recuperar uma tarefa específica
app.get('/task/:id', async (req, res) => {
    const { id } = req.params;

    const task = await prisma.task.findUnique({
        where: {
            id: Number(id)
        }
    });

    return res.json({
        message: "Tarefa recuperada com sucesso!",
        task
    });
});

// Rota para atualizar uma tarefa
app.put('/task/:id', async (req, res) => {
    const { id } = req.params;
    const { title, description, completed } = req.body;

    const task = await prisma.task.update({
        where: {
            id: Number(id)
        },
        data: {
            title,
            description,
            completed
        }
    });

    return res.json({
        message: "Tarefa atualizada com sucesso!",
        task
    });
});

// Rota para deletar uma tarefa
app.delete('/task/:id', async (req, res) => {
    const { id } = req.params;

    const task = await prisma.task.delete({
        where: {
            id: Number(id)
        }
    });

    return res.json({
        message: "Tarefa deletada com sucesso!",
        task
    });
});

app.listen(3333, () => {
    console.log('🚀 Server is running on port 3000');
});