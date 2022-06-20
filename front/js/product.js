
const apiUrl = "http://localhost:3000/api/products";
const items = document.getElementById('items')

const queryString = window.location.search;

//Using URLSearchParams to display the choose item
const urlParams = new URLSearchParams(window.location.search);

const item = urlParams.get('items');

console.log(`items`);


// Function to get item image
fetch(apiUrl)
  .then(response => {
    const json = response.json()
    return json;
  })
  .then(data => {
    displayItem(data)
    itemChosen = data;
  })
  .catch(err => console.log(err));

// function to get item information 
const itemImg = document.getElementsByClassName('item__img');
const getData = async () => {
  try {
    const response = await fetch(apiUrl);
    const jsonResponse = await response.json();

    jsonResponse.forEach(product => {
      items.innerHTML += `
    <article>
            <div class="item__img">
              <<img src="${product.imageUrl}" alt="${product.altText}"> 
            </div>
            <div class="item__content">

              <div class="item__content__titlePrice">
                <h1 id="title"><!-- Nom du produit --></h1>
                <p>Prix : <span id="price">${product.price}</span>€</p>
              </div>

              <div class="item__content__description">
                <p class="item__content__description__title">Description:</p>
                <p id="description">${product.description}</p>
              </div>

              <div class="item__content__settings">
                <div class="item__content__settings__color">
                  <label for="color-select">Chose your color:</label>
                  <select name="color-select" id="colors"${product.color}>
                      <option value="">--Please, select a color --</option>
<                      <option value="vert">vert</option>
                      <option value="blanc">blanc</option> 
                  </select>
                </div>

                <div class="item__content__settings__quantity">
                  <label for="itemQuantity">Number of articles (1-100):</label>
                  <input type="number" name="itemQuantity" min="1" max="100" value="0" id="quantity">
                </div>
              </div>

              <div class="item__content__addButton">
                <button id="addToCart">Add to cart</button>
              </div>

            </div>
          </article>`;
    })
  } catch (error) {
    console.log(error)
  }
};
