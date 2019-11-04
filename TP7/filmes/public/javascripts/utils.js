function deleteItem(id) {
    console.log("Deleting item " + id);
    axios
      .delete("/movie/delete/" + id)
      .then(response => {
        window.location.assign("/");
      })
      .catch(function(error) {
        console.log("Error in deleteItem");
      });
  }
  
  function updateItem(id) {
    console.log("Updating item de id " + id);
  
    let fieldsToUpdate = {
      title: document.getElementsByName("title")[0].value,
      year: document.getElementsByName("year")[0].value,
      cast: document
        .getElementsByName("cast")[0]
        .value.split(",") //separar por virgulas os elementos
        .filter(e => e.trim().length != 0)  //retirar os campos vazios
        .map(e => e.trim()),
      genres: document
        .getElementsByName("genres")[0]
        .value.split(",")
        .filter(e => e.trim().length != 0)
        .map(e => e.trim())
    };
    axios
      .put("/movie/update/" + id, fieldsToUpdate)
      .then(response => {
        window.location.assign(`/movie/${id}`);
      })
      .catch(function(error) {
        console.log("Error in updateItem");
      });
  }