import { Product, CategoryInfo } from "@/types";

export const products: Product[] = [
  // Women's Products (8 items)
  {
    id: "w001",
    name: "Floral Wrap Blouse",
    price: 2850,
    originalPrice: 3500,
    category: "women",
    tags: ["blouse", "floral", "casual"],
    image: "https://picsum.photos/seed/product-w001/600/800",
    badge: "Sale",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["White", "Pink", "Blue"],
    description:
      "A beautiful floral wrap blouse perfect for casual outings or office wear. Made from breathable cotton blend fabric.",
  },
  {
    id: "w002",
    name: "Silk Drape Saree",
    price: 8500,
    category: "women",
    tags: ["saree", "silk", "traditional"],
    image: "https://picsum.photos/seed/product-w002/600/800",
    badge: "New",
    sizes: ["Free Size"],
    colors: ["Gold", "Red", "Green"],
    description:
      "An exquisite silk drape saree with intricate border work, perfect for weddings and formal occasions.",
  },
  {
    id: "w003",
    name: "Embroidered Kurti Set",
    price: 3200,
    category: "women",
    tags: ["kurti", "embroidered", "ethnic"],
    image: "https://picsum.photos/seed/product-w003/600/800",
    badge: "Trending",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Teal", "Maroon", "Navy"],
    description:
      "A stunning embroidered kurti set with delicate thread work. Comes with matching pants and dupatta.",
  },
  {
    id: "w004",
    name: "Maxi Sundress",
    price: 4200,
    originalPrice: 5000,
    category: "women",
    tags: ["dress", "maxi", "summer"],
    image: "https://picsum.photos/seed/product-w004/600/800",
    badge: "Sale",
    sizes: ["XS", "S", "M", "L"],
    colors: ["Yellow", "White", "Coral"],
    description:
      "A flowy maxi sundress perfect for beach outings and summer days. Features adjustable straps and a flattering silhouette.",
  },
  {
    id: "w005",
    name: "Batik Print Midi Dress",
    price: 3800,
    category: "women",
    tags: ["dress", "batik", "ethnic"],
    image: "https://picsum.photos/seed/product-w005/600/800",
    badge: "New",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Blue", "Brown", "Black"],
    description:
      "A gorgeous batik print midi dress showcasing traditional Sri Lankan artistry with a modern cut.",
  },
  {
    id: "w006",
    name: "Cotton Palazzo Set",
    price: 2600,
    category: "women",
    tags: ["palazzo", "cotton", "casual"],
    image: "https://picsum.photos/seed/product-w006/600/800",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["White", "Pink", "Lavender"],
    description:
      "Comfortable cotton palazzo set ideal for everyday wear. Lightweight and breathable for Sri Lankan weather.",
  },
  {
    id: "w007",
    name: "Lace Trim Blouse",
    price: 1950,
    originalPrice: 2500,
    category: "women",
    tags: ["blouse", "lace", "elegant"],
    image: "https://picsum.photos/seed/product-w007/600/800",
    badge: "Sale",
    sizes: ["XS", "S", "M", "L"],
    colors: ["Ivory", "Black", "Blush"],
    description:
      "An elegant lace trim blouse that pairs beautifully with trousers or skirts for a chic look.",
  },
  {
    id: "w008",
    name: "Designer Salwar Kameez",
    price: 5500,
    category: "women",
    tags: ["salwar", "designer", "party"],
    image: "https://picsum.photos/seed/product-w008/600/800",
    badge: "New",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Royal Blue", "Emerald", "Burgundy"],
    description:
      "A designer salwar kameez with intricate beadwork and zari embroidery, perfect for festive occasions.",
  },

  // Men's Products (8 items)
  {
    id: "m001",
    name: "Slim Fit Formal Shirt",
    price: 2200,
    category: "men",
    tags: ["shirt", "formal", "slim-fit"],
    image: "https://picsum.photos/seed/product-m001/600/800",
    badge: "New",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["White", "Light Blue", "Striped"],
    description:
      "A crisp slim-fit formal shirt crafted from premium cotton blend. Perfect for office and formal events.",
  },
  {
    id: "m002",
    name: "Classic Chinos",
    price: 3500,
    originalPrice: 4200,
    category: "men",
    tags: ["trousers", "chinos", "casual"],
    image: "https://picsum.photos/seed/product-m002/600/800",
    badge: "Sale",
    sizes: ["28", "30", "32", "34", "36"],
    colors: ["Beige", "Navy", "Olive"],
    description:
      "Classic chino trousers with a comfortable fit. Versatile enough for both casual and smart-casual occasions.",
  },
  {
    id: "m003",
    name: "Graphic Print T-Shirt",
    price: 1500,
    category: "men",
    tags: ["t-shirt", "graphic", "casual"],
    image: "https://picsum.photos/seed/product-m003/600/800",
    badge: "Trending",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Black", "White", "Grey"],
    description:
      "A stylish graphic print t-shirt made from 100% combed cotton. Comfortable and fashionable for everyday wear.",
  },
  {
    id: "m004",
    name: "Linen Casual Shirt",
    price: 2800,
    category: "men",
    tags: ["shirt", "linen", "summer"],
    image: "https://picsum.photos/seed/product-m004/600/800",
    badge: "New",
    sizes: ["S", "M", "L", "XL"],
    colors: ["White", "Sky Blue", "Mint"],
    description:
      "A breathable linen casual shirt ideal for the tropical Sri Lankan climate. Perfect for beach outings and casual gatherings.",
  },
  {
    id: "m005",
    name: "Formal Suit Trousers",
    price: 4500,
    originalPrice: 5500,
    category: "men",
    tags: ["trousers", "formal", "suit"],
    image: "https://picsum.photos/seed/product-m005/600/800",
    badge: "Sale",
    sizes: ["28", "30", "32", "34", "36", "38"],
    colors: ["Charcoal", "Navy", "Black"],
    description:
      "Premium formal suit trousers with a tailored fit. Made from wrinkle-resistant fabric for a sharp, professional look.",
  },
  {
    id: "m006",
    name: "Batik Casual Shirt",
    price: 2400,
    category: "men",
    tags: ["shirt", "batik", "ethnic"],
    image: "https://picsum.photos/seed/product-m006/600/800",
    badge: "Trending",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Blue", "Brown", "Black"],
    description:
      "A vibrant batik print casual shirt celebrating Sri Lankan heritage. Perfect for cultural events and casual wear.",
  },
  {
    id: "m007",
    name: "Polo Shirt",
    price: 1800,
    category: "men",
    tags: ["polo", "casual", "sport"],
    image: "https://picsum.photos/seed/product-m007/600/800",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Navy", "White", "Red", "Green"],
    description:
      "A classic polo shirt in premium pique cotton. Versatile for both casual outings and smart-casual settings.",
  },
  {
    id: "m008",
    name: "Denim Jeans",
    price: 3900,
    originalPrice: 4800,
    category: "men",
    tags: ["jeans", "denim", "casual"],
    image: "https://picsum.photos/seed/product-m008/600/800",
    badge: "Sale",
    sizes: ["28", "30", "32", "34", "36"],
    colors: ["Indigo", "Black", "Light Blue"],
    description:
      "Classic fit denim jeans with stretch fabric for comfort. Durable and stylish for everyday wear.",
  },

  // Kids' Products (8 items)
  {
    id: "k001",
    name: "Floral Party Frock",
    price: 1800,
    category: "kids",
    tags: ["frock", "party", "girls"],
    image: "https://picsum.photos/seed/product-k001/600/800",
    badge: "New",
    sizes: ["2Y", "4Y", "6Y", "8Y", "10Y"],
    colors: ["Pink", "Yellow", "Blue"],
    description:
      "An adorable floral party frock for little girls. Features a full skirt with tulle underlining for extra puff.",
  },
  {
    id: "k002",
    name: "Boys Casual Set",
    price: 1600,
    originalPrice: 2000,
    category: "kids",
    tags: ["set", "boys", "casual"],
    image: "https://picsum.photos/seed/product-k002/600/800",
    badge: "Sale",
    sizes: ["2Y", "4Y", "6Y", "8Y", "10Y"],
    colors: ["Blue", "Grey", "Green"],
    description:
      "A comfortable casual set for boys including a printed t-shirt and matching shorts. Perfect for playtime.",
  },
  {
    id: "k003",
    name: "Traditional Pavadai Sattai",
    price: 2200,
    category: "kids",
    tags: ["traditional", "girls", "ethnic"],
    image: "https://picsum.photos/seed/product-k003/600/800",
    badge: "Trending",
    sizes: ["2Y", "4Y", "6Y", "8Y"],
    colors: ["Red", "Green", "Purple"],
    description:
      "A beautiful traditional Pavadai Sattai for girls. Perfect for cultural events and temple visits.",
  },
  {
    id: "k004",
    name: "Denim Dungaree",
    price: 1900,
    category: "kids",
    tags: ["dungaree", "denim", "casual"],
    image: "https://picsum.photos/seed/product-k004/600/800",
    badge: "New",
    sizes: ["2Y", "4Y", "6Y", "8Y", "10Y", "12Y"],
    colors: ["Indigo", "Light Blue"],
    description:
      "Cute and durable denim dungaree for kids. Adjustable straps and multiple pockets for playful adventures.",
  },
  {
    id: "k005",
    name: "Cotton Summer Dress",
    price: 1400,
    originalPrice: 1800,
    category: "kids",
    tags: ["dress", "summer", "girls"],
    image: "https://picsum.photos/seed/product-k005/600/800",
    badge: "Sale",
    sizes: ["2Y", "4Y", "6Y", "8Y"],
    colors: ["White", "Yellow", "Mint"],
    description:
      "A light and breezy cotton summer dress for little girls. Ideal for hot days and outdoor play.",
  },
  {
    id: "k006",
    name: "Boys Formal Shirt & Pants",
    price: 2400,
    category: "kids",
    tags: ["formal", "boys", "set"],
    image: "https://picsum.photos/seed/product-k006/600/800",
    badge: "New",
    sizes: ["4Y", "6Y", "8Y", "10Y", "12Y"],
    colors: ["White/Black", "Blue/Grey"],
    description:
      "A smart formal set for boys including a crisp white shirt and matching pants. Perfect for school events and family occasions.",
  },
  {
    id: "k007",
    name: "Printed Tracksuit",
    price: 2100,
    category: "kids",
    tags: ["tracksuit", "casual", "sport"],
    image: "https://picsum.photos/seed/product-k007/600/800",
    badge: "Trending",
    sizes: ["4Y", "6Y", "8Y", "10Y", "12Y"],
    colors: ["Blue", "Red", "Green"],
    description:
      "A comfortable printed tracksuit perfect for sports and outdoor activities. Made from soft, durable fabric.",
  },
  {
    id: "k008",
    name: "Embroidered Kurti for Girls",
    price: 1750,
    originalPrice: 2200,
    category: "kids",
    tags: ["kurti", "ethnic", "girls"],
    image: "https://picsum.photos/seed/product-k008/600/800",
    badge: "Sale",
    sizes: ["4Y", "6Y", "8Y", "10Y", "12Y"],
    colors: ["Pink", "Blue", "Yellow"],
    description:
      "A charming embroidered kurti for little girls. Features colorful thread work and comfortable fabric.",
  },
];

export const categories: CategoryInfo[] = [
  {
    id: "women",
    label: "Women",
    image: "https://picsum.photos/seed/cat-women/600/800",
    description: "Elegant styles for every occasion",
  },
  {
    id: "men",
    label: "Men",
    image: "https://picsum.photos/seed/cat-men/600/800",
    description: "Modern fits for the modern man",
  },
  {
    id: "kids",
    label: "Kids",
    image: "https://picsum.photos/seed/cat-kids/600/800",
    description: "Playful styles for little ones",
  },
];

export const getProductsByCategory = (category: string) =>
  products.filter((p) => p.category === category);

export const getNewArrivals = (count = 8) =>
  products.filter((p) => p.badge === "New").slice(0, count);

export const getBestSellers = (count = 8) => products.slice(0, count);

export const getProductById = (id: string) =>
  products.find((p) => p.id === id);
