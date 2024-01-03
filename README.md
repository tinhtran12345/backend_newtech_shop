## I. Fullstack Newtech_shop project

### 1. Technical Stack

- Backend:

  - [Nest(NestJS)](https://docs.nestjs.com/) is a framework for building efficient, scalable [Node.js](https://nodejs.org/en/download/) server-side application. It uses progressive Javascript, is built with and fully support TypeScript and combines elements of OOP (Object Oriented Programming), FP(Functional Programming), and FRP(Function Reactive Programming)

  - [Prisma ORM](https://www.prisma.io/docs/getting-started/quickstart): is open source next-generation Node.js and TypeScript ORM
  - [JWT(Json web token)](https://jwt.io/), [Socket.io](socket.io)

- Frontend:
  - [Nextjs](https://nextjs.org/) using app router, [Redux, Redux-toolkit](https://redux-toolkit.js.org/), [Prisma client](https://www.prisma.io/docs/getting-started/quickstart)
- Database:
  - MySQL, [redis](https://redis.io/docs/get-started/)

### 2. Features

- Login, logout, Register, forgot password, read and update personal information, message.
- Admin features: Manage users, categories, products, posts, promotions, orders, imports, suppliers, statistics.
- User features: Product details, add or remove products in the cart
- Order, pay online, view order details, news, purchase history, comments, product reviews

### 3. Build and Deploy

- [Docker](https://www.docker.com/)
- [Vercel](https://nextjs.org/)

## II. Project details

- Purpose:

### 1. Design Database

- User management
  - User (full_name, first_name, last_name, email, password)
  - Address(address_line1, address_line2, city, country, phone_number)
  - Role (name: admin | user )
- Product management
  - Product (SKU,product_name, description, price, quantity)
  - Product_category(category_name, desc)
  - Product_discount(name, desc, discount_percent, active) => làm sau
- Shopping process

  - Order(order_number, order_date, total_price) --> Order_item(quantity, price)
  - Shipping_product(order_date, address ,receipt_date)
  - Payment(date, method, amount, status)

- Link design database: https://dbdiagram.io/d/Newtechshop-65830d9156d8064ca065c3f7

### 2. Testing

- Jest or spectrum speed test

### 3.Usages

- Clone project

`git clone https://github.com/tinhtran12345/backend_newtech_shop.git`

- Run docker compose

`docker compose up -d`
