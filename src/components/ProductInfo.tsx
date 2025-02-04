import React from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../store';

const ProductInfo: React.FC = () => {
  const product = useSelector((state: RootState) => state.product.data);

  if (!product) return null;

  return (
    <div className="bg-white rounded-lg p-6 shadow-md">
      <div className="flex flex-col items-center">
        <img src={product.image} alt={product.title} className="w-32 h-32 object-contain mb-4" />
        <h1 className="text-xl font-bold text-gray-800">{product.title}</h1>
        <p className="text-sm text-gray-600 mt-2">{product.subtitle}</p>
        
        <div className="flex flex-wrap gap-2 mt-4">
          {product.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;