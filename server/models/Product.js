import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    discountPrice: { type: Number, default: 0 },
    image: { type: String, required: true },
    images: [{ type: String }],
    rating: { type: Number, default: 4.5 },
    reviewCount: { type: Number, default: 0 },
    stock: { type: Number, default: 10 },
    organic: { type: Boolean, default: true },
    featured: { type: Boolean, default: false },
    bestSeller: { type: Boolean, default: false },
    tags: [{ type: String }],
    ingredients: [{ type: String }],
    benefits: [{ type: String }],
    nutrition: { type: String },
    description: { type: String },
    shortDescription: { type: String },
  },
  { timestamps: true },
);

export default mongoose.models.Product || mongoose.model('Product', productSchema);
