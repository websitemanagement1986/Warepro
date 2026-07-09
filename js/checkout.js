function renderCartPage() {
  const items = getCartDetails();
  const container = document.getElementById('cart-content');
  if (!container) return;

  if (!items.length) {
    container.innerHTML = `
      <div class="empty-cart">
        <h2>Your cart is empty</h2>
        <p>Browse our software categories and add products to get started.</p>
        <a href="categories.html" class="btn btn-primary">Browse Software</a>
      </div>`;
    return;
  }

  const rows = items.map((item) => `
    <tr>
      <td><a href="product.html?id=${item.id}">${item.name}</a><br><small>${item.vendor}</small></td>
      <td>₹${item.price.toLocaleString('en-IN')}</td>
      <td>
        <div class="qty-control">
          <button onclick="updateQuantity('${item.id}', ${item.qty - 1})">−</button>
          <span>${item.qty}</span>
          <button onclick="updateQuantity('${item.id}', ${item.qty + 1})">+</button>
        </div>
      </td>
      <td>₹${item.lineTotal.toLocaleString('en-IN')}</td>
      <td><button class="btn-remove" onclick="removeFromCart('${item.id}'); renderCartPage();">✕</button></td>
    </tr>`).join('');

  const total = getCartTotal();
  container.innerHTML = `
    <table class="cart-table">
      <thead><tr><th>Product</th><th>Price</th><th>Qty</th><th>Total</th><th></th></tr></thead>
      <tbody>${rows}</tbody>
    </table>
    <div class="cart-summary">
      <div class="cart-total">
        <span>Order Total (incl. GST)</span>
        <strong>₹${total.toLocaleString('en-IN')}</strong>
      </div>
      <a href="checkout.html" class="btn btn-primary btn-lg">Proceed to Checkout</a>
    </div>`;
}

function validateCheckoutForm(data) {
  const errors = [];
  if (!data.name?.trim()) errors.push('Full name is required');
  if (!data.email?.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) errors.push('Valid email is required');
  if (!data.phone?.trim() || !/^[6-9]\d{9}$/.test(data.phone.replace(/\D/g, '').slice(-10))) errors.push('Valid 10-digit Indian mobile number is required');
  if (!data.address?.trim()) errors.push('Address is required');
  if (!data.city?.trim()) errors.push('City is required');
  if (!data.state?.trim()) errors.push('State is required');
  if (!data.pincode?.trim() || !/^\d{6}$/.test(data.pincode)) errors.push('Valid 6-digit pincode is required');
  if (getCart().length === 0) errors.push('Your cart is empty');
  return errors;
}

function getCheckoutData() {
  return {
    name: document.getElementById('name')?.value.trim(),
    email: document.getElementById('email')?.value.trim(),
    phone: document.getElementById('phone')?.value.trim(),
    address: document.getElementById('address')?.value.trim(),
    city: document.getElementById('city')?.value.trim(),
    state: document.getElementById('state')?.value.trim(),
    pincode: document.getElementById('pincode')?.value.trim(),
  };
}

function renderCheckoutSummary() {
  const el = document.getElementById('checkout-summary');
  if (!el) return;
  const items = getCartDetails();
  const total = getCartTotal();
  el.innerHTML = `
    <h3>Order Summary</h3>
    ${items.map((i) => `<div class="summary-row"><span>${i.name} × ${i.qty}</span><span>₹${i.lineTotal.toLocaleString('en-IN')}</span></div>`).join('')}
    <div class="summary-row total"><span>Total</span><span>₹${total.toLocaleString('en-IN')}</span></div>
    <p class="payment-note">🔒 Secure payment via Razorpay — UPI, Cards & Net Banking accepted</p>`;
}

async function initiatePayment() {
  const data = getCheckoutData();
  const errors = validateCheckoutForm(data);
  const errEl = document.getElementById('checkout-errors');
  if (errors.length) {
    if (errEl) errEl.innerHTML = errors.map((e) => `<p>${e}</p>`).join('');
    return;
  }
  if (errEl) errEl.innerHTML = '';

  const btn = document.getElementById('pay-btn');
  if (btn) { btn.disabled = true; btn.textContent = 'Processing...'; }

  const cart = getCart();
  try {
    const res = await fetch('/api/create-order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ cart, customer: data }),
    });
    const result = await res.json();
    if (!res.ok) throw new Error(result.error || 'Failed to create order');

    const options = {
      key: result.key_id,
      amount: result.amount,
      currency: result.currency,
      name: 'Warepro',
      description: 'Software Purchase',
      order_id: result.order_id,
      prefill: { name: data.name, email: data.email, contact: data.phone },
      theme: { color: '#ff6b00' },
      handler: async function (response) {
        try {
          const verifyRes = await fetch('/api/verify-payment', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              ...response,
              customer: data,
              cart,
            }),
          });
          const verifyData = await verifyRes.json();
          if (!verifyRes.ok) throw new Error(verifyData.error || 'Payment verification failed');

          sessionStorage.setItem('warepro_order', JSON.stringify({
            transactionId: verifyData.transaction_id,
            amount: result.amount / 100,
            customer: data,
            items: getCartDetails(),
          }));
          clearCart();
          window.location.href = 'success.html';
        } catch (err) {
          alert('Payment verification failed: ' + err.message);
        }
      },
      modal: {
        ondismiss: function () {
          if (btn) { btn.disabled = false; btn.textContent = 'Pay Now'; }
        },
      },
    };

    const rzp = new Razorpay(options);
    rzp.on('payment.failed', function () {
      window.location.href = 'cancel.html';
    });
    rzp.open();
  } catch (err) {
    alert(err.message + '\n\nNote: Payment API requires deployment on Vercel with Razorpay keys configured.');
    if (btn) { btn.disabled = false; btn.textContent = 'Pay Now'; }
  }
}

function renderSuccessPage() {
  const raw = sessionStorage.getItem('warepro_order');
  const el = document.getElementById('success-content');
  if (!el) return;
  if (!raw) {
    el.innerHTML = '<p>No order found. <a href="index.html">Go home</a></p>';
    return;
  }
  const order = JSON.parse(raw);
  el.innerHTML = `
    <div class="success-box">
      <div class="success-icon">✓</div>
      <h1>Payment Successful!</h1>
      <p class="txn-id">Transaction ID: <strong>${order.transactionId}</strong></p>
      <p>Thank you, ${order.customer.name}! A confirmation email has been sent to <strong>${order.customer.email}</strong>.</p>
      <div class="order-details">
        <h3>Order Details</h3>
        ${order.items.map((i) => `<p>${i.name} × ${i.qty} — ₹${i.lineTotal.toLocaleString('en-IN')}</p>`).join('')}
        <p class="order-total"><strong>Total Paid: ₹${order.amount.toLocaleString('en-IN')}</strong></p>
      </div>
      <p class="support-note">For support, call <a href="tel:${WAREPRO.phone}">${WAREPRO.phoneDisplay}</a> or email <a href="mailto:${WAREPRO.email}">${WAREPRO.email}</a></p>
      <a href="index.html" class="btn btn-primary">Continue Shopping</a>
    </div>`;
  sessionStorage.removeItem('warepro_order');
}

document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('cart-content')) renderCartPage();
  if (document.getElementById('checkout-summary')) renderCheckoutSummary();
  if (document.getElementById('success-content')) renderSuccessPage();
  const payBtn = document.getElementById('pay-btn');
  if (payBtn) payBtn.addEventListener('click', initiatePayment);
});
