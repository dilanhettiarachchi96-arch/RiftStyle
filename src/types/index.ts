export type Category = "men" | "women" | "kids";

export type Product = {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  category: Category;
  tags: string[];
  image: string;
  badge?: "New" | "Sale" | "Trending";
  sizes: string[];
  colors: string[];
  description: string;
};

export type CategoryInfo = {
  id: Category;
  label: string;
  image: string;
  description: string;
};
