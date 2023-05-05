// //Usuarios 
let usuario = document.getElementById("usuario");
let contrasenia = document.getElementById("contrasenia");
let iniciarSesion = document.getElementById("iniciar");

// Comprobar si hay datos guardados en el almacenamiento local
if(localStorage.getItem("usuario") && localStorage.getItem("contrasenia")) {
  // Si hay datos, cargarlos en los campos de entrada correspondientes
  usuario.value = JSON.parse(localStorage.getItem("usuario"));
  contrasenia.value = JSON.parse(localStorage.getItem("contrasenia"));
}

iniciarSesion.addEventListener("click", () => {
  if (usuario.value == usuarioBD && contrasenia.value == contraseniaBD) {
    Swal.fire({
      icon: 'success',
      title: 'Bienvenido',
      showConfirmButton: false,
      timer: 1500
    });;

    // Guardar los datos del usuario en el almacenamiento local como JSON
    localStorage.setItem("usuario", JSON.stringify(usuario.value));
    localStorage.setItem("contrasenia", JSON.stringify(contrasenia.value));
  } else {
    Swal.fire({
      icon: 'error',
      title: 'Datos incorrectos',
      showConfirmButton: false,
      timer: 1500
    });
  }
});

//Usuario ya cargado y posteriormente almacenado en la base de datos local
let usuarioBD = "juani"
let contraseniaBD = "juani123"


let contenedorProductos = document.getElementById("contenedorProductos")
//Renderizo las tarjetas de los productos por medio de JSON
fetch('productos.json')
  .then(response => response.json())
  .then(data => {
    // Aquí puedes manipular los datos recibidos del archivo JSON
    productos = data; // Asignamos los datos del JSON a la variable productos
    renderizarTarjetas(productos); // Volvemos a renderizar las tarjetas con los nuevos datos
  })

let buscador = document.getElementById("buscador")
buscador.addEventListener("input", filtrarPorNombre)

let inputs = document.getElementsByClassName("input")
for (const input of inputs) {
  input.addEventListener("click", filtrarPorCategoria)
}

//Filtrar por categoria
function filtrarPorCategoria (e) {
  let filtros = []
  for (const input of inputs) {
    if (input.checked) {
      filtros.push(input.id)
    }
  }
  let arrayFiltrado = productos.filter(producto => {
    if (filtros.includes(producto.categoria)) {
      return producto
    }
  })
  renderizarTarjetas(arrayFiltrado.length > 0 ? arrayFiltrado : productos)
}

//Filtro por nombre
function filtrarPorNombre() {
  let arrayFiltrado = productos.filter(producto => producto.nombre.includes(buscador.value))
  renderizarTarjetas(arrayFiltrado)
}


function renderizarTarjetas(arrayDeProductos) {
    contenedorProductos.innerHTML = ""
    arrayDeProductos.forEach(({ categoria, nombre, precio, img, stock}) => {
        let tarjeta = document.createElement("div");
        tarjeta.className = "tarjetaProducto";
        tarjeta.innerHTML = `
        <h1>${nombre}</h1>
        <p>Categoría: ${categoria}</p>
        <p>Precio: ${precio}</p>
        <p>Stock: ${stock}</p>
        <div class="imagen" style="background-image: url(${img})"></div>
        <button id="comprar">COMPRAR</button>
        `;
        contenedorProductos.appendChild(tarjeta);
    });
}

let carrito = [];
let total = 0;

// Función para agregar productos al carrito
function agregarAlCarrito(producto) {
  if (producto.stock > 0) { // Agregar el producto solo si hay stock disponible
    carrito.push(producto);
    total += producto.precio;
    producto.stock--;
    Swal.fire(`El producto ${producto.nombre} ha sido agregado al carrito.`);
  } else {
    Swal.fire(`Lo siento, el producto ${producto.nombre} está agotado.`);
  }
}

// Función para renderizar el carrito de compras
function renderizarCarrito() {
  let carritoHTML = document.getElementById("carrito");
  carritoHTML.innerHTML = "";
  carrito.forEach(({ nombre, precio }) => {
    let itemCarrito = document.createElement("div");
    itemCarrito.innerHTML = `${nombre} - $${precio}`;
    carritoHTML.appendChild(itemCarrito);
  });
  let totalHTML = document.getElementById("total");
  totalHTML.innerHTML = `${total}`;
}



// Agregar evento de click a los botones de comprar
let botonesComprar = document.getElementById("comprar");
for (let i = 0; i < botonesComprar; i++) {
  botonesComprar[i].addEventListener("click", () => {
    agregarAlCarrito(productos[i]);
    renderizarCarrito();
  });
}

// Renderizar las tarjetas de productos
function renderizarTarjetas(arrayDeProductos) {
  contenedorProductos.innerHTML = "";
  arrayDeProductos.forEach(({ categoria, nombre, precio, img, stock }, i) => {
    let tarjeta = document.createElement("div");
    tarjeta.className = "tarjetaProducto";
    tarjeta.innerHTML = `
        <h1>${nombre}</h1>
        <p>Categoría: ${categoria}</p>
        <p>Precio: ${precio}</p>
        <p>Stock: ${stock}</p>
        <div class="imagen" style="background-image: url(${img})"></div>
        <button class="comprar">COMPRAR</button>
        `;
    if (stock === 0) {
      tarjeta.classList.add("sinStock");
    } else {
      tarjeta.addEventListener("click", () => {
        agregarAlCarrito(productos[i]);
        renderizarCarrito();
      });
    }
    contenedorProductos.appendChild(tarjeta);
  });
}
//Funcion vaciar carrito
let vaciarCarrito = document.getElementById("finalizarCompra")
carrito = [],

vaciarCarrito.addEventListener('click', () => {
    carrito.length = 0
})

//Agrego unos sweet alert para finalizar la compra con un procesando seguido de un exito y vaciando el carrito.
document.getElementById("finalizarCompra").addEventListener("click", function () {
  Swal.fire({
    title: 'Procesando...',
    showConfirmButton: false,
    allowOutsideClick: false,
    timer: 2000 // Simulamos un retraso de 2 segundos
  });

  setTimeout(function () {
    Swal.close(); // Cerrar el mensaje de "Procesando..."
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: '¡Gracias por su compra!',
      showConfirmButton: false,
      timer: 1500
    });
    
    setTimeout(function () {
      carrito.length = 0; // Vaciar el carrito
      renderizarCarrito(); // Renderizar el carrito vacío
    }, 1500); // Esperar 1.5 segundos antes de vaciar y renderizar el carrito
  }, 2000); // Esperar 2 segundos antes de mostrar el Sweet Alert
});