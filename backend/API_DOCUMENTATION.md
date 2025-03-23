# Fruits and Vegetables E-commerce API Documentation

## Base URL
```
http://localhost:5000/api
```

## Authentication
All protected routes require a Bearer token in the Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

## Products API Endpoints

### Get All Products
```http
GET /products
```

#### Query Parameters
- `category` (string): Filter by category (fruits/vegetables)
- `search` (string): Search in product name, description, and tags
- `minPrice` (number): Minimum price filter
- `maxPrice` (number): Maximum price filter
- `season` (string): Filter by season (spring/summer/autumn/winter/all)
- `organic` (boolean): Filter organic products
- `sortBy` (string): Sort products by:
  - price_asc
  - price_desc
  - rating
  - popularity
- `page` (number, default: 1): Page number for pagination
- `limit` (number, default: 10): Items per page
- `nutritionFilter` (JSON string): Filter by nutritional values
  ```json
  {
    "calories": 100,
    "protein": 5,
    "fiber": 3
  }
  ```

#### Response
```json
{
  "success": true,
  "data": {
    "products": [
      {
        "productName": "Fresh Mangoes",
        "productCategory": "fruits",
        "price": {
          "amount": 100,
          "unit": "kg"
        },
        "nutrition": {
          "calories": 60,
          "protein": 0.8,
          "carbohydrates": 15,
          "fat": 0.2,
          "fiber": 1.6
        },
        // ... other fields
      }
    ],
    "pagination": {
      "total": 100,
      "page": 1,
      "pages": 10
    }
  }
}
```

### Get Product by ID
```http
GET /products/:id
```

#### Response
```json
{
  "success": true,
  "data": {
    "productName": "Fresh Mangoes",
    "scientificName": "Mangifera indica",
    "productCategory": "fruits",
    "description": "Sweet and juicy Alphonso mangoes",
    "benefits": ["Rich in Vitamin C", "Good source of fiber"],
    "season": ["summer"],
    "price": {
      "amount": 100,
      "unit": "kg"
    },
    "stock": {
      "available": 500,
      "unit": "kg"
    },
    "images": {
      "primary": "url_to_image",
      "secondary": ["url1", "url2"],
      "thumbnail": "url_to_thumbnail"
    },
    "nutrition": {
      "calories": 60,
      "protein": 0.8,
      "carbohydrates": 15,
      "fat": 0.2,
      "fiber": 1.6,
      "vitamins": [
        {
          "name": "Vitamin C",
          "amount": 36.4,
          "unit": "mg"
        }
      ]
    },
    "reviews": [
      {
        "user": {
          "name": "John Doe"
        },
        "rating": 5,
        "comment": "Great quality mangoes!",
        "createdAt": "2025-03-22T14:30:00.000Z"
      }
    ]
  }
}
```

### Create Product (Admin Only)
```http
POST /products
```

#### Request Body
```json
{
  "productName": "Fresh Mangoes",
  "scientificName": "Mangifera indica",
  "productCategory": "fruits",
  "description": "Sweet and juicy Alphonso mangoes",
  "benefits": ["Rich in Vitamin C", "Good source of fiber"],
  "season": ["summer"],
  "price": {
    "amount": 100,
    "unit": "kg"
  },
  "stock": {
    "available": 500,
    "unit": "kg"
  },
  "images": {
    "primary": "url_to_image",
    "secondary": ["url1", "url2"],
    "thumbnail": "url_to_thumbnail"
  },
  "nutrition": {
    "calories": 60,
    "protein": 0.8,
    "carbohydrates": 15,
    "fat": 0.2,
    "fiber": 1.6,
    "vitamins": [
      {
        "name": "Vitamin C",
        "amount": 36.4,
        "unit": "mg"
      }
    ]
  }
}
```

### Update Product (Admin Only)
```http
PUT /products/:id
```

### Delete Product (Admin Only)
```http
DELETE /products/:id
```

### Add Product Review
```http
POST /products/:id/reviews
```

#### Request Body
```json
{
  "rating": 5,
  "comment": "Great quality product!"
}
```

### Get Product Statistics (Admin Only)
```http
GET /products/stats/overview
```

#### Response
```json
{
  "success": true,
  "data": [
    {
      "_id": "fruits",
      "count": 50,
      "averagePrice": 85.5,
      "minPrice": 30,
      "maxPrice": 200,
      "totalReviews": 1250,
      "averageRating": 4.5
    },
    {
      "_id": "vegetables",
      "count": 75,
      "averagePrice": 45.2,
      "minPrice": 20,
      "maxPrice": 150,
      "totalReviews": 1800,
      "averageRating": 4.3
    }
  ]
}
```

## Error Responses
```json
{
  "success": false,
  "message": "Error message here"
}
```

## Rate Limiting
- 100 requests per minute for regular users
- 300 requests per minute for admin users

## Best Practices
1. Always include proper authentication headers
2. Use pagination for large datasets
3. Use specific error handling
4. Cache responses when appropriate
5. Use HTTPS in production
