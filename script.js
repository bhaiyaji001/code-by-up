// Cart logic, search, toast, and checkout
let cart = [];
const cartCount = document.getElementById('cart-count');
const cartItems = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');
const checkoutBtn = document.getElementById('checkout-btn');
const toast = document.getElementById('toast');

function showToast(message) {
  toast.innerText = message;
  toast.style.display = 'block';
  setTimeout(() => {
    toast.style.display = 'none';
  }, 3000);
}

function updateCart() {
  cartCount.textContent = cart.length;
  cartItems.innerHTML = '';
  let total = 0;

  if (cart.length === 0) {
    cartItems.innerHTML = '<p>Your cart is empty.</p>';
    cartTotal.innerHTML = '';
    checkoutBtn.style.display = 'none';
    return;
  }

  cart.forEach(item => {
    const div = document.createElement('div');
    div.textContent = `${item.name} - $${item.price.toFixed(2)}`;
    cartItems.appendChild(div);
    total += item.price;
  });

  cartTotal.innerHTML = `<h3>Total: $${total.toFixed(2)}</h3>`;
  checkoutBtn.style.display = 'inline-block';
}

function addToCart(name, price) {
  cart.push({ name, price });
  updateCart();
  showToast(`${name} added to cart!`);
}

// Attach events to buttons
const buttons = document.querySelectorAll('.product button');
buttons.forEach(button => {
  button.addEventListener('click', () => {
    const product = button.parentElement;
    const name = product.querySelector('h3').innerText;
    const price = parseFloat(product.querySelector('.price').innerText.replace('$', ''));
    addToCart(name, price);
  });
});

// Search Functionality
const searchInput = document.getElementById('search');
searchInput.addEventListener('input', function () {
  const term = this.value.toLowerCase();
  document.querySelectorAll('.product').forEach(product => {
    const name = product.querySelector('h3').innerText.toLowerCase();
    product.style.display = name.includes(term) ? 'block' : 'none';
  });
});

// Checkout simulation
checkoutBtn.addEventListener('click', () => {
  alert('Thank you for your purchase!');
  cart = [];
  updateCart();
});
