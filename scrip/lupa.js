// =======================
// Barra de búsqueda
// =======================
const input = document.getElementById("inputSearch-uno");
const btnSearch = document.querySelector("#container .btn"); // <- botón lupa

// Diccionario de palabras clave y rutas
const rutas = {
    "velas": "../productos.html#ir_velasDecorativas",
    "vela": "../productos.html#ir_velasDecorativas",
    "jabon": "../productos.html#ir_cuidadoPersonal",
    "jabones": "../productos.html#ir_cuidadoPersonal",

    "aromatizadores": "../productos.html#ir_aromatizadores",
    "dulzura de cerezo": "dulzuraDeCerezo.html",
    "rosa espiral": "rosaEspiral.html",
    "aromatizador dulzura de cerezo": "dulzuraDeCerezo.html",
    "aromatizador rosa espiral": "rosaEspiral.html",

    "tulipan": "tulipan.html",
    "ramo tulipan": "ramoTulipan.html",
    "flor de hibisco": "florHibisco.html",
    "vela rosa": "velaRosa.html",
    "cactus": "cactusSimple.html",
    "cactus simple": "cactusSimple.html",
    "cactus hawaiano": "cactusHawaiano.html",
    "jardín en pote": "jardinPote.html",
    "jardin en pote": "jardinPote.html",
    "vela gatuno": "velaGato.html",

    "vela tulipan": "tulipan.html",
    "vela ramo tulipan": "ramoTulipan.html",
    "vela flor de hibisco": "florHibisco.html",
    "vela cactus": "cactusSimple.html",
    "vela cactus hawaiano": "cactusHawaiano.html",
    "vela osito": "velaOsitos.html",
    "vela jardin en pote": "jardinPote.html",
    "vela angel gatuno": "velaGato.html",
    "vela ángel gatuno": "velaGato.html",

    "jabon corporal artesanal": "jabonCorporal.html",
    "jabon corporal": "jabonCorporal.html",
    "mini corazoncitos": "miniCorazon.html",
    "jabon mini corazoncitos": "miniCorazon.html",
    "mini corazoncito": "miniCorazon.html",
    "jabon mini corazoncito": "miniCorazon.html",
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