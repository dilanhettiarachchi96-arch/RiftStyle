# Clothing Website — Claude Code Prompt

## 🛠 Pre-Build Setup (Run First)

Before writing any code, run the following in the project folder:

```bash
# Update Node & npm
node -v && npm -v

# Initialize Next.js 15 project (if not already)
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"

# Install & update all core dependencies
npm install
npm update

# Install UI & animation libraries
npm install framer-motion lucide-react clsx tailwind-merge
npm install @radix-ui/react-dialog @radix-ui/react-dropdown-menu @radix-ui/react-select
npm install embla-carousel-react embla-carousel-autoplay

# Install shadcn/ui
npx shadcn@latest init
npx shadcn@latest add button badge card carousel dialog sheet select separator skeleton

# Verify everything is up to date
npm outdated
npm audit fix
```

---

## 🎯 Project Brief

Build a **premium Sri Lankan clothing e-commerce website** with the following:

- **Brand name:** `[YOUR BRAND NAME]` (replace with your actual brand)
- **Tagline:** "Dress the Way You Feel"
- **Product categories:** Kids, Men's, Women's
- **Design reference:** https://coolplanet.lk — clean, modern, image-forward fashion retail layout
- **Stack:** Next.js 15 (App Router), TypeScript, Tailwind CSS v4, shadcn/ui, Framer Motion

---

## 🎨 Visual Design Direction

- **Color palette:**
  - Background: `#FAFAF8` (warm off-white)
  - Primary text: `#1A1A1A`
  - Accent: `#C8A96E` (warm gold)
  - Secondary: `#6B7280` (cool gray)
  - Dark hero: `#111111`
- **Typography:**
  - Display: `Playfair Display` (serif, used only for hero headlines)
  - Body/UI: `Inter` (clean, modern sans-serif)
- **Aesthetic:** Elegant minimalism — lots of white space, large imagery, subtle gold accents. Similar to coolplanet.lk.

Add Google Fonts import in `layout.tsx`:
```html
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet" />
```

---

## 📁 File Structure to Create

```
src/
├── app/
│   ├── layout.tsx
│   ├── page.tsx                    ← Homepage
│   ├── shop/
│   │   └── page.tsx                ← All products
│   ├── category/
│   │   ├── men/page.tsx
│   │   ├── women/page.tsx
│   │   └── kids/page.tsx
│   └── product/
│       └── [id]/page.tsx           ← Product detail
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   └── Footer.tsx
│   ├── home/
│   │   ├── HeroBanner.tsx
│   │   ├── CategoryGrid.tsx
│   │   ├── NewArrivals.tsx
│   │   ├── PromoStrip.tsx
│   │   └── FeaturedCollection.tsx
│   ├── shop/
│   │   ├── ProductCard.tsx
│   │   ├── ProductGrid.tsx
│   │   └── FilterSidebar.tsx
│   └── ui/                         ← shadcn components auto-generated here
├── lib/
│   └── mock-data.ts                ← All mock products, categories
└── types/
    └── index.ts                    ← Product, Category TypeScript types
```

---

## 📦 Mock Data (`src/lib/mock-data.ts`)

Create comprehensive mock data with **at least 24 products** across 3 categories:

```typescript
export type Product = {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  category: "men" | "women" | "kids";
  tags: string[];
  image: string;       // Use https://picsum.photos/seed/{id}/600/800
  badge?: "New" | "Sale" | "Trending";
  sizes: string[];
  colors: string[];
  description: string;
};

// Women's products (8 items) — blouses, dresses, kurtis, sarees
// Men's products (8 items) — shirts, trousers, t-shirts, formal wear
// Kids' products (8 items) — frocks, boys sets, casual wear
```

Use `https://picsum.photos/seed/product-{id}/600/800` for all product images.
Use `https://picsum.photos/seed/banner-{n}/1400/600` for hero/banner images.

---

## 🏠 Homepage (`src/app/page.tsx`)

Build these sections in order:

### 1. Promo Strip (top of page, above navbar)
- Thin announcement bar: "Free delivery on orders over Rs. 3,000 | Use code WELCOME10 for 10% off"
- Gold background (`#C8A96E`), white text, small font

### 2. Navbar (`Navbar.tsx`)
- Logo (left) + Nav links (center) + Icons (right: Search, Wishlist, Cart)
- Nav links: Home | Women | Men | Kids | Sale | New Arrivals
- Sticky on scroll, transparent → white background transition
- Mobile: hamburger menu using Sheet from shadcn

### 3. Hero Banner (`HeroBanner.tsx`)
- Full-width carousel (autoplay, 5s interval) using Embla Carousel
- 3 slides:
  1. "NEW ARRIVALS YOU NEED" — Women's collection — CTA: "Shop Women"
  2. "STYLE MEETS COMFORT" — Men's collection — CTA: "Shop Men"
  3. "DRESS THEM IN JOY" — Kids' collection — CTA: "Shop Kids"
- Each slide: large background image, centered text overlay with dark scrim
- Playfair Display font for headline, gold accent on tagline
- Dot navigation at bottom

### 4. Category Grid (`CategoryGrid.tsx`)
- 3 equal cards: Women | Men | Kids
- Each: full image, category name overlay at bottom, hover zoom effect
- Framer Motion: fade-in-up on scroll

### 5. New Arrivals (`NewArrivals.tsx`)
- Section title: "Just In — New Arrivals"
- Horizontal scrollable product row on mobile, 4-column grid on desktop
- Show 8 newest products with badges
- "View All" link

### 6. Featured Collection Banner
- Full-width promotional banner image
- Text: "THE ANDRIANA COLLECTION — Effortless Elegance, Every Day"
- Gold outlined CTA button

### 7. Best Sellers Grid
- 4-column product grid, 8 products
- Filter tabs: All | Women | Men | Kids (client-side filter, no page reload)
- Framer Motion layout animation on filter change

### 8. Footer (`Footer.tsx`)
- 4 columns: Brand info | Quick Links | Categories | Contact
- Social icons (Instagram, Facebook, WhatsApp)
- Copyright line
- Dark background `#111111`, light text

---

## 🛍 Product Card (`ProductCard.tsx`)

Each product card must include:
- Product image with **hover zoom** (CSS transform scale)
- On image hover: show "Quick View" overlay button (center)
- Badge top-left: New / Sale / Trending
- Product name, category tag
- Price (show original + sale price if discounted, red strikethrough)
- Size dots (S, M, L, XL) — small indicators
- "Add to Wishlist" heart icon (top right, toggle)
- Framer Motion: scale-up on hover

---

## 🔍 Category/Shop Pages

- `/category/women`, `/category/men`, `/category/kids`
- Left sidebar: filter by Size, Color, Price Range, Sort
- Right: product grid (3 cols desktop, 2 cols mobile, 1 col small)
- Product count shown: "Showing 12 of 24 products"
- "Load More" button (show 12 at a time from mock data)
- URL search params for filters (use `useSearchParams`)

---

## 📱 Responsive Breakpoints

- Mobile: `< 640px` — 1 column grid, hamburger nav, stacked sections
- Tablet: `640px–1024px` — 2 column grid
- Desktop: `> 1024px` — 3–4 column grid, full navbar

---

## ✨ Animations (Framer Motion)

Apply these throughout:
```typescript
// Fade up on scroll — use for section reveals
const fadeUpVariant = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

// Stagger children — use for product grids
const containerVariant = {
  visible: { transition: { staggerChildren: 0.1 } }
};
```

Use `useInView` from framer-motion for scroll-triggered animations.

---

## 🚫 Do NOT include
- No authentication / login
- No real payment integration
- No database connection
- No admin panel
- Keep it purely frontend with mock data

---

## ✅ Final Checklist Before Finishing

- [ ] All pages render without TypeScript errors
- [ ] `npm run build` completes successfully
- [ ] Mobile responsive (test at 375px width)
- [ ] All mock products display correctly
- [ ] Category filter tabs work on homepage
- [ ] Carousel autoplays
- [ ] Navbar sticky scroll works
- [ ] Footer has all links
- [ ] No broken images (all using picsum.photos)
- [ ] Framer Motion animations trigger on scroll

Run `npm run build` at the end and fix any errors before considering the task complete.
