// =======================
// Barra de búsqueda
// =======================
const input = document.getElementById("inputSearch");
const btnSearch = document.querySelector("#container .btn"); // <- botón lupa

// Diccionario de palabras clave y rutas
const rutas = {
    "velas": "../productos.html#ir_velasDecorativas",
    "vela": "../productos.html#ir_velasDecorativas",
    "jabon": "../productos.html#ir_cuidadoPersonal",
    "jabones": "../productos.html#ir_cuidadoPersonal",

    "aromatizadores": "../productos.html#ir_aromatizadores",
    "dulzura de cerezo": "productos/dulzuraDeCerezo.html",
    "rosa espiral": "productos/rosaEspiral.html",
    "aromatizador dulzura de cerezo": "productos/dulzuraDeCerezo.html",
    "aromatizador rosa espiral": "productos/rosaEspiral.html",

    "tulipan": "productos/tulipan.html",
    "ramo tulipan": "productos/ramoTulipan.html",
    "flor de hibisco": "productos/florHibisco.html",
    "vela rosa": "productos/velaRosa.html",
    "cactus": "productos/cactusSimple.html",
    "cactus simple": "productos/cactusSimple.html",
    "cactus hawaiano": "productos/cactusHawaiano.html",
    "jardín en pote": "productos/jardinPote.html",
    "jardin en pote": "productos/jardinPote.html",
    "vela gatuno": "productos/velaGato.html",

    "vela tulipan": "productos/tulipan.html",
    "vela ramo tulipan": "productos/ramoTulipan.html",
    "vela flor de hibisco": "productos/florHibisco.html",
    "vela cactus": "productos/cactusSimple.html",
    "vela cactus hawaiano": "productos/cactusHawaiano.html",
    "vela osito": "productos/velaOsitos.html",
    "vela jardin en pote": "productos/jardinPote.html",
    "vela angel gatuno": "productos/velaGato.html",
    "vela ángel gatuno": "productos/velaGato.html",

    "jabon corporal artesanal": "productos/jabonCorporal.html",
    "jabon corporal": "productos/jabonCorporal.html",
    "mini corazoncitos": "productos/miniCorazon.html",
    "jabon mini corazoncitos": "productos/miniCorazon.html",
    "mini corazoncito": "productos/miniCorazon.html",
    "jabon mini corazoncito": "productos/miniCorazon.html",
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