// cart Array 
let cart = []
ReclaimItemCache()

// Function to acess local storage
function ReclaimItemCache() {
    cart = []
    const cartObjects = localStorage.length
    for (let i = 0; i < cartObjects; i++) {
        const item = localStorage.getItem(localStorage.key(i));
        const cartObjects = JSON.parse(item);
        cart.push(cartObjects)
    }
    document.getElementById('cart__items').innerHTML = ""
    cart.forEach((product) => showItems(product))
}

function showItems(product) {
    const article = createArticle(product)
    document.getElementById("cart__items").append(article)
    showTotalQuantity(product)
    showTotalPrice()
}
function showTotalQuantity() {
    const totalQuantity = document.querySelector("#totalQuantity")
    const total = cart.reduce((total, product) => total + parseInt(product.qty), 0)
    totalQuantity.textContent = total
}
function showTotalPrice() {
    const totalPrice = document.querySelector("#totalPrice")
    const total = cart.reduce((total, product) => total + product.price * product.qty, 0)
    totalPrice.textContent = total
}

function showSettings(product) {
    const settings = document.createElement("div")
    settings.classList.add("cart__items__settings")
    //appendQuantityToSettings(settings, product)
    appendDeleteToSettings(settings, product)
    return settings
}

//Function set delete product button
function appendDeleteToSettings(settings, product) {
    const div = document.createElement("div")
    div.classList.add("cart__item__settings__delete,deleteproduct")
    const p = document.createElement("p")
    p.textContent = "Delete"
    p.addEventListener("click", () => deleteProduct(product))
    div.appendChild(p)
    settings.appendChild(div)
}

//function to delete item
function deleteProduct(product, quantity) {
    const deleteProduct = cart.findIndex(
        (items) => product.id === items.id && product.color === items.color)
    cart.splice(deleteProduct, 1)
    let local = localStorage.key(deleteProduct)
    window.localStorage.removeItem(local);
    ReclaimItemCache()
    showTotalPrice()
    showTotalQuantity()

}

// Show product - html
function createArticle(product) {
    const article = document.createElement("article");
    article.classList.add("cart__item");
    article.setAttribute("data-id", product.id);
    article.setAttribute("data-color", product.color);
    article.innerHTML = `
    <div class="cart__item__img">
    <img src=${product.image} alt=${product.alt}>
    </div>
    <div class="cart__item__content">
    <div class="cart__item__content__description">
    <h2>${product.name}</h2>
    <p>${product.color}</p>
    <p>${product.price}</p>
    </div>
    <div class="cart__item__content__settings">
    <div class="cart__item__content__settings__quantity">
    <p>Qté : </p>
    <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value=${product.qty}>
    </div>
    <div class="cart__item__content__settings__delete">
    <p class="deleteItem" onclick='deleteProduct(${JSON.stringify(product)})'>Delete</p>
    </div>
    </div>
    </div>`
    return article
};



//Get information to Form
const form = document.querySelector(".cart__order__form")
const firstName = document.getElementById('firstName');
const lastName = document.getElementById('lastName');
const address = document.getElementById('address');
const city = document.getElementById('city');
const email = document.getElementById('email');


//post body is  data we just created
// a key value pair for firstname and firstname value from the input
function createBody() {
    let body = {
        contact: {
            firstName: firstName.value,
            lastName: lastName.value,
            address: address.value,
            city: city.value,
            email: email.value,
        },
        // represent all the ids inside your cart array ['13','125'] map over and return the id only 
        products: getIdsFromCache()
    }

    function getIdsFromCache() {
        let numbersProducts = localStorage.length
        let ids = []
        for (let i = 0; i < numbersProducts; i++) {
            let key = JSON.parse(localStorage.getItem(localStorage.key(i)))
            console.log('keys', key)
            ids.push(key.id)
        }
        return ids
    }
    return body
}







//function for commander button 
document.getElementById("order").addEventListener('click', (event) => {
    event.preventDefault();


    // validate the input before code continue  not empty and have text inside 
    function validateForm() {
        let x = document.forms["myForm"]["fname"].value;
        if (x == "") {
            alert("Name must be filled out");
            return false;
        }
    }

    // api requets is localhost:3000/api/products/order 
    const url = 'http://localhost:3000/api/products/order';

    // is a post request - Api request  - function Post Request
    const body = createBody()
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    })
        .then(body => {
            return body.json();
        })
        .then(post => {
            console.log(post);
            sessionStorage.setItem('orderId', post.orderId)
            window.location.href = "confirmation.html"
        });
});


//Regular Expression (RegEx)
//Regex regex = new Regex(@"^\d$");???????????
const noNumbersRegEx = new RegExp(/^[A-Za-z ]*$/);
//Regex for email - ????
const emailRegEx = new RegExp(/\S+@\S+\.\S+/g);

//Error Message



