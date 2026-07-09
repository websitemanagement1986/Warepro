# Warepro — Software Marketplace

Discover, compare, and buy software online in India. Guest checkout with Razorpay payments (UPI, Cards, Net Banking). No login, no database.

**Live site:** Deploy on [Vercel](https://vercel.com) (required for payment API).

## Features

- Techjockey-style homepage with category-wise product browsing
- Guest checkout (no login)
- Razorpay payment integration (UPI, cards, net banking)
- Order confirmation emails to buyer and admin
- Unique transaction ID after payment
- Legal pages: Terms, Privacy, Refund, Cancellation
- About Us & Contact Us

## Contact

- **Address:** F-020, FF GNS Plaza, Site 4 Kasna, Greater Noida, Gautam Buddha Nagar, UP 201310
- **Phone:** +91 8826623286
- **Email:** support@warepro.in

## Local Development

Static pages can be previewed with any local server:

```bash
cd C:\Repositiries\WarePro
npx serve .
```

> Payment and contact forms require the Vercel API routes. Use `vercel dev` for full local testing.

## Deploy to Vercel

1. Push this repo to GitHub: `https://github.com/websitemanagement1986/Warepro`
2. Sign up at [vercel.com](https://vercel.com) and import the GitHub repo
3. Add environment variables (Settings → Environment Variables):

| Variable | Description |
|----------|-------------|
| `RAZORPAY_KEY_ID` | Razorpay Key ID (public) |
| `RAZORPAY_KEY_SECRET` | Razorpay Key Secret (private) |
| `RESEND_API_KEY` | Resend.com API key for emails |
| `FROM_EMAIL` | Sender email (e.g. orders@warepro.in) |
| `ADMIN_EMAIL` | Your email for order alerts |

4. Deploy — Vercel gives you a live URL

## Razorpay Setup

1. Create account at [razorpay.com](https://razorpay.com)
2. Use **Test mode** keys for development
3. Complete KYC for live payments

## Push to GitHub

```bash
cd C:\Repositiries\WarePro
git init
git add .
git commit -m "Initial Warepro software marketplace website"
git remote add origin https://github.com/websitemanagement1986/Warepro.git
git branch -M main
git push -u origin main
```

## Project Structure

```
Warepro/
├── index.html          # Homepage
├── categories.html     # All categories
├── category.html       # Products by category
├── product.html        # Product detail
├── cart.html           # Shopping cart
├── checkout.html       # Guest checkout + Razorpay
├── success.html        # Order confirmation
├── terms.html          # Terms & Conditions
├── privacy.html        # Privacy Policy
├── refund.html         # Refund Policy
├── cancellation.html   # Cancellation Policy
├── about.html          # About Us
├── contact.html        # Contact Us
├── css/styles.css
├── js/                 # Frontend logic
└── api/                # Vercel serverless (payments + email)
```

## License

Proprietary — Warepro
