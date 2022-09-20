/* Getting the elements by class name. */
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
})

document.querySelectorAll(".nav-link").forEach(n => n.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
}))

const searchBar = document.getElementsByClassName("form-control");
const search = document.getElementsByClassName("fa-magnifying-glass");
const productsContainer = document.getElementsByClassName("products-container");
const cartCount = document.getElementsByClassName("cart-count");
const removeCartBtn = document.getElementsByClassName("remove-products");
const emptyCartBtn = document.getElementsByClassName("empty-cart");
const totalPrice = document.getElementsByClassName("total-price");
const updateProduct = document.getElementsByClassName("update-product");
const addNewProduct = document.getElementsByClassName("add-new-product");
const editBtn = document.getElementsByClassName("btn-info");
const deleteBtn = document.getElementsByClassName("btn-danger");
let cart = localStorage.getItem('cart');

/* This is a function that is called when the page is loaded. It fetches the data from the API and then
displays it on the page. */
window.addEventListener("load", async () => {
    const productsURL = "https://62bb213b7bdbe01d52983148.mockapi.io/Front";
    const result = await fetch(productsURL);
    const products = await result.json();
    if (products.length > 0) localStorage.setItem('cart', JSON.stringify(products));
    const productsContainer = document.getElementsByClassName("products-container");
    const cards = products
        .map(
            (product) =>
                `<div class="card-body" style=width:20em>
                 <img class="card-img" src="${product.image}" alt="Product Image"/>
                  <h4 class="card-title">${product.name}</h4>
                  <p class="card-price">${product.price} €</p>
				  <div class="buttons">
                  <a href="details.html?product-id=${product.id}" class="main-btn btn-responsive"  role="button">Details</a>
				  <button data-product_id=${product.id} class="main-btn btn-responsive add-products">Add to cart</button>
               </div>
			   </div>
            </div>`
        )
        .join('');
    productsContainer[0].innerHTML = cards;
    console.log(cards);
    const addCartBtn = document.getElementsByClassName("add-products");
    for (let i = 0; i < addCartBtn.length; i++) {
        console.log('Added to cart');
        addCartBtn[i].addEventListener('click', addToCart);
    }
});

/**
 * It fetches the product from the API and adds it to the cart.
 * @param event - The event object is a property of the Window object. It describes the event's type,
 * whether it bubbles or can be canceled, and its target element.
 */

async function addToCart(event) {
    const addToCartBtn = event.target;
    console.log(event.target);
    let productId = event.target.dataset.product_id;
    const productsURL = `https://62bb213b7bdbe01d52983148.mockapi.io/Front/${productId}`;
    const result = await fetch(productsURL);
    const product = await result.json();
    let cart = [];
    if (localStorage.getItem('cart') == null) {
        cart = [{ ...product, noOfProducts: 1 }];
        updateCartInfo(cart);
    } else {
        cart = JSON.parse(localStorage.getItem('cart'));
        const productInCart = cart.find(
            (productFromCart) => productFromCart.id == product.id
        );
        if ('noOfProducts' in productInCart) {
            productInCart.noOfProducts++;
            updateCartInfo(cart);
        } else {
            const productToBeAddedInCart = { ...product, noOfProducts: 1 };
            cart.push(productToBeAddedInCart);
            updateCartInfo(cart);
        }
    }
    localStorage.setItem('cart', JSON.stringify(cart));
}

/**
 * It takes a cart as an argument and updates the cart description with the number of products in the
 * cart.
 * @param cart - the cart array
 */
function updateCartDescription(cart) {
    let cartDescription = 0;
    cart.forEach((product) => {
        cartDescription = cartDescription + product.noOfProducts;
    });
    document.querySelector('.cart-description').innerHTML = cartDescription;
}
function updateCartInfo(cart) {
    let cartCount = 0;
    console.log(cart);
    cart.forEach((product) => {
        if ('noOfProducts' in product) {
            cartCount = cartCount + product.noOfProducts;
        }
    });
    document.querySelector('.cart-count').innerHTML = cartCount;
}