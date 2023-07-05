let currencySymbol = '$';

// Draws product list
function drawProducts() {
    let productList = document.querySelector('.products');
    let productItems = '';
    products.forEach((element) => {
        productItems += `
            <div data-productId='${element.productId}'>
                <img src='${element.image}'>
                <h3>${element.name}</h3>
                <p>Price: ${currencySymbol}${element.price}</p>
                <button class="add-to-cart btn">Add to Cart</button>
            </div>
        `;
    });
    // Use innerHTML so that products only drawn once
    productList.innerHTML = productItems;
}

// Draws cart
function drawCart() {
    let cartList = document.querySelector('.cart');
    // Clear cart before drawing
    let cartItems = '';
    cart.forEach((element) => {
        let itemTotal = element.price * element.quantity;

        cartItems += `
            <div data-productId='${element.productId}'>
                <h3>${element.name}</h3>
                <p>Price: ${currencySymbol}${element.price}</p>
                <p>Quantity: ${element.quantity}</p>
                <p>Total: ${currencySymbol}${itemTotal}</p>
                <button class="qup btn">+</button>
                <button class="qdown btn">-</button>
                <button class="remove btn">Remove</button>
            </div>
        `;
    });
    // Use innerHTML so that cart products only drawn once
    cart.length
        ? (cartList.innerHTML = cartItems)
        : (cartList.innerHTML = 'You haven\'t added any items.');
}

// Draws checkout
function drawCheckout() {
    let checkout = document.querySelector('.cart-total');
    checkout.innerHTML = '';

    // Run cartTotal() from script.js
    let cartSum = cartTotal();

    let div = document.createElement('div');
    div.innerHTML = `<p>Cart Total: ${currencySymbol}${cartSum}`;
    checkout.append(div);
}

// Initialize store with products, cart, and checkout
drawProducts();
drawCart();
drawCheckout();

document.querySelector('.products').addEventListener('click', (e) => {
    let productId = e.target.parentNode.getAttribute('data-productId');
    productId *= 1;
    addProductToCart(productId);
    drawCart();
    drawCheckout();
});

// Event delegation used to support dynamically added cart items
document.querySelector('.cart').addEventListener('click', (e) => {
    // Helper nested higher order function to use below
    // Must be nested to have access to the event target
    // Takes in a cart function as an agrument
    function runCartFunction(fn) {
        let productId = e.target.parentNode.getAttribute('data-productId');
        productId *= 1;
        for (let i = cart.length - 1; i > -1; i--) {
            if (cart[i].productId === productId) {
                let productId = cart[i].productId;
                fn(productId);
            }
        }
        // Force cart and checkout redraw after cart function completes
        drawCart();
        drawCheckout();
    }

    // Check the target's class and run function based on class
    if (e.target.classList.contains('remove')) {
        // Run removeProductFromCart() from script.js
        runCartFunction(removeProductFromCart);
    } else if (e.target.classList.contains('qup')) {
        // Run increaseQuantity() from script.js
        runCartFunction(increaseQuantity);
    } else if (e.target.classList.contains('qdown')) {
        // Run decreaseQuantity() from script.js
        runCartFunction(decreaseQuantity);
    }
});

document.querySelector('.pay').addEventListener('click', (e) => {
    e.preventDefault();

    // Get input cash received field value, set to number
    let amount = document.querySelector('.received').value;
    amount *= 1;

    // Set cashReturn to return value of pay()
    let cashReturn = pay(amount);

    let paymentSummary = document.querySelector('.pay-summary');
    let div = document.createElement('div');

    /* If total cash received is greater than cart total, thank customer
    Else, request additional funds */
    if (cashReturn >= 0) {
        div.innerHTML = `
            <h3>Receipt</h3>
            <p>Cash Received: ${currencySymbol}${amount}</p>
            <p>Cash Returned: ${currencySymbol}${cashReturn}</p>
            <p>Thank You!</p>
        `;
    } else {
        // Reset cash field for next entry
        document.querySelector('.received').value = '';
        cashReturn = Math.abs(cashReturn);
        div.innerHTML = `
            <p>Cash Received: ${currencySymbol}${amount}</p>
            <p>Remaining Balance: ${currencySymbol}${cashReturn}</p>
            <p>Please pay off balance.</p>
            <hr/>
        `;
        div.classList.add('balance')
    }

    paymentSummary.append(div);
    // setTimeout(() => {
    //     paymentSummary.removeChild(div);
    // }, 5000);
      
});

// Remove all items from cart
function dropCart() {
    let shoppingCart = document.querySelector('.empty-btn');
    let div = document.createElement("a");
    div.classList.add("empty");
    div.innerHTML =`Empty Cart`;
    shoppingCart.append(div);
}

dropCart();

document.querySelector('.empty-btn').addEventListener('click', (e) => {
    if (e.target.classList.contains('empty')){
        emptyCart();
        drawCart();
        drawCheckout();
    }
})

// Change currency
function currencyBuilder() {
    let currencyPicker = document.querySelector('.currency-selector');
    let select = document.createElement("select");
    select.classList.add("currency-select");
    select.innerHTML = `<option value="USD">USD</option>
                        <option value="EUR">EUR</option>
                        <option value="YEN">YEN</option>
                        <option value="GBP">GBP</option>`;
    currencyPicker.append(select);
}
currencyBuilder();

document.querySelector('.currency-select').addEventListener('change', function handleChange(e) {
    switch(e.target.value) {
        case 'EUR':
            currencySymbol = '€';
            break;
        case 'YEN':
            currencySymbol = '¥';
            break;
        case 'GBP':
            currencySymbol = '£';
            break;
        default:
            currencySymbol = '$';
            break;
    }

    currency(e.target.value);
    drawProducts();
    drawCart();
    drawCheckout();
});