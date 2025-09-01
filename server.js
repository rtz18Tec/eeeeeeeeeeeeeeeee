// server.js
const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();

// Middlewares
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname))); // Servir archivos estáticos

// Conexión a MySQL
const db = mysql.createConnection({
    host: "localhost",
    user: "alquimia_user",    // Tu usuario MySQL
    password: "tuPassword",    // La contraseña que asignaste
    database: "alquimia"      // La base de datos
});

db.connect(err => {
    if(err){
        console.error("Error al conectar a MySQL:", err.message);
        return;
    }
    console.log("Conexión a MySQL exitosa");
});

// ===============================
// Rutas para login y registro
// ===============================

// Registro
app.post("/register", (req, res) => {
    const { name, email, password } = req.body;
    
    if(!name || !email || !password){
        return res.json({ success: false, message: "Faltan datos" });
    }

    db.query("SELECT * FROM users WHERE email = ?", [email], (err, result) => {
        if(err) return res.json({ success: false, message: "Error en la base de datos" });
        if(result.length > 0) return res.json({ success: false, message: "Email ya registrado" });

        db.query("INSERT INTO users (name, email, password) VALUES (?, ?, ?)", [name, email, password], (err) => {
            if(err) return res.json({ success: false, message: "Error al registrar" });
            res.json({ success: true });
        });
    });
});

// Login
app.post("/login", (req, res) => {
    const { email, password } = req.body;

    if(!email || !password){
        return res.json({ success: false, message: "Faltan datos" });
    }

    db.query("SELECT * FROM users WHERE email = ? AND password = ?", [email, password], (err, result) => {
        if(err) return res.json({ success: false, message: "Error en la base de datos" });
        if(result.length === 0) return res.json({ success: false, message: "Email o contraseña incorrecta" });

        res.json({ success: true, name: result[0].name });
    });
});

// Servir index.html para la ruta "/"
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

// Iniciar servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
