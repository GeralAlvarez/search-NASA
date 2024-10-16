document.getElementById("btnBuscar").addEventListener("click", function() {
  let query = document.getElementById("inputBuscar").value;
  if (query.trim() === "") {
    alert("Por favor, ingrese un término de búsqueda");
    return;
  }

  let apiUrl = `https://images-api.nasa.gov/search?q=${query}`;
  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      let contenedor = document.getElementById("contenedor");
      contenedor.innerHTML = "";

      let items = data.collection.items;
      if (items.length === 0) {
        contenedor.innerHTML = "<p>No se encontraron imágenes para la búsqueda ingresada.</p>";
        return;
      }

      items.forEach(item => {
        let { title, description, date_created } = item.data[0];
        let imageUrl = item.links && item.links[0].href;

        let card = `
          <div class="col-md-4 mb-3 d-flex align-items-stretch">
            <div class="card" style="width: 20rem;">
              <img src="${imageUrl}" class="card-img-top" alt="${title}">
              <div class="card-body">
                <h5 class="card-title">${title}</h5>
                <p class="card-text">${description ? description : 'Descripción no disponible'}</p>
                <p class="card-text"><small class="text-muted">Fecha: ${new Date(date_created).toLocaleDateString()}</small></p>
              </div>
            </div>
          </div>
        `;
        contenedor.innerHTML += card;
      });
    })
    .catch(error => {
      console.error("Error al obtener los datos de la API:", error);
      alert("Ocurrió un error al obtener los datos de la API.");
    });
});
