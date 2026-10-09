# SoleMate — Sneaker Storefront

SoleMate is a responsive, front-end e-commerce demo for browsing and ordering sneakers. It is built with HTML, CSS, and vanilla JavaScript, with no build step or package installation required.

## Features

- Browse a sneaker catalog with category filters, search, and sorting
- Add products to a cart and adjust quantities
- Save products to a wishlist
- Switch between light and dark themes
- Complete a checkout form with delivery details
- Choose Cash on Delivery (COD) or the demo online payment option
- Save demo cart, wishlist, user, and order data in browser `localStorage`

## Run locally

1. Clone or download this repository.
2. Open `updated_index.html` in a modern web browser.

For a local development server, open the project in VS Code and use an extension such as **Live Server**, or run any static HTTP server from this directory. No build command is needed.

## Checkout and payments

Choose **Proceed to Checkout** from the cart, enter delivery information, and select a payment method. COD creates a demo order, shows an order confirmation and ID, and clears the cart. Demo order details are stored in the current browser only.

The online payment option is a UI demo and does not process or charge payments. To accept real card, UPI, or wallet payments, integrate a payment provider (for example, Razorpay or Stripe) through a secure backend. Never store payment credentials or handle secret keys in front-end code.

## Project files

| File | Purpose |
| --- | --- |
| `updated_index.html` | Storefront markup and checkout dialog |
| `style.css` | Storefront styles and responsive layout |
| `scripts.js` | Product browsing, cart, wishlist, login demo, and checkout behavior |

## Notes

- Product images are loaded from Unsplash, so an internet connection is needed to display them.
- Browser `localStorage` is for demonstration. It is not a production order database and does not sync between devices.
- The login form is also a front-end demo and does not provide real authentication.

## License

No license has been specified. Add a `LICENSE` file before redistributing this project if you want to grant others permission to use it.

