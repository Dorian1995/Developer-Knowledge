const updateProduct = document.getElementsByClassName("update-product");
const addNewProduct = document.getElementsByClassName("add-new-product");
const editBtn = document.getElementsByClassName("btn-info");
const deleteBtn = document.getElementsByClassName("btn-danger");
const productsURL = "https://62bb213b7bdbe01d52983148.mockapi.io/Front";
const productTableBody = document.querySelector('.admin-products-table');
const btnAddNewProduct = document.querySelector('.add-new-product');
const btnUpdateProduct = document.querySelector('.update-product');

/**
 * It's an event listener that listens for a click on the productTableBody element, and when it hears a
 * click, it calls the handleAdminPanel function.
 */
window.addEventListener('load', getAllProducts);

async function getAllProducts() {
    const result = await fetch(productsURL);
    const products = await result.json();

    const tableRows = products
        .map(
            (product) =>
                `<tr class="table-products">
            <th scope="row">${product.id}</th>
			<td><img class="card-img" style="width:10em;" src="${product.image}" alt="Product Image"/></td>
            <td >${product.name}</td>
			<td>${product.price}$</td>
			<td>${product.description}</td>
            <td><button class="btn btn-danger delete" data-product-id=${product.id}><i
                                class="fa-solid fa-trash"></i></button></td>
            <td><button class="btn btn-info edit" data-product-id=${product.id}><i
                                class="fa-solid fa-pen-to-square"></i></button></td>
          </tr>`
        )
        .join('');

    productTableBody.innerHTML = tableRows;
}

productTableBody.addEventListener('click', handleAdminPanel);


/**
 * When the button with the id of btnAddNewProduct is clicked, run the function addNewProduct.
 * @param event - The event object is a JavaScript object that contains useful information about an
 * event.
 */
async function handleAdminPanel(event) {
    const productId = event.target.getAttribute('data-product-id');
    if (event.target.classList.contains('delete')) {
        let response = await fetch(`${productsURL}/${productId}`, {
            method: 'DELETE',
        });
        console.log(response);
        getAllProducts();
    } else if (event.target.classList.contains('edit')) {
        editproductById(productId);
    }
}

btnAddNewProduct.addEventListener('click', addNewProduct);

/**
 * It's a function that updates a product.
 * @param event - The event object is automatically passed to the event handler by the browser.
 */

btnUpdateProduct.addEventListener('click', updateProduct);

/**
 * It takes the values from the form and sends them to the server to update the product.
 * @param event - The event object is automatically passed to the event handler by the browser.
 */

/**
 * It takes a productId as a parameter, fetches the product from the server, and then populates the
 * form with the product's data.
 * @param productId - The id of the product to be edited.
 */
async function editproductById(productId) {
    const productImageEdit = document.getElementById('image');
    const productNameEdit = document.getElementById('name');
    const productPriceEdit = document.getElementById('price');
    const productDescriptionEdit = document.getElementById('description');
    const productIdHiddenElement = document.getElementById('productId');

    let response = await fetch(`${productsURL}/${productId}`);
    let product = await response.json();

    productImageEdit.value = product.image;
    productNameEdit.value = product.name;
    productPriceEdit.value = product.price;
    productDescriptionEdit.value = product.description;
    productIdHiddenElement.value = product.id;
}