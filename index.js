function mostrarProductos() {
    
    fetch("insumos.json")
      .then(response => response.json())
      .then(insumos => {
       
        insumos.forEach(insumo => {
          
          const li = document.createElement("li");
          
          li.innerHTML = `
            <img src="${insumo.imagen}" alt="${insumo.nombre}">
            <h3>${insumo.nombre}</h3>
            <p>Precio: $${insumo.precio}</p>
            <button>Añadir al carrito</button>
          `;
          
          document.querySelector("#lista-productos ul").appendChild(li);
        });
      });
  }

  

  function añadirAlCarrito(e) {
    
    if (e.target.tagName === "BUTTON") {
      
      const boton = e.target;
      const li = boton.parentElement;
      const img = li.querySelector("img");
      const nombre = li.querySelector("h3").textContent;
      const precio = li.querySelector("p").textContent;
     
      const producto = {
        nombre: nombre,
        precio: precio,
        imagen: img.src
      };
    
      carrito.push(producto);
      
      document.querySelector("#carrito span").textContent = carrito.length;
      
      alert("Producto añadido al carrito de compras");
    }
  }
  
  
  document.querySelector("#lista-productos ul").addEventListener("click", añadirAlCarrito);

  

  function procesarPago() {
   
    let total = 0;
    carrito.forEach(producto => {
      total += parseFloat(producto.precio.replace("$", ""));
    });
   
    document.querySelector("#total").textContent = "$" + total.toFixed(2);
    
    const stripe = Stripe("tu-clave-pública-de-Stripe");
    
    stripe.redirectToCheckout({
      sessionId: "session-id-generado-por-Stripe"
    });
  }
  

  document.querySelector("#procesar-pago").addEventListener("click", procesarPago);

  

  fetch("datos/insumos.json")
  .then(response => response.json())
  .then(insumos => {
    
  });
