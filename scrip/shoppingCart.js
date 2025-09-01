document.addEventListener('DOMContentLoaded', () => {
    // Selectores para elementos del DOM
    const qs = selector => document.querySelector(selector);
    const qsa = selector => document.querySelectorAll(selector);

    const agregarAlCarritoBtns = qsa('.add-to-cart-btn');
    const listaDeProductos = qs('#cart-items');
    const totalCarrito = qs('#cart-total');
    const cantProdTotal = qs('#cart-count');
    const ventanaEmergente = qs('#cart-sidebar');
    const carritoIcon = qs('#cart-icon');
    const cerrar = qs('#close-cart-btn');
    const comprar = qs('#checkout-btn');


    // Inicializa el carrito desde localStorage o como un array vacío
    let car = JSON.parse(localStorage.getItem('car')) || [];

    // Función para guardar el carrito en localStorage
    const guardCarrito = () => localStorage.setItem('car', JSON.stringify(car));

    // ---


    // Actualiza la visualización del carrito en la interfaz de usuario
    const actualizarCarrito = () => {
        const fragment = document.createDocumentFragment(); // Para optimizar la inserción en el DOM
        let total = 0;
        let itemCount = 0;

        if (car.length === 0) {
            const emptyMessage = document.createElement('li');
            emptyMessage.textContent = 'Tu carrito está vacío. ¡Empieza a comprar!';
            emptyMessage.style.textAlign = 'center';
            emptyMessage.style.padding = '20px';
            fragment.appendChild(emptyMessage);
        } else {
            car.forEach(({ name, precio, cantidad }) => {
                const li = document.createElement('li');
                li.innerHTML = `
                    <div class="item-info">
                        <span>${name}</span>
                        <span>S/${precio.toFixed(2)}</span>
                    </div>
                    <div class="cart-quantity-controls">
                        <button class="cart-decrement-btn" data-name="${name}">-</button>
                        <input type="number" class="cart-quantity-input" value="${cantidad}" min="1" data-name="${name}" readonly>
                        <button class="cart-increment-btn" data-name="${name}">+</button>
                    </div>
                    <span>S/${(precio * cantidad).toFixed(2)}</span>
                    <button class="remove-from-cart-btn" data-name="${name}">Eliminar</button>`;
                fragment.appendChild(li);
                total += precio * cantidad;
                itemCount += cantidad;
            });
        }

        listaDeProductos.innerHTML = ''; // Limpia el contenedor solo una vez
        listaDeProductos.appendChild(fragment); // Agrega todos los elementos al DOM

        totalCarrito.textContent = total.toFixed(2);
        cantProdTotal.textContent = itemCount;
        guardCarrito(); // Guarda el estado actual del carrito
    };

    // Modifica la cantidad de un producto en el carrito
    const modificarCantidad = (name, cambio) => {
        const itemIndex = car.findIndex(i => i.name === name);
        if (itemIndex === -1) return; // Si el producto no se encuentra, sal de la función

        const item = car[itemIndex];
        item.cantidad += cambio;

        // Si la cantidad es 0 o menos, elimina el producto del carrito
        if (item.cantidad <= 0) {
            car.splice(itemIndex, 1);
        }
        actualizarCarrito();
    };

    // ---


    // Evento para añadir productos al carrito
    agregarAlCarritoBtns.forEach(button => {
        button.addEventListener('click', ({ target }) => {
            const name = target.dataset.name;
            const precio = parseFloat(target.dataset.price); // Usar data-price como en tu HTML
            const existing = car.find(i => i.name === name);

            if (existing) {
                existing.cantidad++;
            } else {
                car.push({ name, precio, cantidad: 1 });
            }
            actualizarCarrito();
        });
    });

    // Delegación de eventos para los botones de cantidad y eliminar dentro del carrito
    listaDeProductos.addEventListener('click', ({ target }) => {
        const name = target.dataset.name; // Obtiene el nombre del producto desde el atributo data-name
        if (target.classList.contains('cart-increment-btn')) {
            modificarCantidad(name, 1);
        } else if (target.classList.contains('cart-decrement-btn')) {
            modificarCantidad(name, -1);
        } else if (target.classList.contains('remove-from-cart-btn')) {
            car = car.filter(i => i.name !== name); // Elimina el producto del carrito
            actualizarCarrito();
        }
    });

    // Eventos para abrir y cerrar la ventana emergente del carrito
    carritoIcon.addEventListener('click', () => ventanaEmergente.classList.toggle('open'));
    cerrar.addEventListener('click', () => ventanaEmergente.classList.remove('open'));

    // Evento para el botón de "Comprar"
    comprar.addEventListener('click', () => {
        if (car.length) {
            
            car = []; // Vacía el carrito
            actualizarCarrito();
            ventanaEmergente.classList.remove('open');
        } else {
            alert('Tu carrito está vacío. Agrega algunos productos antes de comprar.');
        }
    });
    actualizarCarrito();



});

