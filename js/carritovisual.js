let contenedorProductos = document.getElementById("container");
let contenedorUnidades = document.getElementById("unidad");
let contenedorPrecio = document.getElementById("precio");
let compraMensaje = document.getElementById("compra");

let crearProductosHTML = () => {
  contenedorProductos.innerHTML = "";
  let productos = JSON.parse(localStorage.getItem("items"));
  console.log(productos);
  if (productos && productos.length > 0) {
    productos.forEach((item) => {
      let productoNuevo = document.createElement("div");
      productoNuevo.classList = "producto-item";
      productoNuevo.innerHTML = `
    <img src=${item.img}>
    <h2>${item.nombre}</h3>
    <p>$${item.precio}</p>
    <article>
    
    <span class="contador">${item.cantidad} </span>
    <button>X</button>
    </article>
    `;
      contenedorProductos.appendChild(productoNuevo);
      productoNuevo
        .getElementsByTagName("button")[0]
        .addEventListener("click", (e) => {
          delCarrito(item);
          crearProductosHTML();
          totalesFuncion();
        });
    });
  }
};

crearProductosHTML();

let totalesFuncion = () => {
  let productos = JSON.parse(localStorage.getItem("items"));
  let unidades = 0;
  let precio = 0;
  if (productos && productos.length > 0) {
    productos.forEach((item) => {
      unidades += item.cantidad;
      precio += item.precio * item.cantidad;
    });
  }
  contenedorUnidades.innerText = unidades;
  contenedorPrecio.innerText = precio;
};

totalesFuncion();

compraMensaje.addEventListener("click", function (productos) {
  if (productos.length > 1) {
    Swal.fire({
      icon: "success",
      title: "Compra exitosa",
      text: "¡Gracias por tu compra, llegara en 7 dias!",
    });
  } else {
    Swal.fire({
      icon: "error",
      title: "Hubo un error...",
      text: "Lo siento, no hay productos para vender.",
    });
  }
});

/*
let compraAlert = () => {
  if (productos.length > 0) {
    Swal.fire({
      icon: "success",
      title: "Compra exitosa",
      text: "¡Gracias por tu compra!",
    });
  }
};

compraAlert();
*/
