const express = require('express');
const Product = require('../models/product.model');
const { protect, admin } = require('../middleware/auth.middleware');

const router = express.Router();

// Get all products with filtering, sorting, and pagination
router.get('/', async (req, res) => {
  try {
    const {
      category,
      search,
      minPrice,
      maxPrice,
      season,
      organic,
      sortBy,
      page = 1,
      limit = 10,
      nutritionFilter
    } = req.query;

    // Build query
    let query = {};
    
    // Category filter
    if (category) {
      query.productCategory = category;
    }
    
    // Search filter
    if (search) {
      query.$text = { $search: search };
    }

    // Price filter
    if (minPrice || maxPrice) {
      query['price.amount'] = {};
      if (minPrice) query['price.amount'].$gte = Number(minPrice);
      if (maxPrice) query['price.amount'].$lte = Number(maxPrice);
    }

    // Season filter
    if (season) {
      query.season = season;
    }

    // Organic filter
    if (organic) {
      query.organic = organic === 'true';
    }

    // Nutrition filter
    if (nutritionFilter) {
      const nutritionCriteria = JSON.parse(nutritionFilter);
      Object.entries(nutritionCriteria).forEach(([key, value]) => {
        query[`nutrition.${key}`] = { $gte: Number(value) };
      });
    }

    // Build sort options
    let sortOptions = {};
    if (sortBy) {
      switch (sortBy) {
        case 'price_asc':
          sortOptions['price.amount'] = 1;
          break;
        case 'price_desc':
          sortOptions['price.amount'] = -1;
          break;
        case 'rating':
          sortOptions.averageRating = -1;
          break;
        case 'popularity':
          sortOptions.totalReviews = -1;
          break;
        default:
          sortOptions.createdAt = -1;
      }
    }

    // Execute query with pagination
    const skip = (page - 1) * limit;
    const products = await Product.find(query)
      .sort(sortOptions)
      .skip(skip)
      .limit(Number(limit))
      .select('-reviews');

    // Get total count for pagination
    const total = await Product.countDocuments(query);

    res.json({
      products,
      pagination: {
        total,
        page: Number(page),
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get product by ID with full details
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate('reviews.user', 'name');
    
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Create product (Admin only)
router.post('/', protect, admin, async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update product (Admin only)
router.put('/:id', protect, admin, async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Delete product (Admin only)
router.delete('/:id', protect, admin, async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json({ message: 'Product removed' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Add review
router.post('/:id/reviews', protect, async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const alreadyReviewed = product.reviews.find(
      r => r.user.toString() === req.user._id.toString()
    );

    if (alreadyReviewed) {
      return res.status(400).json({ message: 'Product already reviewed' });
    }

    const review = {
      user: req.user._id,
      rating: Number(rating),
      comment
    };

    product.reviews.push(review);
    product.totalReviews = product.reviews.length;
    product.averageRating = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length;

    await product.save();
    res.status(201).json({ message: 'Review added' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get product stats
router.get('/stats/overview', protect, admin, async (req, res) => {
  try {
    const stats = await Product.aggregate([
      {
        $group: {
          _id: '$productCategory',
          count: { $sum: 1 },
          averagePrice: { $avg: '$price.amount' },
          minPrice: { $min: '$price.amount' },
          maxPrice: { $max: '$price.amount' },
          totalReviews: { $sum: '$totalReviews' },
          averageRating: { $avg: '$averageRating' }
        }
      }
    ]);

    res.json(stats);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
