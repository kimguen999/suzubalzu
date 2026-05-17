

export interface Product {
  id: number;
  code: string;
  name: string;
  category: string;
  aliases: string[]; // 고객사별 은어
  unit: string;
}

export interface Customer {
  id: string;
  name: string;
  favoriteProductIds: number[];
}

export const products: Product[] = [
  { id: 1, code: 'NY-90', name: '90나일론', category: '나일론', aliases: ['나구', '나일구', '90나'], unit: 'mm' },
  { id: 2, code: 'NY-80', name: '80나일론', category: '나일론', aliases: ['팔공', '나일팔', '80나'], unit: 'mm' },
  { id: 3, code: 'PP-100', name: '100PP', category: 'PP', aliases: ['피피백', 'pp백', '백PP'], unit: 'mm' },
  { id: 4, code: 'PET-75', name: '75PET', category: 'PET', aliases: ['칠오펫', 'pet75', '투명펫'], unit: 'mm' },
  { id: 5, code: 'NY-70', name: '70나일론', category: '나일론', aliases: ['칠공나', '70나'], unit: 'mm' },
  { id: 6, code: 'OPP-40', name: '40OPP', category: 'OPP', aliases: ['오피피', '사공', '40opp'], unit: 'mm' },
  { id: 7, code: 'NY-60', name: '60나일론', category: '나일론', aliases: ['육공나', '60나', '나일육'], unit: 'mm' },
  { id: 8, code: 'PP-80', name: '80PP', category: 'PP', aliases: ['팔공피피', '80pp', 'pp팔공'], unit: 'mm' },
  { id: 9, code: 'PET-50', name: '50PET', category: 'PET', aliases: ['오공펫', 'pet50', '반투명펫'], unit: 'mm' },
  { id: 10, code: 'OPP-50', name: '50OPP', category: 'OPP', aliases: ['오공오피피', '50opp', '오피피오'], unit: 'mm' },
  { id: 11, code: 'NY-120', name: '120나일론', category: '나일론', aliases: ['일이공나', '120나', '두꺼운나일론'], unit: 'mm' },
  { id: 12, code: 'PP-60', name: '60PP', category: 'PP', aliases: ['육공피피', '60pp', '얇은피피'], unit: 'mm' },
  { id: 13, code: 'PET-100', name: '100PET', category: 'PET', aliases: ['백펫', 'pet100', '두꺼운펫'], unit: 'mm' },
  { id: 14, code: 'OPP-30', name: '30OPP', category: 'OPP', aliases: ['삼공오피피', '30opp', '얇은오피피'], unit: 'mm' },
  { id: 15, code: 'CPP-50', name: '50CPP', category: 'CPP', aliases: ['씨피피', '오공씨피피', 'cpp50'], unit: 'mm' },
  { id: 16, code: 'CPP-70', name: '70CPP', category: 'CPP', aliases: ['칠공씨피피', '70cpp', '씨피피칠'], unit: 'mm' },
];

export const customers: Customer[] = [
  { id: '222091', name: 'A인쇄소', favoriteProductIds: [2, 3] },
  { id: '222092', name: 'B인쇄소', favoriteProductIds: [1, 4, 5] },
  { id: '222093', name: 'C인쇄소', favoriteProductIds: [2, 3, 6] },
  { id: '222094', name: 'D인쇄소', favoriteProductIds: [7, 8, 9, 10] },
  { id: '222095', name: 'E인쇄소', favoriteProductIds: [11, 12, 13] },
];