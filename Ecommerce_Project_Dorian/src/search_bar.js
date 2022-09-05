// search-bar

let searchInput = document.querySelector('#searchField');
let resultsContainer = document.querySelector('.products-container');

searchInput.addEventListener('input', searchResults);

async function searchResults(event) {
    event.preventDefault();
    let value = event.target.value;
    const searchURL = 'https://62bb213b7bdbe01d52983148.mockapi.io/Front/';
    const result = await fetch(searchURL);
    const productsResult = await result.json();


    if (value && value.trim().length > 0) {
        value = value.trim().toUpperCase()
    }

    let filterProducts = productsResult.filter((product) =>
        product.name.includes(value)
    )
    const cardsSearch = filterProducts.map(
        (product) =>
            `<div class="card-body">
			 <img class="card-img" src="${product.image}" alt="Product Image"/>
			  <h4 class="card-title" style= "font-size: 1rem;">${product.name}</h4>
			  <p class="card-text">${product.price} $</p>
			  <div class="buttons">
			  <a href="details.html?product-id=${product.id}" class="main-btn btn-responsive"  role="button">Details</a>
			  <button data-product-id=${product.id} class="main-btn btn-responsive">Add to Cart</button>
		   </div>
		    </div>
		    </div>`

    )
        .join('');

    resultsContainer.innerHTML = cardsSearch;
}

export default searchResults;