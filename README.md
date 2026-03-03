# 🐾 PetNest — Premium Pet Essentials Ecommerce

A modern, full-stack ecommerce platform for pet supplies, built with Next.js 16, Supabase, and TailwindCSS. Designed for the Indian market with ₹ pricing, GST calculations, and a premium shopping experience.

---

## ✨ Features

- **Full Shopping Flow** — Browse → Product Detail → Add to Cart → Checkout → Order Confirmation
- **Authentication** — Email/password sign up & sign in via Supabase Auth (required for checkout)
- **Pet Type Filtering** — Browse products by Dog, Cat, Bird, Fish, or Small Pets
- **Search & Price Range Filter** — Real-time client-side filtering with a sidebar UI
- **Indian Currency** — All prices in ₹ with `en-IN` locale formatting and 18% GST
- **Image Lightbox** — Click-to-zoom product images with keyboard & click-outside dismiss
- **Order Confirmation** — Fetches product names & images via Supabase join, not raw UUIDs
- **Wishlist & Share** — Client-side wishlist toggle and Web Share API on product detail
- **Loading Skeletons** — Route-level `loading.tsx` for zero blank screens
- **Error Boundaries** — `error.tsx` and `global-error.tsx` for graceful failure handling
- **SEO Metadata** — Dynamic `generateMetadata()` per product with OpenGraph support
- **Favicon** — Custom SVG leaf icon via Next.js App Router file convention

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router, Turbopack) |
| Styling | TailwindCSS v4 + Radix UI |
| Backend | Supabase (PostgreSQL + Auth) |
| Icons | Lucide React |
| Fonts | Geist (sans) + Geist Mono |
| Deployment | Netlify (with `@netlify/plugin-nextjs`) |

---

## 📁 Project Structure

```
app/
  page.tsx                    # Homepage: hero, categories, featured products
  layout.tsx                  # Root layout: Providers, Header, Footer
  global-error.tsx            # Global error boundary
  products/
    page.tsx                  # Server Component: all products + filters
    loading.tsx               # Products page skeleton
    [id]/
      page.tsx                # Server Component: product detail + generateMetadata
      loading.tsx             # Product detail skeleton
      error.tsx               # Product detail error boundary
  cart/page.tsx               # Cart (local state via CartContext)
  checkout/page.tsx           # Checkout with Supabase order creation
  login/page.tsx              # Auth: sign in / sign up
  order-confirmation/[id]/    # Order confirmed view

components/
  header.tsx                  # Sticky nav with auth-aware user menu
  footer.tsx                  # Footer with pet-type filter links
  product-card.tsx            # Card with optimistic add-to-cart
  ecommerce/
    products-grid.tsx         # Client-side filtering & search grid
    product-detail-client.tsx # Interactive product detail (cart, wishlist, qty)
  ui/
    image-lightbox.tsx        # Click-to-zoom image modal

lib/
  context/
    auth-context.tsx          # Supabase session state (global)
    cart-context.tsx          # localStorage-persisted cart state
  queries/
    products.ts               # Server-safe Supabase product fetches
    orders.ts                 # createOrder with try/catch error handling
  supabase/
    client.ts                 # Browser Supabase client + Database types
    server.ts                 # Server-side Supabase client
  utils/
    currency.ts               # formatINR: en-IN Intl.NumberFormat
```

---

## ⚙️ Environment Variables

Create a `.env.local` file in the project root:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

> **Never commit `.env.local` to version control.** Both variables are prefixed with `NEXT_PUBLIC_` since they're used in both server and client components for simplicity. They only expose the public anon key (not the service role key).

---

## 🗄️ Supabase Setup

### 1. Create Tables

Run in the **Supabase SQL Editor**:

```sql
-- Products Table
CREATE TABLE products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  price NUMERIC NOT NULL,
  image_url TEXT,
  category TEXT,
  pet_type TEXT,
  stock INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Orders Table
CREATE TABLE orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  email TEXT NOT NULL,
  total NUMERIC NOT NULL,
  status TEXT DEFAULT 'confirmed',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Order Items Table
CREATE TABLE order_items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id),
  quantity INTEGER NOT NULL,
  price NUMERIC NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);
```

### 2. Enable Row Level Security (RLS)

```sql
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;

-- Allow public reads on products
CREATE POLICY "Public can read products" ON products FOR SELECT USING (true);

-- Allow public insert on orders (authenticated via app logic)
CREATE POLICY "Public can create orders" ON orders FOR INSERT WITH CHECK (true);
CREATE POLICY "Public can create order items" ON order_items FOR INSERT WITH CHECK (true);
```

### 3. Seed Product Data

Run `scripts/02-seed-products.sql` in the Supabase SQL Editor to insert the 20 sample products with images.

---

## 🚀 Local Development

```bash
# Install dependencies
npm install

# Start dev server (Turbopack)
npm run dev

# Open browser
open http://localhost:3000
```

---

## 🏗️ Production Build

```bash
npm run build
npm run start
```

The build must exit with code 0. TypeScript errors are **not suppressed** — all type errors must be resolved.

---

## ☁️ Deploy to Netlify

### Option A — Netlify CLI

```bash
npm install -g netlify-cli
netlify login
netlify deploy --prod
```

### Option B — Git Integration

1. Push this repo to GitHub
2. Create a new Netlify site from your GitHub repo
3. Set **Build command**: `npm run build`
4. Set **Publish directory**: `.next`
5. Add the environment variables in Netlify → Site Settings → Environment Variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
6. Install the Netlify Next.js plugin (`@netlify/plugin-nextjs`) — this is auto-detected via `netlify.toml`

---

## 🔧 Performance Notes

- **Server Components** — Homepage featured products and product detail pages are fetched server-side with zero client-side waterfalls
- **Image Optimization** — All images use Next.js `<Image>` with `sizes` props for responsive loading
- **Turbopack** — Development server uses Turbopack for sub-second HMR
- **optimizePackageImports** — Lucide React is tree-shaken at build time
- **Cart Persistence** — Cart state persisted to `localStorage` with no server round-trips

---

## 📦 Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start dev server with Turbopack |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |

---

*Built with ❤️ for pet lovers across India By Anurag*
