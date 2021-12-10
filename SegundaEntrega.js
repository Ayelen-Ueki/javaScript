const antojos =
    [
        { id: 1, nombre: "alfajorcitos", precio: 500 },
        { id: 2, nombre: "aRogel", precio: 600 },
        { id: 3, nombre: "cookies", precio: 300 }
    ]
let carrito = [];


$(`.botonCompra`).on("click", agregarCarrito);

$(`.botonCompra`).on("click", calculototal);

$("#finCompra").on("click", compraFinalizada);

function guardarLocal(nombre, array) {
    localStorage.setItem(nombre, JSON.stringify(array))
}

function agregarCarrito() {
    let carritoGuardado = JSON.parse(localStorage.getItem("Carrito"))
    if (carritoGuardado) {
        let botonId = this.id
        let prodEncontrado = antojos.find(p => botonId === p.nombre)
        carritoGuardado.push(prodEncontrado)
        guardarLocal("Carrito", carritoGuardado)
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
        guardarLocal("Carrito", carrito)
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
    for (let id in carritoGuardado) {
        let productos = carritoGuardado[id]
        let li = document.createElement("li")
        li.innerHTML = `<h3 id=${productos.id}> Producto:${productos.nombre}</h3>
        <b> Precio: $${productos.precio} </b>
        <br><button id= "carrito_${id} class="eliminar">🗑️</button></br>`
        elementosCarrito.appendChild(li)
    }
    let productosAgregados = document.getElementById('productosEnCarrito')
    productosAgregados.innerHTML = ""
    productosAgregados.appendChild(elementosCarrito)
    eliminarProducto()
}

let botones = document.getElementsByClassName("eliminar")

function eliminarProducto() {
    for (const boton of botones) {
        let carritoGuardado = JSON.parse(localStorage.getItem("Carrito"))
            boton.onclick = () => {
            let id = boton.getAttribute("id");
            idNumber = id.split("_")[1]
            carritoGuardado.splice(idNumber, 1)

            Swal.fire({
                icon: 'success',
                title: 'Eliminado!',
                text: 'Tu producto ha sido eliminado con éxito',
                footer: '<a href="">Ver carrito</a>',
            })
        }
    }
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
        $("#listaCarrito").remove();
        Swal.fire({
            icon: 'success',
            title: 'Gracias!',
            text: `Compra finalizada, el precio total es de: ${calculototal()}`,
            footer: '<a href="">Ver carrito</a>',
        })
        localStorage.clear()
    }
}


$("#envio").on("click", calculoEnvio);


function calculoEnvio() {
    Swal.fire({
        title: 'Envío',
        html:
            'Dirección: ' + '<input id="swal-input1" class="swal2-input">' + '<br>' +
            'Código Postal:' + '<input id="swal-input2" class="swal2-input">' + '</br>',
        focusConfirm: false,
        preConfirm: () => {
            return [
                document.getElementById('swal-input1').value,
                document.getElementById('swal-input2').value
            ]
        }
    })
}












