import almondsProductImg from '../assets/products/Almonds.png';
import greenTeaProductImg from '../assets/products/Green tea.png';
import turmericProductImg from '../assets/products/Turmericpowder.png';
import herbsProductImg from '../assets/products/Herbs.png';

const localProductImages = {
  'Organic Almonds': almondsProductImg,
  'Green Tea Detox': greenTeaProductImg,
  'Turmeric Powder': turmericProductImg,
  'Herbal Wellness Blend': herbsProductImg,
};

export function applyProductImage(product) {
  const localImage = localProductImages[product.name];

  if (!localImage) return product;

  return {
    ...product,
    image: localImage,
    images: [localImage],
  };
}

export function applyProductImages(products) {
  return products.map(applyProductImage);
}