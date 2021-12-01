const antojos = 
[
    {id: 1, nombre: "alfajorcitos", precio: 500},
    {id: 2, nombre: "cookies", precio: 300}
]
let carrito = [];

let botones =  document.getElementsByClassName ("botonCompra")

for (let boton of botones)
{
    boton.addEventListener ("click", agregarCarrito)
}

function agregarCarrito ()
{
    let botonId = this.id
    let prodEncontrado = antojos.find ( p => botonId === p.nombre)
    carrito.push (prodEncontrado)
}
 
console.log(carrito)

let elementosCarrito = $('#productosEnCarrito');    

for (let productos of carrito)
{
    elementosCarrito.append(`
     <div id="producto_${productos.id}">
        <h3> Producto:${productos.nombre}</h3>
        <b> Precio: $${productos.precio} </b>
     </div>
     `)
}

    localStorage.setItem("Carrito", JSON.stringify(carrito))

    let carritoGuardado = JSON.parse(localStorage.getItem("Carrito"))













