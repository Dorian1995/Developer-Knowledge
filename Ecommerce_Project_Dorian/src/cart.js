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

const cartCount = document.getElementsByClassName("cart-count");
const addCartBtn = document.getElementsByClassName("add-products");
const removeCartBtn = document.getElementsByClassName("remove-products");
const emptyCartBtn = document.getElementsByClassName("empty-cart");
let cart = localStorage.getItem('cart');
/**
 * It takes an array of objects, loops through the array, and adds the value of the noOfProducts
 * property of each object to the cartCount variable.
 * @param cart - The cart array
 */
function updateCartInfo(cart) {
    let cartCount = 0;
    cart.forEach((product) => {
        cartCount = cartCount + product.noOfProducts;
    });
    document.querySelector('.cart-count').innerHTML = cartCount;
}

/* A function that is called when the page loads. It gets the cart from local storage, calculates the
total price, and updates the cart info. */
window.addEventListener('load', () => {
    const cart = JSON.parse(localStorage.getItem('cart'));
    //total price
    let total = 0;
    if (cart) {
        cart.forEach((product) => {
            if (product.noOfProducts) {
                total = total + Number(product.price) * product.noOfProducts;
            }
        });

        //cards
        /* Creating a string of HTML code that is then inserted into the DOM. */
        const productsCards = cart
            .map(
                (product) => {
                    if (product.noOfProducts) {
                        return `<div class="product-cards">
              <div class="card-body">
			  <img class="card-img" style="width:10em;" src="${product.image}" alt="Product Image"/>
               <h4 class="card-title">${product.name}</h4>
              <p class="card-price">${product.price} €</p>
              <p class="card-description">Quantity:
			  <button data-product-id=${product.id} class="remove-products cart-btn"> - </button>
		    <span class="cart-products"> ${product.noOfProducts}</span>
			<button data-product-id=${product.id} class="add-products cart-btn"> + </button>
			</p>
        </div>
		<button type=button data-product-id=${product.id} class="empty-cart"> EMPTY CART </button>
        </div>`;
                    } else {
                        return '';
                    }
                }
            )
            .join('');

        let totalPriceCard = `<div class="total-price">TOTAL: ${total} €</div>`;
        document.querySelector('.product-cards').innerHTML = productsCards;
        document.querySelector('.total-price').innerHTML = totalPriceCard;
        updateCartInfo(cart);

    }

});

/**
 * If the button clicked is the remove-products button, then decrease the number of products in the
 * cart by 1. If the button clicked is the add-products button, then increase the number of products in
 * the cart by 1. If the button clicked is the empty-cart button, then remove the product from the
 * cart.
 * @param event - The event object.
 */
const cartContainer = document.querySelector('.product-cards');
cartContainer.addEventListener('click', handleCartEvents);

function handleCartEvents(event) {
    const targetButton = event.target;
    let cart = JSON.parse(localStorage.getItem('cart'));

    const productInCart = cart.find(
        (productFromCart) =>
            productFromCart.id == targetButton.getAttribute('data-product-id')
    );

    let quantityParagraph = targetButton.parentNode;

    if (targetButton.classList.contains('remove-products')) {
        if (productInCart.noOfProducts > 0) productInCart.noOfProducts--;
        updateCartInfo(cart);
    } else if (targetButton.classList.contains('add-products')) {
        productInCart.noOfProducts++;
        updateCartInfo(cart);
    } else if (targetButton.classList.contains('empty-cart')) {
        productInCart.noOfProducts = 0;
        cart = cart.filter((product) => product.id != productInCart.id);
        targetButton.parentNode.remove();
        updateCartInfo(cart);
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    if (productInCart) {
        quantityParagraph.querySelector('.cart-products').innerHTML =
            productInCart.noOfProducts;
        let total = 0;
        cart.forEach((product) => {
            total = total + Number(product.price) * product.noOfProducts;
        });
        let totalPriceCard = `<div class="total-price">TOTAL: ${total} €</div>`;
        document.querySelector('.total-price').innerHTML = totalPriceCard;
    }
}

if (cart.length <= 0) {
    localStorage.removeItem('cart', JSON.stringify(cart));
    let removeTotalPrice = document.querySelector('.total-price-container');
    removeTotalPrice.classList.add('hide-containers');

}
