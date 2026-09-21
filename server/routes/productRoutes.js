import express from 'express';
import Product from '../models/Product.js';

const router = express.Router();

const productsSeed = [
  {
    name: 'Organic Almonds',
    category: 'Nuts',
    price: 349,
    discountPrice: 299,
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=900&q=80',
    images: [
      'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1514996937319-344454492b37?auto=format&fit=crop&w=900&q=80',
    ],
    rating: 4.8,
    reviewCount: 216,
    stock: 42,
    organic: true,
    featured: true,
    bestSeller: true,
    tags: ['almonds', 'nuts', 'organic'],
    ingredients: ['California Almonds'],
    benefits: ['Rich in protein', 'Heart-friendly'],
    nutrition: 'High in healthy fats and magnesium',
    description: 'Premium organic almonds harvested for purity and crunch.',
    shortDescription: 'Premium organic almonds for everyday wellness.'
  },
  {
    name: 'Fresh Organic Apples',
    category: 'Fruits',
    price: 189,
    discountPrice: 149,
    image: 'https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?auto=format&fit=crop&w=900&q=80',
    images: [
      'https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1570913176553-54f84d7f1c8a?auto=format&fit=crop&w=900&q=80',
    ],
    rating: 4.7,
    reviewCount: 184,
    stock: 54,
    organic: true,
    featured: false,
    bestSeller: true,
    tags: ['apples', 'fruits', 'organic'],
    ingredients: ['Fresh apples'],
    benefits: ['Vitamin C rich', 'Naturally sweet'],
    nutrition: 'A good source of fiber and antioxidants',
    description: 'Handpicked apples from trusted growers.',
    shortDescription: 'Crisp and naturally sweet orchard apples.'
  },
  {
    name: 'Green Tea Detox',
    category: 'Tea',
    price: 499,
    discountPrice: 399,
    image: 'https://images.unsplash.com/photo-1515823064-d6e0c04616a7?auto=format&fit=crop&w=900&q=80',
    images: [
      'https://images.unsplash.com/photo-1515823064-d6e0c04616a7?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=900&q=80',
    ],
    rating: 4.9,
    reviewCount: 302,
    stock: 24,
    organic: true,
    featured: true,
    bestSeller: true,
    tags: ['green tea', 'tea', 'detox'],
    ingredients: ['Green tea leaves', 'Lemon balm'],
    benefits: ['Supports metabolism', 'Gentle daily detox'],
    nutrition: 'Naturally rich in antioxidants',
    description: 'A balanced green tea with calming herbal notes.',
    shortDescription: 'A refreshing herbal blend for daily wellness.'
  },
  {
    name: 'Turmeric Powder',
    category: 'Herbs & Spices',
    price: 229,
    discountPrice: 189,
    image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=900&q=80',
    images: [
      'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=900&q=80',
    ],
    rating: 4.6,
    reviewCount: 88,
    stock: 63,
    organic: true,
    featured: false,
    bestSeller: false,
    tags: ['turmeric', 'spices', 'herbs'],
    ingredients: ['Fresh turmeric root'],
    benefits: ['Anti-inflammatory', 'Daily immunity support'],
    nutrition: 'Rich in curcumin and natural antioxidants',
    description: 'Farm-fresh turmeric powder for wholesome cooking and wellness.',
    shortDescription: 'Bright golden spice with daily wellness value.'
  },
  {
    name: 'Herbal Wellness Blend',
    category: 'Herbal Products',
    price: 699,
    discountPrice: 549,
    image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=900&q=80',
    images: [
      'https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=900&q=80',
    ],
    rating: 4.8,
    reviewCount: 132,
    stock: 18,
    organic: true,
    featured: true,
    bestSeller: true,
    tags: ['herbal', 'wellness', 'immune'],
    ingredients: ['Tulsi', 'Ashwagandha', 'Moringa'],
    benefits: ['Daily balance', 'Stress support'],
    nutrition: 'Plant-powered nutrition with adaptogenic herbs',
    description: 'A thoughtfully blended herbal mix to support everyday vitality.',
    shortDescription: 'Balanced herbal formula for natural daily support.'
  },
  {
    name: 'Organic Fruit Box',
    category: 'Fruits',
    price: 899,
    discountPrice: 799,
    image: 'https://images.unsplash.com/photo-1619566636858-adf3ef46400b?auto=format&fit=crop&w=900&q=80',
    images: [
      'https://images.unsplash.com/photo-1619566636858-adf3ef46400b?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1464226184884-fa52ac9d7a8f?auto=format&fit=crop&w=900&q=80',
    ],
    rating: 4.7,
    reviewCount: 76,
    stock: 12,
    organic: true,
    featured: false,
    bestSeller: false,
    tags: ['fruit box', 'organic', 'seasonal'],
    ingredients: ['Apples', 'Oranges', 'Pomegranate'],
    benefits: ['Seasonal nutrition', 'Fresh produce'],
    nutrition: 'Packed with vitamin C and dietary fiber',
    description: 'A curated seasonal fruit box for wholesome family snacking.',
    shortDescription: 'Fresh seasonal fruits in one handpicked box.'
  }
];

router.get('/', async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    if (products.length === 0) {
      const seeded = await Product.insertMany(productsSeed);
      return res.status(200).json(seeded);
    }
    return res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message || 'Failed to fetch products' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message || 'Product fetch failed' });
  }
});

export default router;
