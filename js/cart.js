const products = [
  {
    productId: 100,
    name: "Air Max Tavas",
    price: 59.99,
    quantity: 0,
    image: "./images/product-img1.jpg"
  },
  {
    productId: 101,
    name: "Jordan 1 Retro",
    price: 149.99,
    quantity: 0,
    image: "./images/product-img2.jpg"
  },
  {
    productId: 102,
    name: "KD 9 Brooklyn",
    price: 239.99,
    quantity: 0,
    image: "./images/product-img3.jpg"
  },
];

const cart = [];

function addProductToCart (productId) { 
  products.forEach(product => {
    // Gets the correct product based on productId, increases quantity
    if (product.productId === productId) {
      product.quantity += 1;

      // If the product is not already in the cart, add it to the cart
      if (!cart.includes(product)) {
        cart.push(product);
      }
    }
  });
}

function removeProductFromCart (productId) { 
  products.forEach(product => {
    // Gets the correct product, updates quantity to 0
    if (product.productId === productId) {
      product.quantity = 0;
      const index = cart.indexOf(product);
      // Removes the product from the cart
      cart.splice(index, 1);
    }
  });
}

function increaseQuantity (productId) { 
  products.forEach(product => {
    // Gets the correct product, increases quantity
    if (product.productId === productId) {
      product.quantity += 1;
    }
  });
}

function decreaseQuantity (productId) { 
  products.forEach(product => {
    // Gets the correct product, decreases quantity
    if (product.productId === productId) {
      product.quantity -= 1;

      // Removes from cart if quantity is 0
      if (product.quantity <= 0) {
        removeProductFromCart(productId);
      }
    }
  });
}

function cartTotal () {
  const sum = cart.reduce((acc, item) => {
    // Iterate through cart to get total of all products
    return acc + (item.price * item.quantity);
  }, 0);
  
  // Return the sum of products in cart
  return sum;

  // Original Method Used
  // cart.forEach(product => {
  //   sum += product.price * product.quantity;
  // });
  // return sum;
  
}

function emptyCart () {
  cart.forEach(product => {
    product.quantity = 0;
  });
  // Empties products from cart
  cart.splice(0, cart.length);
}

let cashReturned = undefined;
let receivedCash = 0;

function pay(amount) {
  const total = cartTotal();
  receivedCash += amount;
  cashReturned = receivedCash - total;

  if (cashReturned >= 0) {
    // Returns positive number if money should be returned to customer
    emptyCart();
    receivedCash = 0;
    return cashReturned;
  } else {
    // Returns negative number if there is a remaining balance
    cashReturned = -(total - receivedCash);
    return cashReturned;
  }
}

const originalPrices = products.map(product => product.price);
const exchangeRates = {
  USD: 1,
  EUR: 0.85,
  YEN: 110.14,
  GBP: 0.72
};

function currency(currencyCode) {
  products.forEach((product, index) => {
    product.price = (originalPrices[index] * exchangeRates[currencyCode]).toFixed(2);
  });
}

module.exports = {
  products,
  cart,
  addProductToCart,
  increaseQuantity,
  decreaseQuantity,
  removeProductFromCart,
  cartTotal,
  pay, 
  emptyCart,
  currency
}