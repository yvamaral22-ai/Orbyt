import express from 'express';
import nodemailer from 'nodemailer';
import cors from 'cors';
import path from 'path';
import { createServer as createViteServer } from 'vite';

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());
  app.use(cors());

  // API Route for Leads
  app.post('/api/leads', async (req, res) => {
    const { nome, email, whatsapp, interesse, empresa } = req.body;

    // Configuração do Transportador SMTP (Hostinger)
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.hostinger.com',
      port: Number(process.env.SMTP_PORT) || 465,
      secure: (process.env.SMTP_PORT === '465') || (!process.env.SMTP_PORT), // true para porta 465 (SSL/TLS)
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
      tls: {
        rejectUnauthorized: false // Ignora erros de certificado auto-assinado
      },
      connectionTimeout: 10000,
      greetingTimeout: 10000,
    });

    const mailOptions = {
      from: `"Kytrona Website" <${process.env.SMTP_USER}>`,
      to: 'contato@kytronatecnologia.com',
      subject: `Novo Lead: ${nome} - ${interesse}`,
      text: `
        Novo lead recebido pelo site:
        
        Nome: ${nome}
        E-mail: ${email}
        WhatsApp: ${whatsapp}
        Interesse: ${interesse}
        Empresa: ${empresa || 'Não informada'}
      `,
      html: `
        <h3>Novo lead recebido pelo site</h3>
        <p><strong>Nome:</strong> ${nome}</p>
        <p><strong>E-mail:</strong> ${email}</p>
        <p><strong>WhatsApp:</strong> ${whatsapp}</p>
        <p><strong>Interesse:</strong> ${interesse}</p>
        <p><strong>Empresa:</strong> ${empresa || 'Não informada'}</p>
      `,
    };

    try {
      if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
        throw new Error('Configurações de SMTP ausentes no ambiente.');
      }
      await transporter.sendMail(mailOptions);
      res.status(200).json({ success: true, message: 'Lead enviado com sucesso!' });
    } catch (error) {
      console.error('Erro ao enviar e-mail:', error);
      res.status(500).json({ success: false, error: 'Erro interno ao processar o lead.' });
    }
  });

  // Health Check
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', version: '2.0.0' });
  });

  // Vite integration
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Servidor Kytrona rodando em http://localhost:${PORT}`);
  });
}

startServer();
