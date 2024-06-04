let users = JSON.parse(localStorage.getItem('users')) || [];

$(document).ready(function() {
    $('#formulario-contacto').submit(function(event) {
        event.preventDefault();

        var nombre = $('#nombre').val();
        var email = $('#email').val();
        var telefono = $('#telefono').val();
        var edad = $('#edad').val();
        var password = $('#registerPassword').val();

        if (!nombre || !/^[a-zA-ZáéíóúÁÉÍÓÚ\s]+$/.test(nombre.trim())) {
            alert('Por favor, ingresa un nombre válido.');
            return;
        }

        if (!email || !/^\S+@\S+\.\S+$/.test(email.trim())) {
            alert('Por favor, ingresa un correo electrónico válido.');
            return;
        }

        if (!telefono || !/^\d{7,15}$/.test(telefono.trim())) {
            alert('Por favor, ingresa un número de teléfono válido.');
            return;
        }

        if (!edad || isNaN(edad) || edad < 18) {
            alert('Por favor, ingresa una edad válida (mayor de 18 años).');
            return;
        }

        const user = { nombre, email, telefono, edad, password };
        users.push(user);
        localStorage.setItem('users', JSON.stringify(users));

        alert('Registro exitoso');
        window.location.href = "index.html";
    });

    $('#loginForm').submit(function(event) {
        event.preventDefault();
        const email = $('#loginEmail').val();
        const password = $('#loginPassword').val();
        
        const user = users.find(user => user.email === email && user.password === password);
        if (user) {
            localStorage.setItem('loggedInUser', JSON.stringify(user));
            alert('Inicio de sesión exitoso');
            $('#loginModal').modal('hide');
            updateNavbar();
        } else {
            alert('Credenciales incorrectas');
        }
    });

    updateNavbar();
});

function updateNavbar() {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    const navbar = document.querySelector('.navbar-nav.ml-auto');

    if (loggedInUser) {
        navbar.innerHTML = `
            <li class="nav-item">
                <a class="nav-link" href="index.html">Inicio</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="productos.html">Productos</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="ofertas.html">Ofertas</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="contacto.html">Contacto</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="acerca.html">Acerca de</a>
            </li>
            <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Carrito
                </a>
                <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                    <ul id="cart-items" class="dropdown-item"></ul>
                    <p class="dropdown-item">Total: <span id="cart-total-price">$0.00</span></p>
                    <button onclick="checkout()" class="dropdown-item">Pagar</button>
                </div>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="#" onclick="logout()">Cerrar sesión (${loggedInUser.nombre})</a>
            </li>
        `;
    } else {
        navbar.innerHTML = `
            <li class="nav-item">
                <a class="nav-link" href="index.html">Inicio</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="productos.html">Productos</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="ofertas.html">Ofertas</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="contacto.html">Contacto</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="acerca.html">Acerca de</a>
            </li>
            <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Carrito
                </a>
                <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                    <ul id="cart-items" class="dropdown-item"></ul>
                    <p class="dropdown-item">Total: <span id="cart-total-price">$0.00</span></p>
                    <button onclick="checkout()" class="dropdown-item">Pagar</button>
                </div>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="#" data-toggle="modal" data-target="#loginModal">Iniciar Sesión</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="formulario.html">Registrarse</a>
            </li>
        `;
    }
}

function logout() {
    localStorage.removeItem('loggedInUser');
    alert('Sesión cerrada');
    updateNavbar();
}
