# WAS Shop — React + Tailwind storefront (frontend only)

Theme: **Forest Green `#123D2B` · Gold `#D9A52E` · White `#FFFFFF`**
Built from the "E-commerce Website Template" design, then extended.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build
```

## Pages
| Route | What it is |
|---|---|
| `/` | Home: hero, brands, features, new arrivals, categories, deal-of-the-week countdown, top selling, dress styles, testimonials, membership banner, FAQ |
| `/shop` | Catalogue with filters, sort, pagination, search (`?style= &type= &q= &sale=1 &new=1 &sort= &page=`) |
| `/product/:id` | Gallery, options, wishlist, reviews (+ write a review), FAQs, related items |
| `/cart` · `/checkout` | Cart with promo code `SHOP20`, checkout that saves the order |
| `/wishlist` | Saved products |
| `/login` | Sign in / create account |
| `/account` · `/account/orders` · `/addresses` · `/settings` | Profile area: overview, order tracking, address book, personal details, notifications, password, delete account |
| `/about` · `/contact` | About, contact form, delivery & returns, FAQ, policies |

## Structure
```
src/
  components/
    layout/    Navbar, Footer, Newsletter, TopBanner, Layout, Logo
    ui/        Rating, PriceTag, Field, Toggle, Accordion, Breadcrumb, …
    product/   ProductCard, FilterPanel, ReviewsPanel, Pagination, …
    home/      Hero, FeatureStrip, CategoryGrid, DealOfTheWeek, …
    account/   OverviewTab, OrdersTab, AddressesTab, SettingsTab
  context/     Auth, Cart, Wishlist, Orders (all persisted in localStorage)
  data/        products.js, reviews.js
  hooks/       useCountdown
  lib/         storage.js
  pages/       one file per route
```

## Theme
Colours live in `tailwind.config.js`. `black` is mapped to Forest Green, so `text-black`, `bg-black`
and `border-black/10` all follow the theme; use `gold`, `gold-light`, `gold-dark`, `forest-*` for accents.

## Demo-only parts (replace with a real backend)
- **Auth** (`context/AuthContext.jsx`): accounts are stored in the browser; passwords are hashed with
  SHA-256 but this is *not* real security.
- **Orders, wishlist, cart** are saved in localStorage. Checkout takes no payment.
- Contact form and newsletter don't send anywhere. Policy text on `/contact` is sample copy.
- Fonts: Integral CF + Satoshi are the design fonts; Archivo + DM Sans (Google Fonts) are used as free stand-ins.
- Product photos are cropped from the design renders (~300px wide) — swap in full-size images in `public/images`.

## Using your own photos
All images are local files in `public/images` — nothing is fetched from an API or the internet while the site runs.
To swap in new photos: put files there directly (same filenames), **or** paste direct image URLs into
`images.manifest.json` and run `npm run images` once; the files are downloaded into `public/images`.
Only use images you are licensed to use (e.g. Unsplash / Pexels licence terms, or your own photography).
