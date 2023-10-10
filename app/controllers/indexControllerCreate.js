const prisma = require("../../../server/database/prismaClient");

app.use(express.json());

// Rota para adicionar uma curtida
app.post('/likes', async (req, res) => {
  try {
    const { postId, userId } = req.body;

    // Verifique se o usuário já curtiu a postagem (verificação simplificada)
    // Você pode adicionar lógica mais complexa aqui, como evitar curtidas duplicadas.

    // Insira a curtida no banco de dados usando Prisma
    const like = await prisma.like.create({
      data: {
        postId,
        userId,
      },
    });

    res.json({ success: true, like });
  } catch (error) {
    console.error('Erro ao adicionar curtida:', error);
    res.status(500).json({ error: 'Erro ao adicionar curtida' });
  }
});