document.addEventListener("DOMContentLoaded", () => {
    const loginBtn = document.getElementById("login-btn");
    const registerBtn = document.getElementById("register-btn");
    const loginModal = document.getElementById("login-modal");
    const registerModal = document.getElementById("register-modal");
    const userNameSpan = document.getElementById("user-name");

    // Crear overlays si no existen
    let loginOverlay = document.getElementById("login-overlay");
    if(!loginOverlay){
        loginOverlay = document.createElement("div");
        loginOverlay.id = "login-overlay";
        loginOverlay.style.cssText = "display:none; position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.7); z-index:99;";
        document.body.appendChild(loginOverlay);
    }

    let registerOverlay = document.getElementById("register-overlay");
    if(!registerOverlay){
        registerOverlay = document.createElement("div");
        registerOverlay.id = "register-overlay";
        registerOverlay.style.cssText = "display:none; position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.7); z-index:99;";
        document.body.appendChild(registerOverlay);
    }

    // Abrir modales
    loginBtn.addEventListener("click", () => {
        if(!localStorage.getItem("user_name")){
            loginModal.style.display = "block";
            loginOverlay.style.display = "block";
        }
    });

    registerBtn.addEventListener("click", () => {
        registerModal.style.display = "block";
        registerOverlay.style.display = "block";
    });

    // Cerrar modales
    document.querySelectorAll(".close, .close-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            loginModal.style.display = "none";
            loginOverlay.style.display = "none";
            registerModal.style.display = "none";
            registerOverlay.style.display = "none";
        });
    });

    // Cerrar al hacer clic en el overlay
    loginOverlay.addEventListener("click", () => {
        loginModal.style.display = "none";
        loginOverlay.style.display = "none";
    });
    registerOverlay.addEventListener("click", () => {
        registerModal.style.display = "none";
        registerOverlay.style.display = "none";
    });

    // Validar email
    const validateEmail = email => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    // Función de cerrar sesión
    const logout = () => {
        localStorage.removeItem("user_name");
        localStorage.removeItem("user_email");
        updateUserButton();
        alert("Has cerrado sesión.");
    };

    // Actualizar botón de usuario
    const updateUserButton = () => {
        const name = localStorage.getItem("user_name");
        if(name){
            userNameSpan.textContent = `Hola, ${name}`;
            registerBtn.style.display = "none";

            // Clic en el botón mientras está logueado = logout
            loginBtn.onclick = logout;
        } else {
            userNameSpan.textContent = "";
            registerBtn.style.display = "inline-block";

            loginBtn.onclick = () => {
                loginModal.style.display = "block";
                loginOverlay.style.display = "block";
            };
        }
    };
    updateUserButton();

    // ===============================
    // LOGIN
    // ===============================
    document.getElementById("login-form").addEventListener("submit", async e => {
        e.preventDefault();
        const email = document.getElementById("login-email").value.trim();
        const password = document.getElementById("login-password").value;

        if(!validateEmail(email)){ alert("Correo inválido"); return; }
        if(password.length < 8){ alert("Contraseña inválida"); return; }

        try {
            const response = await fetch("/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password })
            });
            const data = await response.json();

            if(data.success){
                localStorage.setItem("user_name", data.name);
                localStorage.setItem("user_email", email);

                alert(`Bienvenido ${data.name}!`);
                updateUserButton();
                loginModal.style.display = "none";
                loginOverlay.style.display = "none";
            } else {
                alert(data.message);
            }
        } catch(err) {
            console.error(err);
            alert("Error al iniciar sesión. Intenta de nuevo.");
        }
    });

    // ===============================
    // REGISTRO
    // ===============================
    document.getElementById("register-form").addEventListener("submit", async e => {
        e.preventDefault();
        const name = document.getElementById("register-name").value.trim();
        const email = document.getElementById("register-email").value.trim();
        const password = document.getElementById("register-password").value;

        if(name.length < 3){ alert("Nombre demasiado corto"); return; }
        if(!validateEmail(email)){ alert("Correo inválido"); return; }
        if(password.length < 8){ alert("Contraseña demasiado corta"); return; }

        try {
            const response = await fetch("/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, password })
            });
            const data = await response.json();

            if(data.success){
                localStorage.setItem("user_name", name);
                localStorage.setItem("user_email", email);

                alert(`Registro exitoso! Bienvenido ${name}`);
                updateUserButton();
                registerModal.style.display = "none";
                registerOverlay.style.display = "none";
            } else {
                alert(data.message);
            }
        } catch(err) {
            console.error(err);
            alert("Error al registrar. Intenta de nuevo.");
        }
    });
});
