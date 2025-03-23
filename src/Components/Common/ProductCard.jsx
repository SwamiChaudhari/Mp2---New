import React, { useState } from 'react';
import { FaHeart, FaRegHeart, FaShoppingCart } from 'react-icons/fa';
import { toast } from 'react-hot-toast';
import { productApi } from '../../services/api';

const ProductCard = ({ product, onWishlistUpdate }) => {
  const [isWishlisted, setIsWishlisted] = useState(product.isWishlisted);
  const [isLoading, setIsLoading] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleAddToCart = async () => {
    try {
      setIsLoading(true);
      const token = localStorage.getItem('token');
      if (!token) {
        toast.error('Please login to add to cart');
        return;
      }

      await productApi.addToCart(product._id);
      toast.success('Added to cart!');
    } catch (error) {
      toast.error(error.message || 'Failed to add to cart');
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleWishlist = async () => {
    try {
      setIsLoading(true);
      await productApi.toggleWishlist(product._id);
      setIsWishlisted(!isWishlisted);
      if (onWishlistUpdate) onWishlistUpdate();
      toast.success(isWishlisted ? 'Removed from wishlist' : 'Added to wishlist');
    } catch (error) {
      toast.error(error.message || 'Failed to update wishlist');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="relative">
        <img
          alt={product.productName}
          src={product.images?.primary || product.frontImg}
          onLoad={() => setImageLoaded(true)}
          className={`w-full h-48 object-cover transition-opacity duration-300 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        />
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gray-200 animate-pulse" />
        )}
        <button
          onClick={handleToggleWishlist}
          disabled={isLoading}
          className="absolute top-2 right-2 p-2 rounded-full bg-white shadow-md hover:bg-gray-100 transition-colors duration-200"
        >
          {isWishlisted ? (
            <FaHeart className="text-red-500 text-xl" />
          ) : (
            <FaRegHeart className="text-gray-500 text-xl" />
          )}
        </button>
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">
          {product.productName}
        </h3>
        
        <div className="flex items-center justify-between mb-3">
          <span className="text-green-600 font-bold">
            ₹{product.price?.amount || product.productPrice}
          </span>
          {product.stock?.available > 0 ? (
            <span className="text-green-500 text-sm">In Stock</span>
          ) : (
            <span className="text-red-500 text-sm">Out of Stock</span>
          )}
        </div>

        {product.organic && (
          <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded mb-2">
            Organic
          </span>
        )}

        <button
          onClick={handleAddToCart}
          disabled={isLoading || (product.stock?.available === 0)}
          className={`w-full flex items-center justify-center gap-2 py-2 px-4 rounded-md transition-colors duration-200 ${
            product.stock?.available === 0
              ? 'bg-gray-300 cursor-not-allowed'
              : 'bg-green-600 hover:bg-green-700 text-white'
          }`}
        >
          <FaShoppingCart />
          {isLoading ? 'Adding...' : 'Add to Cart'}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
