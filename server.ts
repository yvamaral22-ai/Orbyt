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

    // Configuração do Transportador SMTP (Hostinger - Usando porta 465 SSL/TLS conforme solicitado)
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.hostinger.com',
      port: Number(process.env.SMTP_PORT) || 465,
      secure: !process.env.SMTP_PORT || process.env.SMTP_PORT === '465', // true para porta 465
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
      tls: {
        rejectUnauthorized: false
      },
      connectionTimeout: 20000, // Aumentado para 20s para evitar timeouts
      greetingTimeout: 20000,
    });

    const mailOptions = {
      from: `"Kytrona Website" <${process.env.SMTP_USER || 'contato@kytronatecnologia.com'}>`,
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
        throw new Error('Configurações de SMTP (USER ou PASS) não encontradas nas Environment Variables.');
      }
      const info = await transporter.sendMail(mailOptions);
      console.log('E-mail enviado:', info.messageId);
      res.status(200).json({ success: true, message: 'Lead enviado com sucesso!' });
    } catch (error: any) {
      console.error('Erro detalhado ao enviar e-mail:', error);
      res.status(500).json({ 
        success: false, 
        error: error.message || 'Erro desconhecido no servidor de e-mail.',
        code: error.code,
        command: error.command
      });
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
