# Athleisure Styles <br />MERN E-Commerce Platform

<img src="https://img.shields.io/badge/-MONGODB-00800.svg?logo=mongodb&style=flat&logoColor=fff"><img src="https://img.shields.io/badge/-Express-000000.svg?logo=express&style=flat&logoColor=FF0">
<img src="https://img.shields.io/badge/-React-555.svg?logo=react&style=flat"><img src="https://img.shields.io/badge/-Node.js-339933.svg?logo=node.js&style=flat&logoColor=ff0">

<img src="https://img.shields.io/badge/-Redux-764ABC.svg?logo=redux&style=flat-square"><img src="https://img.shields.io/badge/-Paypal-00457C.svg?logo=paypal&style=flat-square"><img src="https://img.shields.io/badge/-Formik-4285F4.svg?logo=formik&style=flat-square"><img src="https://img.shields.io/badge/-Yup-E2B714.svg?logo=yup&style=flat-square"><img src="https://img.shields.io/badge/-Material_UI-000.svg?logo=mui&style=flat&logoColor=007FFF=flat-square"><img src="https://img.shields.io/badge/-Motion-0055ff.svg?logo=framer&style=flat-square"><img src="https://img.shields.io/badge/-AXIOS-5A29E4.svg?logo=axios&style=popout-square">

<p>etc...</p>

### DEMO PC Version.
![pc](https://github.com/sahoooii/MERN_AthleisureStyles/assets/75118062/def87834-d35c-4f06-915e-770f436f0826)

### PC Version. Menu
![withMenu](https://github.com/sahoooii/MERN_AthleisureStyles/assets/75118062/45e2cfbb-01ba-436a-9689-9c821ee97460)

### Mobile Version.

![mobile](https://github.com/sahoooii/MERN_AthleisureStyles/assets/75118062/c1761916-6f69-486d-94db-399ccb951a91)


#### Describe

This project is an eCommerce platform built with the MERN stack and Redux and using Material UI. This one is my first piece of the MERN stack original project. It's took almost half a year since I started it. <br />
At first time, I was not used to using Material UI, so this was one of the struggling parts. I put effort into the design. And fully responsive web design.<br />
I made the name Athleisure Styles. The concept is sports and Fashion mixed styles. It is a full-featured shopping cart with PayPal and credit/debit payments.

このプロジェクトは、MERN スタックと Redux で構築されマテリアル UI を使用する e コマースプラットフォームです。MERN スタックプロジェクトの初めてのオリジナル作品です。始めてから半年近くかかりました。<br />
また初めてマテリアル UI を使用したので、なかなか慣れずここが苦労した部分の一つでした。デザインにもかなりこだわり、レスポンシブデザイン対応です。<br />
コンセプトはスポーツとファッションのミックススタイルがテーマで、Athleisure Stylesと名前をつけました。PayPal とクレジット/デビット支払いを備えたフル機能のショッピングサイトです。

## Features

- Home Carousel
- Home Tab Most Reviewed and Top Rated
- Home categories
- Create Item reviews ratings, and delete reviews
- Items search feature
- Full featured shopping cart
- Pagination
- Checkout Steps (shipping, payment method, etc)
- PayPal / credit card integration
- Database seeder (items & users)
- User
  - Register profile with profile image
  - User profile Edit and Delete
  - Order History, Order details page
  - Add Wishlist and Remove
- Admin Management
  - User management
  - Create new items and delete items
  - Manage reviews
  - Admin Order details page
  - Mark orders as delivered option

## Usage

- Create a MongoDB database and obtain your MongoDB URI &nbsp; -[ MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register)
- Create a PayPal account and obtain your Client ID &nbsp; -[ PayPal Developer](https://developer.paypal.com/home)

### Env Variables

Rename the `example.env` file to `.env` and add the following

```
NODE_ENV = development
PORT = 5000
MONGO_URI = Your mongodb URI
JWT_SECRET = Your secret Key
PAYPAL_CLIENT_ID = Your paypal client id
```

### Run

```
# Run frontend (:3000) & backend (:5000)
npm run dev

# Run backend only
npm run server
```

### Build & Deploy

```
# Create frontend prod build
cd frontend
npm run build
```

### Seed Database

You can use the following commands to seed the database with some sample users and items as well as destroy all data

<h6>You can create your account too</h6>

```
# Import data
npm run data:import

# Destroy data
npm run data:destroy
```

```
Sample User Logins

- Admin
admin@email.com
123456

- Customer
kanoa@email.com@email.com
123456

shohei@email.com
123456
```
