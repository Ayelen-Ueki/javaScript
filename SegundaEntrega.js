const antojos =
    [
        { id: 1, nombre: "alfajorcitos", precio: 500 },
        { id: 1, nombre: "aRogel", precio: 500 },
        { id: 2, nombre: "cookies", precio: 300 }
    ]
let carrito = [];
let elementosCarrito = $('#productosEnCarrito');

// Reemplazar con JQuery
let botones = document.getElementsByClassName("botonCompra")

for (let boton of botones) {
    boton.addEventListener("click", agregarCarrito)
}

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
            footer: '<a href="">Ver carrito</a>'
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
            footer: '<a href="">Ver carrito</a>'
        })
    }
    mostrarCarrito()
    calculototal()
}

function mostrarCarrito() {
    let carritoGuardado = JSON.parse(localStorage.getItem("Carrito"))
    if (carritoGuardado) {
        let carritoActualizado = carritoGuardado[carritoGuardado.length - 1]
        elementosCarrito.append(`
    <div id="producto_${carritoActualizado.id}">
        <ul>
            <li>
                <h3> Producto:${carritoActualizado.nombre}</h3>
                <b> Precio: $${carritoActualizado.precio} </b>
            </li>
        </ul>
    </div>
        `)

    }
}

// function calculototal()
// {
//     let carritoGuardado = JSON.parse(localStorage.getItem("Carrito"))
//     if (carritoGuardado)
//     {
//         for (let monto of carritoGuardado)
//         {
//             monto = (carritoGuardado[carritoGuardado.length-1].precio) + (carritoGuardado[carritoGuardado.length-2].precio);
//             console.log(monto)
//         }     
//     }

// }













