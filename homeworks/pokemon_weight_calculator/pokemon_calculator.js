let get_pokemon_card = (name, weight, photo) => {
  let li = document.createElement("li");
  li.className = "list-group-item pokemon";

  // Image of the card
  let image = document.createElement("img");
  image.className = "card-img-top";
  image.src = photo;

  let cardBody = document.createElement("div");

  // Card body title
  let cardTitle = document.createElement("h5");
  cardTitle.className = "card-title";
  cardTitle.append(document.createTextNode(name));
  // Card body text (weight)
  let cardText = document.createElement("p");
  cardText.className = "card-text";
  let spanWeight = document.createElement("span");
  spanWeight.className = "pokemon-weight";
  spanWeight.append(document.createTextNode(weight));

  cardBody.append(document.createTextNode("Weight: "));
  cardBody.append(spanWeight);

  // Button to delete
  let button = document.createElement("button");
  button.className = "btn btn-danger";
  button.append(document.createTextNode("Delete"));

  // Create the card and put everything inside
  let card = document.createElement("div");
  card.className = "card";
  card.style = "width: 18rem;";
  card.append(image);
  card.append(cardBody);
  card.append(button);

  return card;
};

function insert_pokemon_element_with_template(pokemonName, template_function) {
  let ajax_promise = new Promise((resolve, reject) => {
    let req = new XMLHttpRequest();
    req.open("GET", `https://pokeapi.co/api/v2/pokemon/${pokemonName}`, true);
    // Gets executed when readyState changes even if it is not a 4 state
    req.onreadystatechange = (req_event) => {
      console.log("inside the event handler of the request");
      // If request finished / received the answer
      if (req.readyState == 4) {
        // If it finished fine
        if (req.status == 200) {
          return resolve(req.response);
        } else {
          return reject(req.reject);
        }
      }
    };
    req.send(null);
  });

  let promise_thenable = (result) => {
    result = JSON.parse(result);
    let weight = result.weight;
    let sprite = result.sprites.front_default;
    let cardNode = template_function(pokemonName, weight, sprite);
    document.getElementById("item_list").append(cardNode);
    return result;
  };

  ajax_promise.then(promise_thenable).catch((err) => {
    return err;
  });
}