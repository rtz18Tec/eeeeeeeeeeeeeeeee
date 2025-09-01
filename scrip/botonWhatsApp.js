// Botón Comprar por WhatsApp
document.addEventListener('DOMContentLoaded', () => {
    const botonWhatsApp = document.querySelector('#checkout-btn');
    botonWhatsApp.addEventListener('click', generarEnlaceWhatsApp);

    function generarEnlaceWhatsApp() {
        const numeroWhatsApp = '921726650';
        const car = JSON.parse(localStorage.getItem('car')) || [];

        if (car.length === 0) {
            alert('Tu carrito está vacío.');
            return;
        }

        let mensaje = 'Hola, quiero comprar los siguientes productos:\n';

        car.forEach(({ name, precio, cantidad }) => {
            mensaje += `- ${name}: S/${precio} x${cantidad} (S/${(precio * cantidad).toFixed(2)})\n`;
        });

        const total = car.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
        mensaje += `\nTotal: S/${total.toFixed(2)}`;

        const enlace = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensaje)}`;
        window.location.href = enlace;
    }
});