const antojos =
    [
        { id: 1, nombre: "alfajorcitos", precio: 500 },
        { id: 2, nombre: "cookies", precio: 300 }
    ]
let carrito = [];
let elementosCarrito = $('#productosEnCarrito');
let botones = document.getElementsByClassName("botonCompra")
mostrarCarrito()

for (let boton of botones) {
    boton.addEventListener("click", agregarCarrito)
}

function agregarCarrito() {
    let carritoGuardado = JSON.parse(localStorage.getItem("Carrito"))
    console.log(carritoGuardado)
    if (carritoGuardado) {
        let botonId = this.id
        let prodEncontrado = antojos.find(p => botonId === p.nombre)
        carritoGuardado.push(prodEncontrado)
        localStorage.setItem("Carrito", JSON.stringify(carritoGuardado))
    }

    else {
        let botonId = this.id
        let prodEncontrado = antojos.find(p => botonId === p.nombre)
        carrito.push(prodEncontrado)
        localStorage.setItem("Carrito", JSON.stringify(carrito))
    }
    mostrarCarrito()
}

console.log(carrito)

function mostrarCarrito() {
    let carritoGuardado = JSON.parse(localStorage.getItem("Carrito"))
    if (carritoGuardado)
    {for (let productos of carritoGuardado) {
        elementosCarrito.append(`
     <div id="producto_${productos.id}">
        <h3> Producto:${productos.nombre}</h3>
        <b> Precio: $${productos.precio} </b>
     </div>
     `)
    }}
}














