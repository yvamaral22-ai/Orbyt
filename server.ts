import express from 'express';
import nodemailer from 'nodemailer';
import cors from 'cors';
import path from 'path';
import compression from 'compression';
import { createServer as createViteServer } from 'vite';

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(compression()); // Ativa compressão Gzip/Brotli para todos os assets
  app.use(express.json());
  app.use(cors());
  app.options('*', cors()); // Trata explicitamente o preflight de todas as rotas

  // API Route for Leads (Aceita com ou sem barra no final para evitar redirecionamentos)
  app.post(['/api/leads', '/api/leads/'], async (req, res) => {
    console.log('Recebendo lead no servidor...');
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
      from: `"Kytrona Tecnologia - Leads" <${process.env.SMTP_USER || 'contato@kytronatecnologia.com'}>`,
      to: 'contato@kytronatecnologia.com',
      subject: `🚀 Novo Lead: ${nome} - ${interesse}`,
      html: `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #eee; border-radius: 10px; overflow: hidden;">
          <div style="background-color: #000; padding: 20px; text-align: center;">
            <h1 style="color: #fff; margin: 0; font-size: 24px; letter-spacing: 2px;">KYTRONA TECNOLOGIA</h1>
          </div>
          <div style="padding: 30px; background-color: #fff;">
            <h2 style="color: #000; border-bottom: 2px solid #f27d26; padding-bottom: 10px; margin-top: 0;">Novo Contato Recebido</h2>
            <p style="font-size: 16px; line-height: 1.6;">Você tem um novo potencial cliente interessado em seus serviços. Confira os detalhes abaixo:</p>
            
            <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
              <tr>
                <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold; width: 30%;">Nome:</td>
                <td style="padding: 10px; border-bottom: 1px solid #eee;">${nome}</td>
              </tr>
              <tr>
                <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">E-mail:</td>
                <td style="padding: 10px; border-bottom: 1px solid #eee;"><a href="mailto:${email}" style="color: #f27d26; text-decoration: none;">${email}</a></td>
              </tr>
              <tr>
                <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">WhatsApp:</td>
                <td style="padding: 10px; border-bottom: 1px solid #eee;"><a href="https://wa.me/${whatsapp.replace(/\D/g, '')}" style="color: #25d366; text-decoration: none; font-weight: bold;">${whatsapp} (Abrir Conversa)</a></td>
              </tr>
              <tr>
                <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Empresa:</td>
                <td style="padding: 10px; border-bottom: 1px solid #eee;">${empresa || 'Não informada'}</td>
              </tr>
              <tr>
                <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Interesse:</td>
                <td style="padding: 10px; border-bottom: 1px solid #eee;"><span style="background-color: #fdf2e9; color: #f27d26; padding: 4px 10px; border-radius: 4px; font-weight: bold;">${interesse}</span></td>
              </tr>
            </table>
            
            <div style="margin-top: 30px; padding: 20px; background-color: #f9f9f9; border-radius: 8px; text-align: center;">
              <p style="margin: 0; font-size: 14px; color: #666;">Este lead foi gerado automaticamente pelo seu site oficial.</p>
            </div>
          </div>
          <div style="background-color: #f4f4f4; padding: 15px; text-align: center; font-size: 12px; color: #999;">
            &copy; 2026 Kytrona Tecnologia. Todos os direitos reservados.
          </div>
        </div>
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
