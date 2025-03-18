
# **📌 API Documentation for E-Commerce Backend**
Base URL: **`/api`**

## **1️⃣ User Routes (`/api/user`)**
### **🔹 Register a new user**
**`POST /api/user/register`**  
📌 **Description:** Register a new user.  

📥 **Request Body:**  
```json
{
  "name": "John Doe",
  "email": "johndoe@example.com",
  "password": "123456"
}
```
📤 **Response:**  
```json
{
  "message": "User registered successfully",
  "user": {
    "id": "user123",
    "name": "John Doe",
    "email": "johndoe@example.com",
    "token": "jwt_token_here"
  }
}
```

---

### **🔹 User Login**
**`POST /api/user/login`**  
📌 **Description:** Log in a user.  

📥 **Request Body:**  
```json
{
  "email": "johndoe@example.com",
  "password": "123456"
}
```
📤 **Response:**  
```json
{
  "message": "Login successful",
  "user": {
    "id": "user123",
    "name": "John Doe",
    "email": "johndoe@example.com",
    "token": "jwt_token_here"
  }
}
```

---

### **🔹 User Logout**
**`POST /api/user/logout`**  
📌 **Description:** Log out the user.  

📤 **Response:**  
```json
{
  "message": "User logged out successfully"
}
```

---

## **2️⃣ Product Routes (`/api/product`)**
### **🔹 Get all products**
**`GET /api/product/`**  
📌 **Description:** Fetch all products.  

📤 **Response:**  
```json
[
  {
    "id": "prod123",
    "name": "Workout blue set",
    "price": 200,
    "brand": "Gucci",
    "rating": 5.0
  }
]
```

---

### **🔹 Get product by ID**
**`GET /api/product/:id`**  
📌 **Description:** Fetch a product by its ID.  

📤 **Response:**  
```json
{
  "id": "prod123",
  "name": "Workout blue set",
  "price": 200,
  "brand": "Gucci",
  "rating": 5.0
}
```

---

### **🔹 Get product by Slug**
**`GET /api/product/slug/:slug`**  
📌 **Description:** Fetch a product by its slug.  

📤 **Response:**  
```json
{
  "id": "prod123",
  "name": "Workout blue set",
  "price": 200,
  "brand": "Gucci",
  "rating": 5.0
}
```

---

### **🔹 Get product categories**
**`GET /api/product/categories`**  
📌 **Description:** Fetch all product categories.  

📤 **Response:**  
```json
[
  "Clothing",
  "Electronics",
  "Accessories"
]
```

---

### **🔹 Create a product (Admin Only)**
**`POST /api/product/`**  
📌 **Description:** Admin can add a new product.  

📥 **Request Body (Multipart Form-Data):**  
- `name`: "Workout blue set"  
- `price`: 200  
- `images[]`: [Image files]  

📤 **Response:**  
```json
{
  "message": "Product Created",
  "product": {
    "id": "prod123",
    "name": "Workout blue set",
    "price": 200
  }
}
```

---

### **🔹 Update a product (Admin Only)**
**`PUT /api/product/:id`**  
📌 **Description:** Admin can update product details.  

📥 **Request Body:** _(Optional fields can be updated)_  
```json
{
  "name": "Updated Product Name",
  "price": 250
}
```
📤 **Response:**  
```json
{
  "message": "Product Updated",
  "product": {
    "id": "prod123",
    "name": "Updated Product Name",
    "price": 250
  }
}
```

---

### **🔹 Delete a product (Admin Only)**
**`DELETE /api/product/:id`**  
📌 **Description:** Admin can delete a product.  

📤 **Response:**  
```json
{
  "message": "Product Deleted"
}
```

---

### **🔹 Add a review**
**`POST /api/product/:id/reviews`**  
📌 **Description:** Add a review for a product.  

📥 **Request Body:**  
```json
{
  "rating": 5,
  "comment": "Amazing product!"
}
```
📤 **Response:**  
```json
{
  "message": "Review added"
}
```

---

## **3️⃣ Order Routes (`/api/order`)**
### **🔹 Get all orders (Admin Only)**
**`GET /api/order/`**  
📌 **Description:** Fetch all orders.  

📤 **Response:**  
```json
[
  {
    "id": "order123",
    "totalPrice": 500,
    "status": "Processing"
  }
]
```

---

### **🔹 Create an order**
**`POST /api/order/`**  
📌 **Description:** Create a new order.  

📥 **Request Body:**  
```json
{
  "items": [
    {
      "productId": "prod123",
      "quantity": 2
    }
  ],
  "totalPrice": 400
}
```
📤 **Response:**  
```json
{
  "message": "Order Created",
  "order": {
    "id": "order123",
    "totalPrice": 400
  }
}
```

---

### **🔹 Get order summary (Admin Only)**
**`GET /api/order/summary`**  
📌 **Description:** Fetch order summary.  

📤 **Response:**  
```json
{
  "totalOrders": 100,
  "totalRevenue": 50000
}
```

---

### **🔹 Get user orders**
**`GET /api/order/mine`**  
📌 **Description:** Get all orders of logged-in user.  

📤 **Response:**  
```json
[
  {
    "id": "order123",
    "totalPrice": 400,
    "status": "Shipped"
  }
]
```

---

### **🔹 Get order by ID**
**`GET /api/order/:id`**  
📌 **Description:** Fetch order details by ID.  

📤 **Response:**  
```json
{
  "id": "order123",
  "totalPrice": 400,
  "status": "Processing"
}
```

---

### **🔹 Pay for an order**
**`PUT /api/order/:id/pay`**  
📌 **Description:** Update order status to "Paid".  

📤 **Response:**  
```json
{
  "message": "Order Paid"
}
```

---

## **🚀 Authentication**
📌 All **protected routes** require a `Bearer Token` in the `Authorization` header.  

📌 **Admin routes** require an admin role.  

---

## **📌 Summary**
✅ `/api/user` → User authentication  
✅ `/api/product` → Product management  
✅ `/api/order` → Order management  
