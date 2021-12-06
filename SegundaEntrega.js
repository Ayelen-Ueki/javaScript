const antojos =
    [
        { id: 1, nombre: "alfajorcitos", precio: 500 },
        { id: 1, nombre: "aRogel", precio: 600 },
        { id: 2, nombre: "cookies", precio: 300 }
    ]
let carrito = [];

// Reemplazar con JQuery
let botones = document.getElementsByClassName("botonCompra")

for (let boton of botones) {
    boton.addEventListener("click", agregarCarrito)
}

for (let boton of botones) {
    boton.addEventListener("click", calculototal)
}

$("#finCompra").on("click", compraFinalizada);

// $(`.botonCompra`).on("click", agregarCarrito);

function agregarCarrito() {
    let carritoGuardado = JSON.parse(localStorage.getItem("Carrito"))
    if (carritoGuardado) {
        let botonId = this.id
        let prodEncontrado = antojos.find(p => botonId === p.nombre)
        carritoGuardado.push(prodEncontrado)
        localStorage.setItem("Carrito", JSON.stringify(carritoGuardado))
        Swal.fire({
            icon: 'success',
            title: 'Gracias!',
            text: 'Has agregado un nuevo item al carrrito',
            footer: '<a href="">Ver carrito</a>',

        })
    }

    else {
        let botonId = this.id
        let prodEncontrado = antojos.find(p => botonId === p.nombre)
        carrito.push(prodEncontrado)
        localStorage.setItem("Carrito", JSON.stringify(carrito))
        Swal.fire({
            icon: 'success',
            title: 'Gracias!',
            text: 'Has agregado un nuevo item al carrrito',
            footer: '<a href="">Ver carrito</a>',
        })
    }
    mostrarCarrito()
}

function mostrarCarrito() {
    let carritoGuardado = JSON.parse(localStorage.getItem("Carrito"))
    let elementosCarrito = document.createElement("ul")
    elementosCarrito.id = "listaCarrito"
    for (let productos of carritoGuardado) {
        let li = document.createElement("li")
        li.innerHTML= `<h3> Producto:${productos.nombre}</h3>
        <b> Precio: $${productos.precio} </b>`
        elementosCarrito.appendChild(li)
    }
    let productosAgregados=document.getElementById('productosEnCarrito')
    productosAgregados.innerHTML=""
    productosAgregados.appendChild(elementosCarrito)
}

function calculototal() {
    let carritoGuardado = JSON.parse(localStorage.getItem("Carrito"))
    if (carritoGuardado) {
        if (carritoGuardado.length >= 1) {
            let compra = carritoGuardado.map(item => item.precio).reduce((prev, curr) => prev + curr, 0);
            console.log(compra)
            return compra
        }
    }
}



function compraFinalizada(e) {
    e.preventDefault()
    if (!calculototal()) {
        Swal.fire({
            icon: 'error',
            title: 'Ojo!!',
            text: `Todavía no hay nada en el carrito`,
            footer: '<a href="">Ver carrito</a>',
        })
    }
    else {
        localStorage.clear()
        $("#listaCarrito").remove();
        Swal.fire({
            icon: 'success',
            title: 'Gracias!',
            text: `Compra finalizada, el precio total es de: ${calculototal()}`,
            footer: '<a href="">Ver carrito</a>',
        })
    }
}

















