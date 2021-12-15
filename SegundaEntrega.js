const antojos =
    [
        { id: 1, nombre: "alfajorcitos", precio: 500, cantidad: 0 },
        { id: 2, nombre: "aRogel", precio: 600, cantidad: 0 },
        { id: 3, nombre: "cookies", precio: 300, cantidad: 0 }
    ]

$(`.botonCompra`).on("click", agregarCarrito);

$(`.botonCompra`).on("click", calculototal);

$("#finCompra").on("click", compraFinalizada);

function guardarLocal(nombre, array) {
    localStorage.setItem(nombre, JSON.stringify(array))
}

function agregarCarrito() {
    let carritoGuardado = JSON.parse(localStorage.getItem("Carrito"))
    if (carritoGuardado && carritoGuardado.length) {
        let botonId = this.id
        let prodEncontrado = carritoGuardado.find(p => botonId === p.nombre)
        prodEncontrado.cantidad += 1
        guardarLocal("Carrito", carritoGuardado)
        Swal.fire({
            icon: 'success',
            title: 'Gracias!',
            text: 'Has agregado un nuevo item al carrrito',
            footer: '<a href="">Ver carrito</a>',

        })
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
            text: 'Has agregado un nuevo item al carrrito',
            footer: '<a href="">Ver carrito</a>',
        })
    }
    mostrarCarrito()
}
mostrarCarrito()

function mostrarCarrito() {
    let carritoGuardado = JSON.parse(localStorage.getItem("Carrito"))
    if (carritoGuardado) {
        let elementosCarrito = document.createElement("ul")
        elementosCarrito.id = "listaCarrito"
        for (let producto of carritoGuardado) {
            let li = document.createElement("li")
            li.innerHTML = `<h3 id=${producto.id}> Producto:${producto.nombre}</h3>
        <b> Precio: $${producto.precio} </b>
        <button id= ${producto.id} class="eliminar">🗑️</button>`
            elementosCarrito.appendChild(li)
        }
        let productosAgregados = document.getElementById('productosEnCarrito')
        productosAgregados.innerHTML = ""
        productosAgregados.appendChild(elementosCarrito)
        $(`.eliminar`).click(eliminarProducto)
        console.log($(`.eliminar`))
    }
}

let botones = document.getElementsByClassName("eliminar")

function eliminarProducto(e) {
    let button = e.target
    let carrito = JSON.parse(localStorage.getItem("Carrito"))
    carrito = carrito.filter(producto => producto.id != button.id)
    console.log(button.id)

    guardarLocal("Carrito", carrito)

    Swal.fire({
        icon: 'success',
        title: 'Eliminado!',
        text: 'Tu producto ha sido eliminado con éxito',
        footer: '<a href="">Ver carrito</a>',
    })
    mostrarCarrito()
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
        input: 'number',
        inputLabel: 'Código Postal',
        focusConfirm: false,
    })
    $(".swal2-confirm").click(mostrarEnvio);
}

function mostrarEnvio() {
    let cp = Swal.getInput().value
    Swal.fire({
        title: 'Envío', 
        text: 'Tu código Postal es: ' + cp,
        focusConfirm: false,
    })
}


function mostrar()
{let flag = true;
$("#mostrar").click(() => {
    if (flag) {
        $("#listaCarrito").slideUp("slow")
        $("#mostrar").html("Mostrar")
    }
    else {
        $("#listaCarrito").slideDown("slow")
        $("#mostrar").html("Ocultar")
    }
    flag = !flag;
})}




