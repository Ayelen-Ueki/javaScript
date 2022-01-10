const antojos = [];

$.getJSON(`../antojos.json`, function (antojate) {
    antojate.forEach(productos => antojos.push(productos))
})

$(`.botonCompra`).on("click", agregarCarrito);


function guardarLocal(nombre, array) {
    localStorage.setItem(nombre, JSON.stringify(array))
}

// Para agregar los productos al local storage a medida que se van agregando al carrito
function agregarCarrito() {
    let carritoGuardado = JSON.parse(localStorage.getItem("Carrito"))
    if (carritoGuardado && carritoGuardado.length) {
        let botonId = this.id
        let prodEncontrado = carritoGuardado.find(p => botonId === p.nombre)
        if (prodEncontrado) {
            prodEncontrado.cantidad += 1
            guardarLocal("Carrito", carritoGuardado)
            Swal.fire({
                icon: 'success',
                title: 'Gracias!',
                text: 'Has agregado un nuevo item al carrito',
            })
        } else {
            Swal.fire({
                icon: 'success',
                title: 'Gracias!',
                text: 'Has agregado un nuevo item al carrito',

            })
            let prodEncontrado = antojos.find(p => botonId === p.nombre)
            let nuevo = prodEncontrado
            nuevo.cantidad = 1
            carritoGuardado.push(nuevo)
            guardarLocal("Carrito", carritoGuardado)
        }
    }
    else {
        let carrito = []
        let botonId = this.id
        let prodEncontrado = antojos.find(p => botonId === p.nombre)
        let nuevo = prodEncontrado
        nuevo.cantidad = 1
        carrito.push(nuevo)
        guardarLocal("Carrito", carrito)
        Swal.fire({
            icon: 'success',
            title: 'Gracias!',
            text: 'Has agregado un nuevo item al carrito',
        })
    }
}

