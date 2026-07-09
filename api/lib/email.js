async function sendViaResend({ to, subject, html }) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.FROM_EMAIL || 'orders@warepro.in';

  if (!apiKey) {
    console.log(`[EMAIL SKIPPED - no RESEND_API_KEY] To: ${to}, Subject: ${subject}`);
    return { skipped: true };
  }

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({ from: `Warepro <${from}>`, to, subject, html }),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || 'Failed to send email');
  }
  return res.json();
}

function buildOrderHtml({ transactionId, orderId, customer, items, total, isAdmin }) {
  const itemRows = items
    .map((i) => `<tr><td>${i.name}</td><td>${i.qty}</td><td>₹${i.lineTotal.toLocaleString('en-IN')}</td></tr>`)
    .join('');

  const title = isAdmin ? 'New Order Received' : 'Order Confirmation';
  const greeting = isAdmin
    ? `<p>A new order has been placed on Warepro.</p>`
    : `<p>Dear ${customer.name},</p><p>Thank you for your purchase from Warepro! Your payment was successful.</p>`;

  return `
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;">
      <h2 style="color:#0d9488;">${title}</h2>
      ${greeting}
      <p><strong>Transaction ID:</strong> ${transactionId}</p>
      <p><strong>Order ID:</strong> ${orderId}</p>
      <table style="width:100%;border-collapse:collapse;margin:16px 0;">
        <thead><tr style="background:#0f172a;color:#fff;">
          <th style="padding:8px;text-align:left;">Product</th>
          <th style="padding:8px;">Qty</th>
          <th style="padding:8px;text-align:right;">Amount</th>
        </tr></thead>
        <tbody>${itemRows}</tbody>
        <tfoot><tr><td colspan="2" style="padding:8px;font-weight:bold;">Total</td>
          <td style="padding:8px;text-align:right;font-weight:bold;">₹${total.toLocaleString('en-IN')}</td></tr></tfoot>
      </table>
      <p><strong>Customer:</strong> ${customer.name}<br>
         <strong>Email:</strong> ${customer.email}<br>
         <strong>Phone:</strong> ${customer.phone}<br>
         <strong>Address:</strong> ${customer.address}, ${customer.city}, ${customer.state} - ${customer.pincode}</p>
      <p style="color:#64748b;font-size:12px;">Warepro | F-020, FF GNS Plaza, Site 4 Kasna, Greater Noida, UP 201310 | +91 8826623286</p>
    </div>`;
}

async function sendOrderEmails({ transactionId, orderId, customer, items, total }) {
  const adminEmail = process.env.ADMIN_EMAIL;
  const buyerHtml = buildOrderHtml({ transactionId, orderId, customer, items, total, isAdmin: false });
  const adminHtml = buildOrderHtml({ transactionId, orderId, customer, items, total, isAdmin: true });

  await sendViaResend({
    to: customer.email,
    subject: `Warepro Order Confirmed — ${transactionId}`,
    html: buyerHtml,
  });

  if (adminEmail) {
    await sendViaResend({
      to: adminEmail,
      subject: `[Warepro] New Order — ${transactionId}`,
      html: adminHtml,
    });
  }
}

async function sendContactEmail({ name, email, phone, message }) {
  const adminEmail = process.env.ADMIN_EMAIL;
  if (!adminEmail) {
    console.log(`[CONTACT SKIPPED] From: ${name} <${email}>: ${message}`);
    return;
  }

  await sendViaResend({
    to: adminEmail,
    subject: `[Warepro Contact] Message from ${name}`,
    html: `<p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Phone:</strong> ${phone || 'N/A'}</p><p><strong>Message:</strong></p><p>${message}</p>`,
  });
}

module.exports = { sendOrderEmails, sendContactEmail };
