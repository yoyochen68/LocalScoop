const stripe = Stripe('pk_test_51L0LzJFUoS9VoaHu6WSiXxAlw8eQkRSxhwPyIqGgJsLrK7Fd1l7lRwPT8QFMBB4KGfGBzAmOS2zTarlW4dfiRMbZ00qYWxFKeH'); // Your Publishable Key
const elements = stripe.elements();


const card = elements.create('card');
card.mount('#card-element');

const form = document.querySelector('form');
const errorEl = document.querySelector('#card-errors');

// Give our token to our form
const stripeTokenHandler = token => {
  const hiddenInput = document.createElement('input');
  hiddenInput.setAttribute('type', 'hidden');
  hiddenInput.setAttribute('name', 'stripeToken');
  hiddenInput.setAttribute('value', token.id);
  form.appendChild(hiddenInput);

  form.submit();
}

// Create token from card data
form.addEventListener('submit', e => {
  e.preventDefault();

  stripe.createToken(card).then(res => {
    if (res.error) errorEl.textContent = res.error.message;
    else stripeTokenHandler(res.token);
  })
})