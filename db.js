const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.json());

const db = mysql.createConnection({
    host: "nodedatabase.czkk2sa0wkw1.us-east-2.rds.amazonaws.com",
    user: "root",
    password: "123234qwewer1",
    database: "alquimia"
});

// Registro
app.post("/register", (req, res) => {
    const { name, email, password } = req.body;
    db.query("SELECT * FROM users WHERE email = ?", [email], (err, result) => {
        if(err) return res.json({ success: false, message: "Error de DB" });
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
    db.query("SELECT * FROM users WHERE email = ? AND password = ?", [email, password], (err, result) => {
        if(err) return res.json({ success: false, message: "Error de DB" });
        if(result.length === 0) return res.json({ success: false, message: "Email o contraseña incorrecta" });
        res.json({ success: true, name: result[0].name });
    });
});

app.listen(3000, () => console.log("Servidor corriendo en http://localhost:3000"));
