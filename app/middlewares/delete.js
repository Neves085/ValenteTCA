const express = require('express');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const app = express();

app.use(express.json());

// Rota para listar todos os usuários
app.get('/users', async (req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
});

// Rota para deletar um usuário
app.delete('/users/:id', async (req, res) => {
  const { id } = req.params;
  await prisma.user.delete({
    where: { id: parseInt(id) }
  });
  res.send('Usuário excluído com sucesso');
});

// Rota para atualizar os dados de um usuário
app.put('/users/:id', async (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;
  const user = await prisma.user.update({
    where: { id: parseInt(id) },
    data: { name, email }
  });
  res.json(user);
});

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});
