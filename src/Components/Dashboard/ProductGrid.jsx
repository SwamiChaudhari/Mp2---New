import React, { useState, useEffect, useCallback } from 'react';
import ProductCard from '../Common/ProductCard';
import { productApi } from '../../services/api';
import useInfiniteScroll from '../../hooks/useInfiniteScroll';

const ProductGrid = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    category: '',
    minPrice: '',
    maxPrice: '',
    sortBy: '',
    search: '',
  });
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  // Fetch products with current filters
  const fetchProducts = useCallback(async (pageNum = 1) => {
    try {
      setLoading(true);
      setError(null);
      const response = await productApi.getProducts({
        page: pageNum,
        limit: 12,
        ...filters,
      });
      
      const newProducts = response.data.products;
      if (pageNum === 1) {
        setProducts(newProducts);
      } else {
        setProducts(prev => [...prev, ...newProducts]);
      }
      
      setHasMore(newProducts.length === 12);
    } catch (err) {
      setError(err.message || 'Failed to fetch products');
    } finally {
      setLoading(false);
    }
  }, [filters]);

  // Load more products when scrolling
  const loadMore = useCallback(() => {
    if (!loading && hasMore) {
      setPage(prev => prev + 1);
    }
  }, [loading, hasMore]);

  // Use custom infinite scroll hook
  const [containerRef] = useInfiniteScroll(loadMore);

  // Initial fetch and filter changes
  useEffect(() => {
    setPage(1);
    fetchProducts(1);
  }, [filters, fetchProducts]);

  // Fetch more products when page changes
  useEffect(() => {
    if (page > 1) {
      fetchProducts(page);
    }
  }, [page, fetchProducts]);

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow-md">
        <div className="flex flex-wrap gap-4">
          <select
            value={filters.category}
            onChange={(e) => handleFilterChange('category', e.target.value)}
            className="px-3 py-2 border rounded-md"
          >
            <option value="">All Categories</option>
            <option value="fruits">Fruits</option>
            <option value="vegetables">Vegetables</option>
          </select>

          <select
            value={filters.sortBy}
            onChange={(e) => handleFilterChange('sortBy', e.target.value)}
            className="px-3 py-2 border rounded-md"
          >
            <option value="">Sort By</option>
            <option value="price_asc">Price: Low to High</option>
            <option value="price_desc">Price: High to Low</option>
            <option value="rating">Rating</option>
            <option value="popularity">Popularity</option>
          </select>

          <div className="flex gap-2">
            <input
              type="number"
              placeholder="Min Price"
              value={filters.minPrice}
              onChange={(e) => handleFilterChange('minPrice', e.target.value)}
              className="px-3 py-2 border rounded-md w-24"
            />
            <input
              type="number"
              placeholder="Max Price"
              value={filters.maxPrice}
              onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
              className="px-3 py-2 border rounded-md w-24"
            />
          </div>

          <input
            type="text"
            placeholder="Search products..."
            value={filters.search}
            onChange={(e) => handleFilterChange('search', e.target.value)}
            className="px-3 py-2 border rounded-md flex-grow"
          />
        </div>
      </div>

      {/* Error message */}
      {error && (
        <div className="bg-red-100 text-red-700 p-4 rounded-lg">
          {error}
        </div>
      )}

      {/* Product grid */}
      <div
        ref={containerRef}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
      >
        {products.map((product) => (
          <ProductCard
            key={product._id}
            product={product}
            onWishlistUpdate={() => fetchProducts(1)}
          />
        ))}
      </div>

      {/* Loading indicator */}
      {loading && (
        <div className="flex justify-center py-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
        </div>
      )}

      {/* No products message */}
      {!loading && products.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No products found matching your criteria
        </div>
      )}
    </div>
  );
};

export default ProductGrid;
