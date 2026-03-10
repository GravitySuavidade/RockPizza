export type Size = 'S' | 'M' | 'L' | 'Familiar' | 'Único';
export type Crust = 'Clássica' | 'Fina' | 'Recheada';
export type Sauce = 'Tomate' | 'BBQ' | 'Branco';
export type ToppingScope = 'whole' | 'left' | 'right';
export type ToppingAmount = 'light' | 'normal' | 'extra';

export interface Topping {
  id: string;
  name: string;
  group: 'Carnes' | 'Vegetais' | 'Queijos' | 'Extras' | 'Molhos';
  price: number;
  icon?: string;
  allergens?: string[];
  allowedScopes: ToppingScope[];
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  category: 'Pizzas' | 'Bebidas' | 'Sobremesas';
  tags: ('picante' | 'veg' | 'novo' | 'popular')[];
  basePrices: Partial<Record<Size, number>>;
  imageUrl: string;
  dietaryFlags?: string[];
  availableCrusts?: Crust[];
  availableSauces?: Sauce[];
  defaultToppings?: string[];
  allergens?: string[];
}

export const SIZES: Size[] = ['S', 'M', 'L', 'Familiar'];
export const CRUSTS: Crust[] = ['Clássica', 'Fina', 'Recheada'];
export const SAUCES: Sauce[] = ['Tomate', 'BBQ', 'Branco'];

export const TOPPINGS: Topping[] = [
  { id: 't1', name: 'Pepperoni', group: 'Carnes', price: 1.5, allowedScopes: ['whole', 'left', 'right'] },
  { id: 't2', name: 'Salsicha Picante', group: 'Carnes', price: 1.5, allowedScopes: ['whole', 'left', 'right'] },
  { id: 't3', name: 'Bacon', group: 'Carnes', price: 1.5, allowedScopes: ['whole', 'left', 'right'] },
  { id: 't4', name: 'Cogumelos', group: 'Vegetais', price: 1.0, allowedScopes: ['whole', 'left', 'right'] },
  { id: 't5', name: 'Cebola Roxa', group: 'Vegetais', price: 1.0, allowedScopes: ['whole', 'left', 'right'] },
  { id: 't6', name: 'Jalapeños', group: 'Vegetais', price: 1.0, allowedScopes: ['whole', 'left', 'right'] },
  { id: 't7', name: 'Extra Mozzarella', group: 'Queijos', price: 2.0, allowedScopes: ['whole', 'left', 'right'] },
  { id: 't8', name: 'Queijo Vegan', group: 'Queijos', price: 2.5, allowedScopes: ['whole', 'left', 'right'] },
  { id: 't9', name: 'Fio de Malagueta', group: 'Extras', price: 0.5, allowedScopes: ['whole', 'left', 'right'] },
];

export const MENU_ITEMS: MenuItem[] = [
  {
    id: 'p1',
    name: 'Hellfire Pepperoni',
    description: 'Duplo pepperoni, jalapeños, fio de malagueta e o nosso molho de tomate picante de assinatura.',
    category: 'Pizzas',
    tags: ['picante', 'popular'],
    basePrices: { S: 10, M: 14, L: 18, Familiar: 22 },
    imageUrl: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?q=80&w=800&auto=format&fit=crop',
    availableCrusts: ['Clássica', 'Fina', 'Recheada'],
    availableSauces: ['Tomate', 'BBQ'],
  },
  {
    id: 'p2',
    name: 'The Mosh Pit',
    description: 'Uma mistura caótica de salsicha, bacon, pepperoni, cogumelos e cebola.',
    category: 'Pizzas',
    tags: ['popular'],
    basePrices: { S: 12, M: 16, L: 20, Familiar: 25 },
    imageUrl: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=800&auto=format&fit=crop',
    availableCrusts: ['Clássica', 'Fina', 'Recheada'],
    availableSauces: ['Tomate', 'BBQ', 'Branco'],
  },
  {
    id: 'p3',
    name: 'Green Day',
    description: 'Espinafres frescos, cogumelos, pimentos e queijo vegan numa massa fina.',
    category: 'Pizzas',
    tags: ['veg'],
    basePrices: { S: 11, M: 15, L: 19, Familiar: 23 },
    imageUrl: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?q=80&w=800&auto=format&fit=crop',
    availableCrusts: ['Clássica', 'Fina'],
    availableSauces: ['Tomate', 'Branco'],
  },
  {
    id: 'p4',
    name: 'Black Sabbath BBQ',
    description: 'Frango fumado, cebola roxa, bacon e o nosso molho BBQ escuro.',
    category: 'Pizzas',
    tags: ['novo'],
    basePrices: { S: 12, M: 16, L: 20, Familiar: 25 },
    imageUrl: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=800&auto=format&fit=crop',
    availableCrusts: ['Clássica', 'Fina', 'Recheada'],
    availableSauces: ['BBQ'],
  },
  {
    id: 'p5',
    name: 'The Trooper',
    description: 'Carne de vaca picada, chouriço, pimentos assados e molho de alho.',
    category: 'Pizzas',
    tags: ['popular'],
    basePrices: { S: 11, M: 15, L: 19, Familiar: 24 },
    imageUrl: 'https://images.unsplash.com/photo-1590947132387-155cc02f3212?q=80&w=800&auto=format&fit=crop',
    availableCrusts: ['Clássica', 'Fina', 'Recheada'],
    availableSauces: ['Tomate', 'Branco'],
  },
  {
    id: 'p6',
    name: 'Master of Puppets',
    description: 'Quatro queijos intensos, alho esmagado, orégãos e azeitonas pretas.',
    category: 'Pizzas',
    tags: ['veg', 'novo'],
    basePrices: { S: 10, M: 14, L: 18, Familiar: 22 },
    imageUrl: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=800&auto=format&fit=crop',
    availableCrusts: ['Clássica', 'Fina'],
    availableSauces: ['Tomate', 'Branco'],
  },
  {
    id: 's1',
    name: 'Brownie Dark Matter',
    description: 'Brownie de chocolate negro denso com nozes e uma bola de gelado de baunilha.',
    category: 'Sobremesas',
    tags: ['popular'],
    basePrices: { Único: 6 },
    imageUrl: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 's2',
    name: 'Cheesecake Nirvana',
    description: 'Cheesecake de frutos vermelhos com base de bolacha triturada.',
    category: 'Sobremesas',
    tags: ['novo'],
    basePrices: { Único: 5.5 },
    imageUrl: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 'b1',
    name: 'Água da Montanha (Liquid Death)',
    description: 'Mata a tua sede com água fresca da montanha.',
    category: 'Bebidas',
    tags: [],
    basePrices: { Único: 3 },
    imageUrl: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 'b2',
    name: 'Cerveja Artesanal IPA',
    description: 'IPA amarga e intensa, perfeita para acompanhar a tua pizza.',
    category: 'Bebidas',
    tags: ['popular'],
    basePrices: { Único: 4.5 },
    imageUrl: 'https://images.unsplash.com/photo-1566633806327-68e152aaf26d?q=80&w=800&auto=format&fit=crop',
  }
];
