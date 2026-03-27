import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  console.log(`[SERVER] Iniciando servidor em modo: ${process.env.NODE_ENV || 'development'}`);

  app.use(cors({
    origin: ['https://kytronatecnologia.com', 'http://localhost:3000', 'https://ais-pre-6d6u34qhdfvokii2es4ebq-550122452113.us-east1.run.app'],
    methods: ['GET', 'POST', 'OPTIONS'],
    credentials: true
  }));
  app.use(express.json());

  // Middleware de Log Detalhado
  app.use((req, res, next) => {
    console.log(`[DEBUG] ${new Date().toISOString()} - ${req.method} ${req.path} - Host: ${req.headers.host}`);
    next();
  });

  // Middleware para capturar informações de visitantes
  app.use((req, res, next) => {
    if (!req.path.startsWith('/api')) {
      const visitorInfo = {
        timestamp: new Date().toISOString(),
        ip: req.ip || req.headers['x-forwarded-for'],
        userAgent: req.headers['user-agent'],
        path: req.path
      };
      console.log(`[VISITA] ${visitorInfo.timestamp} - IP: ${visitorInfo.ip} - Navegador: ${visitorInfo.userAgent} - Página: ${visitorInfo.path}`);
    }
    next();
  });

  // API routes FIRST
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", env: process.env.NODE_ENV });
  });

  app.post(["/api/leads", "/api/leads/"], async (req, res) => {
    const { nome, email, whatsapp, interesse, empresa } = req.body;

    // Configuração do transportador de e-mail (SMTP)
    // O usuário deve configurar essas variáveis no ambiente
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.hostinger.com",
      port: parseInt(process.env.SMTP_PORT || "465"),
      secure: process.env.SMTP_SECURE !== "false", // Default to true for port 465
      auth: {
        user: process.env.SMTP_USER || "contato@kytronatecnologia.com",
        pass: process.env.SMTP_PASS,
      },
      connectionTimeout: 10000, // 10 segundos
      tls: {
        rejectUnauthorized: false
      }
    });

    const mailOptions = {
      from: `"Kytrona Leads" <${process.env.SMTP_USER || "contato@kytronatecnologia.com"}>`,
      to: "contato@kytronatecnologia.com", // E-mail de destino do usuário
      subject: `Novo Lead: ${nome} - ${interesse}`,
      text: `
        Novo lead capturado no site:
        
        Nome: ${nome}
        E-mail: ${email}
        WhatsApp: ${whatsapp}
        Interesse: ${interesse}
        Empresa: ${empresa || "Não informada"}
        
        Data: ${new Date().toLocaleString('pt-BR')}
      `,
      html: `
        <div style="font-family: sans-serif; padding: 20px; color: #333;">
          <h2 style="color: #FF6321;">Novo Lead Capturado</h2>
          <p><strong>Nome:</strong> ${nome}</p>
          <p><strong>E-mail:</strong> ${email}</p>
          <p><strong>WhatsApp:</strong> ${whatsapp}</p>
          <p><strong>Interesse:</strong> ${interesse}</p>
          <p><strong>Empresa:</strong> ${empresa || "Não informada"}</p>
          <hr />
          <p style="font-size: 12px; color: #666;">Data: ${new Date().toLocaleString('pt-BR')}</p>
        </div>
      `,
    };

    // Log para depuração (Remover em produção)
    console.log("Tentando enviar lead com SMTP:", {
      host: process.env.SMTP_HOST || "smtp.hostinger.com",
      port: process.env.SMTP_PORT || "465",
      user: process.env.SMTP_USER || "contato@kytronatecnologia.com",
      hasPass: !!process.env.SMTP_PASS,
      secure: process.env.SMTP_SECURE !== "false"
    });

    try {
      if (process.env.SMTP_USER && process.env.SMTP_PASS) {
        await transporter.sendMail(mailOptions);
        console.log("E-mail enviado com sucesso!");
        res.json({ success: true, message: "Lead enviado com sucesso!" });
      } else {
        // Fallback para logs se não houver SMTP configurado
        console.log("SMTP não configurado (Faltando USER ou PASS). Lead recebido:", req.body);
        res.json({ success: true, message: "Lead recebido (SMTP não configurado)." });
      }
    } catch (error) {
      console.error("Erro detalhado ao enviar e-mail:", error);
      res.status(500).json({ success: false, message: "Erro ao processar lead.", error: error instanceof Error ? error.message : String(error) });
    }
  });

  // Catch-all for API routes that don't match
  app.all("/api/*", (req, res) => {
    res.status(404).json({ success: false, message: `API route ${req.method} ${req.path} not found.` });
  });

  // Serve static files from public folder in development
  if (process.env.NODE_ENV !== "production") {
    app.use(express.static(path.join(__dirname, "public")));
  }

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    console.log(`Servindo arquivos estáticos de: ${distPath}`);
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      const indexPath = path.join(distPath, 'index.html');
      res.sendFile(indexPath);
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
