// carrusel usando arrays
document.addEventListener("DOMContentLoaded", () => {
    const images = [
        "images/baan1.jpg",
        "images/baan2.jpg"
    ];

    const banner = document.getElementById("ban");

    if (!banner) {
        console.error("No se encontró la imagen con id='ban'");
        return;
    }

    let index = 0;
    const intervalo = 4000;

    const cambiarImagen = () => {
        banner.src = images[index];
        index = (index + 1) % images.length;
    };

    cambiarImagen(); // Mostrar la primera imagen
    setInterval(cambiarImagen, intervalo); // Ciclo automático
});



// =======================
// Barra de búsqueda
// =======================
const input = document.getElementById("inputSearch");
const btnSearch = document.querySelector("#container .btn"); // <- botón lupa

// Diccionario de palabras clave y rutas
const rutas = {
    "velas": "pages/productos.html#ir_velasDecorativas",
    "vela": "pages/productos.html#ir_velasDecorativas",
    "jabon": "pages/productos.html#ir_cuidadoPersonal",
    "jabones": "pages/productos.html#ir_cuidadoPersonal",

    "aromatizadores": "pages/productos.html#ir_aromatizadores",
    "dulzura de cerezo": "pages/productos/dulzuraDeCerezo.html",
    "rosa espiral": "pages/productos/rosaEspiral.html",
    "aromatizador dulzura de cerezo": "pages/productos/dulzuraDeCerezo.html",
    "aromatizador rosa espiral": "pages/productos/rosaEspiral.html",

    "tulipan": "pages/productos/tulipan.html",
    "ramo tulipan": "pages/productos/ramoTulipan.html",
    "flor de hibisco": "pages/productos/florHibisco.html",
    "vela rosa": "pages/productos/velaRosa.html",
    "cactus": "pages/productos/cactusSimple.html",
    "cactus simple": "pages/productos/cactusSimple.html",
    "cactus hawaiano": "pages/productos/cactusHawaiano.html",
    "jardín en pote": "pages/productos/jardinPote.html",
    "jardin en pote": "pages/productos/jardinPote.html",
    "vela gatuno": "pages/productos/velaGato.html",

    "vela tulipan": "pages/productos/tulipan.html",
    "vela ramo tulipan": "pages/productos/ramoTulipan.html",
    "vela flor de hibisco": "pages/productos/florHibisco.html",
    "vela cactus": "pages/productos/cactusSimple.html",
    "vela cactus hawaiano": "pages/productos/cactusHawaiano.html",
    "vela osito": "pages/productos/velaOsitos.html",
    "vela jardin en pote": "pages/productos/jardinPote.html",
    "vela angel gatuno": "pages/productos/velaGato.html",
    "vela ángel gatuno": "pages/productos/velaGato.html",

    "jabon corporal artesanal": "pages/productos/jabonCorporal.html",
    "jabon corporal": "pages/productos/jabonCorporal.html",
    "mini corazoncitos": "pages/productos/miniCorazon.html",
    "jabon mini corazoncitos": "pages/productos/miniCorazon.html",
    "mini corazoncito": "pages/productos/miniCorazon.html",
    "jabon mini corazoncito": "pages/productos/miniCorazon.html",
};

// Función que procesa la búsqueda
function buscarProducto() {
    const query = input.value.trim().toLowerCase();
    if (query === "") return;

    if (rutas[query]) {
        window.location.href = rutas[query];
    } else {
        alert("❌ Producto no encontrado");
    }
}

// Enter en el input
input.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
        e.preventDefault();
        buscarProducto();
    }
});

// Click en la lupa
if (btnSearch) {
    btnSearch.addEventListener("click", buscarProducto);
}