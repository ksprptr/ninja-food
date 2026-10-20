import { DietTag, PortionUnit } from '../enums/dish.enums';

export interface Dish {
  slug: string;
  name: string;
  cuisine: string;
  category: string;
  portion: DishPortion;
  energyKcal: number;
  nutrition: DishNutrition;
  spiciness: number;
  priceCzk: number;
  diets: DietTag[];
  allergens: number[];
  tagline: string;
  description: string;
  highlights: string[];
  featured: boolean;
  image: DishImage;
}

export interface DishPortion {
  amount: number;
  unit: PortionUnit;
}

export interface DishNutrition {
  proteinG: number;
  carbsG: number;
  fatG: number;
}

export interface DishImage {
  src: string;
  alt: string;
}

export interface CatalogFilters {
  search: string;
  cuisines: string[];
  categories: string[];
  diets: DietTag[];
  priceCzkMax: number;
  energyKcalMax: number;
}

export interface CatalogRange {
  min: number;
  max: number;
}
