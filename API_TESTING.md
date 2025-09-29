# API Testing Guide

This document provides comprehensive testing examples for all API endpoints.

## API Endpoints Overview

### Production Orders API
- `GET /api/orders` - Fetch all orders with optional filtering
- `GET /api/orders/[id]` - Fetch single order by ID
- `POST /api/orders` - Create new order (requires database)
- `PUT /api/orders/[id]` - Update existing order (requires database)
- `DELETE /api/orders/[id]` - Delete order (requires database)

## Testing with curl Commands

### 1. GET All Orders

**Basic Request:**
```bash
curl -X GET "http://localhost:3000/api/orders" \
  -H "Content-Type: application/json"
```

**With Status Filter:**
```bash
curl -X GET "http://localhost:3000/api/orders?status=processing" \
  -H "Content-Type: application/json"
```

**With Customer Filter:**
```bash
curl -X GET "http://localhost:3000/api/orders?customer=CASH" \
  -H "Content-Type: application/json"
```

**With Pagination:**
```bash
curl -X GET "http://localhost:3000/api/orders?limit=10&offset=20" \
  -H "Content-Type: application/json"
```

**Combined Filters:**
```bash
curl -X GET "http://localhost:3000/api/orders?status=shipped&customer=GLASS&limit=5" \
  -H "Content-Type: application/json"
```

### 2. GET Single Order

**Valid Order ID:**
```bash
curl -X GET "http://localhost:3000/api/orders/WOB06376" \
  -H "Content-Type: application/json"
```

**Invalid Order ID (404 Test):**
```bash
curl -X GET "http://localhost:3000/api/orders/INVALID123" \
  -H "Content-Type: application/json"
```

### 3. POST Create Order (Database Required)

**Valid Request:**
```bash
curl -X POST "http://localhost:3000/api/orders" \
  -H "Content-Type: application/json" \
  -d '{
    "wobNumber": "WOB99999",
    "customer": "Test Customer",
    "finish": "Test Finish",
    "dueDate": "2025-12-31",
    "quantity": 10,
    "notes": "Test order"
  }'
```

**Missing Required Fields (400 Test):**
```bash
curl -X POST "http://localhost:3000/api/orders" \
  -H "Content-Type: application/json" \
  -d '{
    "customer": "Test Customer"
  }'
```

### 4. PUT Update Order (Database Required)

**Valid Update:**
```bash
curl -X PUT "http://localhost:3000/api/orders/WOB06376" \
  -H "Content-Type: application/json" \
  -d '{
    "notes": "Updated notes",
    "quantity": 50
  }'
```

**No Valid Fields (400 Test):**
```bash
curl -X PUT "http://localhost:3000/api/orders/WOB06376" \
  -H "Content-Type: application/json" \
  -d '{
    "invalidField": "test"
  }'
```

### 5. DELETE Order (Database Required)

**Valid Delete:**
```bash
curl -X DELETE "http://localhost:3000/api/orders/WOB99999" \
  -H "Content-Type: application/json"
```

## Testing with Browser

You can test GET endpoints directly in your browser:

### Browser URLs
```
http://localhost:3000/api/orders
http://localhost:3000/api/orders?status=processing
http://localhost:3000/api/orders?customer=GLASS
http://localhost:3000/api/orders/WOB06376
```

## Expected Response Formats

### Success Response (200/201)
```json
{
  "success": true,
  "data": [...],
  "count": 10,
  "message": "Optional success message"
}
```

### Error Response (400/404/500)
```json
{
  "success": false,
  "error": "Error type",
  "message": "Detailed error message"
}
```

## Status Code Reference

| Code | Description | When |
|------|-------------|------|
| 200 | OK | Successful GET, PUT, DELETE |
| 201 | Created | Successful POST |
| 400 | Bad Request | Missing/invalid parameters |
| 404 | Not Found | Order ID doesn't exist |
| 409 | Conflict | Order already exists (POST) |
| 500 | Server Error | Database/system errors |

## Testing Script Examples

### Node.js Test Script
```javascript
// test-api.js
const BASE_URL = 'http://localhost:3000/api';

async function testAPI() {
  // Test GET all orders
  const response = await fetch(`${BASE_URL}/orders`);
  const data = await response.json();
  console.log('All orders:', data.count);

  // Test GET single order
  if (data.data.length > 0) {
    const firstOrderId = data.data[0].id;
    const orderResponse = await fetch(`${BASE_URL}/orders/${firstOrderId}`);
    const orderData = await orderResponse.json();
    console.log('Single order:', orderData.success);
  }

  // Test filtering
  const filteredResponse = await fetch(`${BASE_URL}/orders?status=processing`);
  const filteredData = await filteredResponse.json();
  console.log('Processing orders:', filteredData.count);
}

testAPI().catch(console.error);
```

### Python Test Script
```python
# test-api.py
import requests
import json

BASE_URL = 'http://localhost:3000/api'

def test_api():
    # Test GET all orders
    response = requests.get(f'{BASE_URL}/orders')
    data = response.json()
    print(f'All orders: {data["count"]}')

    # Test GET single order
    if data['data']:
        first_order_id = data['data'][0]['id']
        order_response = requests.get(f'{BASE_URL}/orders/{first_order_id}')
        order_data = order_response.json()
        print(f'Single order: {order_data["success"]}')

if __name__ == '__main__':
    test_api()
```

## Manual Testing Checklist

### GET /api/orders
- [ ] Returns all orders with valid structure
- [ ] Filtering by status works
- [ ] Filtering by customer works
- [ ] Pagination works (limit/offset)
- [ ] Combined filters work
- [ ] Returns 500 on server error

### GET /api/orders/[id]
- [ ] Returns single order for valid ID
- [ ] Returns 404 for invalid ID
- [ ] Returns 400 for missing ID

### POST /api/orders (Database Mode)
- [ ] Creates order with valid data (201)
- [ ] Returns 400 for missing required fields
- [ ] Returns 409 for duplicate order ID
- [ ] Returns 500 for database errors

### PUT /api/orders/[id] (Database Mode)
- [ ] Updates order with valid data (200)
- [ ] Returns 404 for invalid order ID
- [ ] Returns 400 for no valid fields
- [ ] Returns 400 for missing ID

### DELETE /api/orders/[id] (Database Mode)
- [ ] Deletes order successfully (200)
- [ ] Returns 404 for invalid order ID
- [ ] Returns 400 for missing ID

## Performance Testing

### Load Testing with curl
```bash
# Test concurrent requests
for i in {1..10}; do
  curl -X GET "http://localhost:3000/api/orders" &
done
wait
```

### Response Time Testing
```bash
# Measure response time
time curl -X GET "http://localhost:3000/api/orders"
```

## Error Scenarios to Test

1. **Server not running**: Connection refused
2. **Invalid JSON**: Malformed request body
3. **Large datasets**: Memory/timeout issues
4. **Network issues**: Timeout scenarios
5. **Database unavailable**: Fallback behavior

## Automated Testing Setup

For production, consider setting up:
- Jest/Vitest for unit tests
- Supertest for API endpoint testing
- Postman collections for integration testing
- GitHub Actions for CI/CD testing