const mongoose = require('mongoose');

const nutritionSchema = new mongoose.Schema({
  calories: {
    type: Number,
    required: true
  },
  protein: {
    type: Number,
    required: true
  },
  carbohydrates: {
    type: Number,
    required: true
  },
  fat: {
    type: Number,
    required: true
  },
  fiber: {
    type: Number,
    required: true
  },
  vitamins: [{
    name: String,
    amount: Number,
    unit: String
  }],
  minerals: [{
    name: String,
    amount: Number,
    unit: String
  }]
});

const productSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: true,
    trim: true,
    index: true
  },
  scientificName: {
    type: String,
    trim: true
  },
  productCategory: {
    type: String,
    required: true,
    enum: ['fruits', 'vegetables'],
    index: true
  },
  subCategory: {
    type: String,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  benefits: [String],
  season: {
    type: [String],
    enum: ['spring', 'summer', 'autumn', 'winter', 'all'],
    required: true
  },
  price: {
    amount: {
      type: Number,
      required: true
    },
    unit: {
      type: String,
      enum: ['kg', 'piece', 'dozen'],
      required: true
    }
  },
  stock: {
    available: {
      type: Number,
      required: true,
      min: 0
    },
    unit: {
      type: String,
      enum: ['kg', 'piece', 'dozen'],
      required: true
    }
  },
  images: {
    primary: {
      type: String,
      required: true
    },
    secondary: [String],
    thumbnail: String
  },
  nutrition: {
    type: nutritionSchema,
    required: true
  },
  storageInstructions: String,
  shelfLife: {
    duration: Number,
    unit: {
      type: String,
      enum: ['days', 'weeks', 'months']
    }
  },
  origin: {
    country: String,
    region: String
  },
  organic: {
    type: Boolean,
    default: false
  },
  certification: [String],
  reviews: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5
    },
    comment: String,
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  averageRating: {
    type: Number,
    default: 0
  },
  totalReviews: {
    type: Number,
    default: 0
  },
  tags: [String],
  status: {
    type: String,
    enum: ['available', 'out_of_stock', 'coming_soon'],
    default: 'available'
  }
}, {
  timestamps: true
});

// Create indexes for efficient querying
productSchema.index({ productName: 'text', description: 'text', tags: 'text' });
productSchema.index({ 'price.amount': 1 });
productSchema.index({ season: 1 });
productSchema.index({ 'nutrition.calories': 1 });
productSchema.index({ averageRating: -1 });

module.exports = mongoose.model('Product', productSchema);
