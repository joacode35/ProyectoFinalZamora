let contenedorProductos = document.getElementById("container");
let footer = document.getElementById("apikey");

let crearProductosHTML = (productos) => {
  productos.forEach((item) => {
    let productoNuevo = document.createElement("div");
    productoNuevo.classList = "producto-item";
    productoNuevo.innerHTML = `
    <img src=${item.img}>
    <h2>${item.nombre}</h3>
    <p>$${item.precio}</p>
    <button id="toasty">Agregar al carrito</button>
    `;
    contenedorProductos.appendChild(productoNuevo);
    productoNuevo
      .getElementsByTagName("button")[0]
      .addEventListener("click", () => addCarrito(item));
  });
};

crearProductosHTML(graficos);

const informacion = (posicion) => {
  let lat = posicion.coords.latitude;
  let long = posicion.coords.longitude;
  let key = "e90a3911f9c65a6fbb19a791e1e4d65e";

  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${key}&units=metric&lang=es`
  )
    .then((response) => response.json())
    .then((data) => {
      footer.innerHTML = `<p>${data.name}</p>
      <p>  ${data.main.temp}º</p>
      `;
    });
};

navigator.geolocation.getCurrentPosition(informacion);
