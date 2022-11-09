const cards = document.getElementById('cards');
const items = document.getElementById('items');
const footer = document.getElementById('footer');
const carritoVacio = document.getElementById('carritoVacio');
const numeral = document.getElementById('numeral');
const itemCarro = document.getElementById('itemCarro');
const cantidadCarro = document.getElementById('cantidadCarro');
const accionCarro = document.getElementById('accionCarro');
const totalCarro = document.getElementById('totalCarro');
const titulo = document.getElementById('titulo');
const tituloCarrito = document.getElementById('tituloCarrito');
const templateCard = document.getElementById('template-card').content;
const templateFooter = document.getElementById('template-footer').content;
const templateCarrito = document.getElementById('template-carrito').content;
const fragment = document.createDocumentFragment();
const btnRegistro = document.getElementById('btnRegistro');
const divRegistro = document.getElementById('divRegistro');
const divTienda = document.getElementById('divTienda');
const formulario = document.getElementById('formulario');
const inputs = document.querySelectorAll('#formulario input');
const formularioLogin = document.getElementById('formularioLogin');
const btn_login_enviar = document.getElementById('btn_login_enviar');
const btnLogin = document.getElementById('btnLogin');
const divLogin = document.getElementById('divLogin');
const inputUsuarioLogin = document.getElementById('inputUsuarioLogin');
const inputloginPass = document.getElementById('inputloginPass');
const btnLogout = document.getElementById('btnLogout');
const divContenidoRestringido = document.getElementById('divContenidoRestringido');
const nombreUsuario = document.getElementById('nombreUsuario')
const usuBienvenida = document.getElementById('usuBienvenida')

//Formulario de Registro

const expresiones = {
    usuario: /^[a-zA-Z0-9\_\-]{4,16}$/,
    nombre: /^([A-ZÁÉÍÓÚ]{1}[a-zñáéíóú]+[\s]*)+$/,
    password: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,12}/,
    correo: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/,
    telefono: /^(?:(?:00)?549?)?0?(?:11|[2368]\d)(?:(?=\d{0,2}15)\d{2})??\d{8}$/,
}

const campos = {
    usuario: false,
    nombre: false,
    password: false,
    correo: false,
    telefono: false
}

const validarFormulario = (e) => {
    switch (e.target.name) {
        case "usuario":
            validarCampo(expresiones.usuario, e.target, 'usuario');
            break;
        case "nombre":
            validarCampo(expresiones.nombre, e.target, 'nombre');
            break;
        case "password":
            validarCampo(expresiones.password, e.target, 'password');
            validarPassword2();
            break;
        case "password2":
            validarPassword2();
            break;
        case "correo":
            validarCampo(expresiones.correo, e.target, 'correo');
            break;
        case "telefono":
            validarCampo(expresiones.telefono, e.target, 'telefono');
            break;
    }
}

const validarCampo = (expresion, input, campo) => {
    if (expresion.test(input.value)) {
        document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-incorrecto');
        document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-correcto');
        document.querySelector(`#grupo__${campo} i`).classList.add('fa-check-circle');
        document.querySelector(`#grupo__${campo} i`).classList.remove('fa-times-circle');
        document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.remove('formulario__input-error-activo');
        campos[campo] = true;
    } else {
        document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-incorrecto');
        document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-correcto');
        document.querySelector(`#grupo__${campo} i`).classList.add('fa-times-circle');
        document.querySelector(`#grupo__${campo} i`).classList.remove('fa-check-circle');
        document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.add('formulario__input-error-activo');
        campos[campo] = false;
    }
}

const validarPassword2 = () => {
    const inputPassword1 = document.getElementById('password');
    const inputPassword2 = document.getElementById('password2');

    if (inputPassword1.value !== inputPassword2.value) {
        document.getElementById(`grupo__password2`).classList.add('formulario__grupo-incorrecto');
        document.getElementById(`grupo__password2`).classList.remove('formulario__grupo-correcto');
        document.querySelector(`#grupo__password2 i`).classList.add('fa-times-circle');
        document.querySelector(`#grupo__password2 i`).classList.remove('fa-check-circle');
        document.querySelector(`#grupo__password2 .formulario__input-error`).classList.add('formulario__input-error-activo');
        campos['password'] = false;
    } else {
        document.getElementById(`grupo__password2`).classList.remove('formulario__grupo-incorrecto');
        document.getElementById(`grupo__password2`).classList.add('formulario__grupo-correcto');
        document.querySelector(`#grupo__password2 i`).classList.remove('fa-times-circle');
        document.querySelector(`#grupo__password2 i`).classList.add('fa-check-circle');
        document.querySelector(`#grupo__password2 .formulario__input-error`).classList.remove('formulario__input-error-activo');
        campos['password'] = true;
    }
}

inputs.forEach((input) => {
    input.addEventListener('keyup', validarFormulario);
    input.addEventListener('blur', validarFormulario);
});

class Usuario {
    constructor(usuario, constrasena, id) {
        this.usuario = usuario;
        this.constrasena = constrasena;
        this.id = id;
    }
    asignarId(array) {
        this.id = array.length;
    }
    asignarId(array) {
        this.id = array.length;
    }
}

const usuarios = [
    new Usuario("martin", "mar123", 1),
    new Usuario("profe", "1234profe", 2),
]

//ABM Usuario

function abm(usuarioInput, password) {
    console.log(usuarioInput, password);
    const nuevoUsuario = new Usuario(usuarioInput, password);
    usuarios.push(nuevoUsuario);
    nuevoUsuario.asignarId(usuarios);
}

formulario.addEventListener('submit', (e) => {
    e.preventDefault();
    const usuarioInput = document.getElementById('inputUsuario').value;
    const password = document.getElementById('password').value;
    if (campos.usuario && campos.nombre && campos.password && campos.correo && campos.telefono) {
        formulario.reset();
        abm(usuarioInput, password)
        Swal.fire({
            icon: 'success',
            title: 'Registro Exitoso!',
            text: 'Ahora te invitamos a loguearte',
            footer: '<a href="">Martin Gigena Curchod - Curso JS - Coder</a>',
            confirmButtonText: 'Login',
            backdrop: '#E5E5E5',
            timer: 3500
        })

        divTienda.classList.add('displayOff');
        divRegistro.classList.add('displayOff');
        divContenidoRestringido.classList.add('displayOff');
        divLogin.classList.remove('displayOff');
        document.querySelectorAll('.formulario__grupo-correcto').forEach((icono) => {
            icono.classList.remove('formulario__grupo-correcto');
        });
        campos.usuario = false
        campos.nombre = false
        campos.password = false
        campos.correo = false
        campos.telefono = false

    } else {
        document.getElementById('formulario__mensaje').classList.add('formulario__mensaje-activo');
    }
});

//validar usuario

function validarUsuario(usuariosDB, usuario, password) {
    let encontrado = usuariosDB.find(usuarioDB => usuarioDB.usuario == usuario);

    if (typeof encontrado === 'undefined') {
        return false;
    } else {
        if (encontrado.constrasena != password) {
            return false;
        } else {
            return encontrado;
        }
    }
}



btnLogout.addEventListener('click', () => {

    Swal.fire({
        icon: 'success',
        title: `Gracias VUELVA PRONTOSSS!`,
        footer: '<a href="">Martin Gigena Curchod - Curso JS - Coder</a>',
        backdrop: '#E5E5E5',
        timer: 4000
    })

    localStorage.clear();
    sessionStorage.clear();
    divRegistro.classList.add('displayOff')
    divTienda.classList.add('displayOff');
    divLogin.classList.add('displayOff');
    btnLogin.classList.remove('displayOff')
    btnLogout.classList.add('displayOff')
    divContenidoRestringido.classList.remove('displayOff')
})

btnLogin.addEventListener('click', () => {
    divTienda.classList.add('displayOff');
    divRegistro.classList.add('displayOff');
    divLogin.classList.remove('displayOff')
    divContenidoRestringido.classList.add('displayOff')

})

btn_login_enviar.addEventListener('click', (e) => {
    e.preventDefault();
    if (inputUsuarioLogin.value == '' || inputloginPass.value == '') {
        Swal.fire({
            icon: 'warning',
            title: 'Oops...',
            text: 'Todos los campos son requeridos!',
            footer: '<a href="">Martin Gigena Curchod - Curso JS - Coder</a>'
        })
    } else {
        let dataUsuarioLogin = validarUsuario(usuarios, inputUsuarioLogin.value, inputloginPass.value);

        if (!dataUsuarioLogin) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Usuario y/o contraseña erróneos!',
                footer: '<a href="">Martin Gigena Curchod - Curso JS - Coder</a>'
            })
        } else {
            Swal.fire({
                icon: 'success',
                title: `Bienvenido/a ${dataUsuarioLogin.usuario}`,
                text: 'Disfruta de nuestra tienda y nuestros productos',
                footer: '<a href="">Martin Gigena Curchod - Curso JS - Coder</a>',
                confirmButtonText: 'Login',
                backdrop: '#E5E5E5',
            })

            usuBienvenida.innerHTML = `Bienvenido/a ${dataUsuarioLogin.usuario}`
            divLogin.classList.add('displayOff')
            divTienda.classList.remove('displayOff')
            btnLogin.classList.add('displayOff')
            btnLogout.classList.remove('displayOff')
            divContenidoRestringido.classList.add('displayOff')
        }
    }
})

btnRegistro.addEventListener('click', () => {
    divTienda.classList.add('displayOff');
    divRegistro.classList.remove('displayOff');
    divLogin.classList.add('displayOff')
    divContenidoRestringido.classList.add('displayOff')
})

let carrito = {}

document.addEventListener('DOMContentLoaded', e => {
    titulo.innerHTML = 'Productos de nuestra tienda'
    tituloCarrito.innerHTML = 'Carrito de compras'
    numeral.innerHTML = '#'
    itemCarro.innerHTML = 'Item'
    cantidadCarro.innerHTML = 'Cantidad'
    accionCarro.innerHTML = 'Acción'
    totalCarro.innerHTML = 'Total'
    carritoVacio.innerHTML = 'Carrito vacío - comience a comprar!'

    fetchData()
    if (localStorage.getItem('carrito')) {
        carrito = JSON.parse(localStorage.getItem('carrito'))
        pintarCarrito()
    }
});
cards.addEventListener('click', e => { addCarrito(e) });
items.addEventListener('click', e => { btnAumentarDisminuir(e) })

// Traer productos
const fetchData = async() => {
    const res = await fetch('api.json');
    const data = await res.json()
    pintarCards(data)
}

// Pintar productos

const pintarCards = data => {
    data.forEach(item => {
        templateCard.querySelector('h5').textContent = item.title
        templateCard.querySelector('p').textContent = item.precio
        templateCard.querySelector('img').setAttribute("src", item.thumbnailUrl)
        templateCard.querySelector('button').dataset.id = item.id
        const clone = templateCard.cloneNode(true)
        fragment.appendChild(clone)
    })
    cards.appendChild(fragment)
}

// Agregar al carrito
const addCarrito = e => {
    if (e.target.classList.contains('btn-dark')) {
        setCarrito(e.target.parentElement)
    }
    e.stopPropagation()
}

const setCarrito = item => {
    const producto = {
        title: item.querySelector('h5').textContent,
        precio: item.querySelector('p').textContent,
        id: item.querySelector('button').dataset.id,
        cantidad: 1
    }

    if (carrito.hasOwnProperty(producto.id)) {
        producto.cantidad = carrito[producto.id].cantidad + 1
    }

    carrito[producto.id] = {...producto }

    pintarCarrito()
}

const pintarCarrito = () => {
    items.innerHTML = ''

    Object.values(carrito).forEach(producto => {
        templateCarrito.querySelector('th').textContent = producto.id
        templateCarrito.querySelectorAll('td')[0].textContent = producto.title
        templateCarrito.querySelectorAll('td')[1].textContent = producto.cantidad
        templateCarrito.querySelector('span').textContent = producto.precio * producto.cantidad
        templateCarrito.querySelector('.btn-info').dataset.id = producto.id
        templateCarrito.querySelector('.btn-danger').dataset.id = producto.id

        const clone = templateCarrito.cloneNode(true)
        fragment.appendChild(clone)
    })
    items.appendChild(fragment)

    pintarFooter()

    localStorage.setItem('carrito', JSON.stringify(carrito))
}

const pintarFooter = () => {
    footer.innerHTML = ''

    if (Object.keys(carrito).length === 0) {
        footer.innerHTML = `
        <th scope="row" colspan="5">Carrito vacío - comience a comprar!</th>
        `
        return
    }

    // sumar cantidad y sumar totales
    const nCantidad = Object.values(carrito).reduce((acc, { cantidad }) => acc + cantidad, 0)
    const nPrecio = Object.values(carrito).reduce((acc, { cantidad, precio }) => acc + cantidad * precio, 0)


    templateFooter.querySelectorAll('td')[0].textContent = nCantidad
    templateFooter.querySelector('span').textContent = nPrecio

    const clone = templateFooter.cloneNode(true)
    fragment.appendChild(clone)

    footer.appendChild(fragment)

    const botonVaciar = document.querySelector('#vaciar-carrito')
    botonVaciar.addEventListener('click', () => {
        carrito = {}
        pintarCarrito()
    })

}

const btnAumentarDisminuir = e => {

    if (e.target.classList.contains('btn-info')) {
        const producto = carrito[e.target.dataset.id]
        producto.cantidad++
            carrito[e.target.dataset.id] = {...producto }
        pintarCarrito()
    }

    if (e.target.classList.contains('btn-danger')) {
        const producto = carrito[e.target.dataset.id]
        producto.cantidad--
            if (producto.cantidad === 0) {
                delete carrito[e.target.dataset.id]
            } else {
                carrito[e.target.dataset.id] = {...producto }
            }
        pintarCarrito()
    }
    e.stopPropagation()
}