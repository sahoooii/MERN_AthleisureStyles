# Athleisure Styles <br />MERN E-Commerce Platform

![Mongo DB](https://img.shields.io/badge/mongodb-00800?style=for-the-badge&logo=mongodb&logoColor=white)
![Express](https://img.shields.io/badge/Express-000?style=for-the-badge&logo=express&logoColor=ff0)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Node.js](https://img.shields.io/badge/node.js-339933?style=for-the-badge&logo=node.js&logoColor=ff0)
<br />
![Redux](https://img.shields.io/badge/redux-764ABC?style=for-the-badge&logo=redux&logoColor=white)
![PayPal](https://img.shields.io/badge/paypal-00457C?style=for-the-badge&logo=paypal&logoColor=white)
![Cloudinary](https://img.shields.io/badge/cloudinary-3448C5?style=for-the-badge&logo=cloudinary&logoColor=fff)
![Material UI](https://img.shields.io/badge/material_ui-000?style=for-the-badge&logo=mui&logoColor=007FFF)
![Motion](https://img.shields.io/badge/Motion-0055ff?style=for-the-badge&logo=framer&logoColor=white)
![Axios](https://img.shields.io/badge/axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white)
![Formik](https://img.shields.io/badge/formik-4285F4?style=for-the-badge&logo=formik&logoColor=white)
![Yup](https://img.shields.io/badge/yup-E2B714?style=for-the-badge&logo=yup&logoColor=white)

<p>etc...</p>

## Link

### Athleisure Styles

[▶️ Render only version (slower)](https://athleisurestyles.onrender.com)

[✅ Vercel + Render version (optimized)](https://mern-athleisure-styles.vercel.app)

### Mobile Version. Shopping Process

![mobile](https://github.com/user-attachments/assets/706f0f3f-4bae-4beb-b313-2d7838e461fa)

## DEMO PC Ver. Shopping Process

![pc](https://github.com/sahoooii/MERN_AthleisureStyles/assets/75118062/def87834-d35c-4f06-915e-770f436f0826)

### PC Version. Menu (User, Order History, Wishlist...)

![withMenu](https://github.com/sahoooii/MERN_AthleisureStyles/assets/75118062/3efe10f0-88ca-411c-968f-5a68f7366d81)

## What is this project?

**(EN)**

This project is a full-stack eCommerce platform built with the **MERN stack, Redux, and Material UI**. It is my first original MERN stack project, and I spent nearly six months developing it.

When I started, I wasn't familiar with Material UI, which made the design process quite challenging. However, I put a lot of effort into refining the UI/UX and ensuring a fully responsive design.

The store is called **Athleisure Styles**, inspired by the fusion of sportswear and fashion. This platform includes full CRUD functionality for features like product reviews, a wishlist, and order history. Additionally, it supports PayPal and credit/debit card payments for a complete shopping experience.
<br />
<br />

**(JP)**

**MERN スタック、Redux、Material UI** を使用して構築した e コマースプラットフォームです。MERN スタックを使った初めてのオリジナル作品であり、Material UI を初めて採用したプロジェクトでもあったため、設計プロセスには多くの試行錯誤がありました。しかし、約半年かけて構想から完成まで作り上げました。

コンセプトは、スポーツウェアとファッションを融合させ、日常でもおしゃれに着こなせるスタイルを提案すること。
<br />
そのテーマに基づき、「Athleisure Styles」という名前をつけました。

このプラットフォームには、商品レビュー、ウィッシュリスト、注文履歴の管理などの完全な CRUD 機能を搭載。さらに、PayPal やクレジット/デビットカード決済にも対応し、実際のオンラインショッピングのような体験ができます。

## Features

**(EN)**

✅ **Home Page**

- Interactive carousel
- Tab sections: "Most Reviewed" & "Top Rated"
- Category-based item filtering

✅ **Shopping & Reviews**

- Search items by keyword
- Leave, and delete item reviews & ratings
- Full-featured shopping cart with quantity control
- Pagination for item lists

✅ **Checkout & Payments**

- Step-by-step checkout process (Billing, Shipping, Payment, etc...)
- PayPal / Credit Card payment integration

✅ **User Features (🆕 additions)**

- Register & edit profile (with profile image upload)
- View order history & order details
- Add & remove items from Wishlist
  - 🆕 Mobile-friendly wishlist interaction with toast feedback
  - 🆕 Profile image and item image uploads via Cloudinary

✅ **Admin Management**

- User management (create, edit, delete users)
- Items management (create, edit, delete items)
- Manage item reviews
- View order details & mark orders as delivered

✅ **Database & Backend (🆕 additions)**

- Database seeder for initial items & users
- 🆕 Improved performance through split deployment (Vercel + Render)
- 🆕 Cookie-based authentication for secure cross-domain access

**(JP)**

✅ **ホームページ**

- インタラクティブなカルーセル
- タブ切り替え：「レビュー数が多い商品」「高評価の商品」
- カテゴリ別の商品フィルタリング表示
- 🆕 Cloudinary による画像アップロード機能（プロフィール・商品画像）

✅ **ショッピング & レビュー**

- キーワード検索機能
- 商品のレビュー・評価の投稿、削除
- 商品の数量調整が可能なショッピングカート
- 商品リストのページネーション
- 🆕 レビュー件数の単数・複数に応じた表示調整（Review/Reviews）

✅ **チェックアウト & 決済**

- ステップごとのチェックアウト（支払い情報、配送情報、支払い方法など）
- PayPal / クレジットカード決済対応

✅ **ユーザー機能**

- プロフィール登録 & 編集（プロフィール画像アップロード対応）
- 注文履歴 & 注文詳細ページの閲覧
- 🆕 モバイル端末での Wishlist 操作の UI 改善（hover 制限 + toast 表示対応）
- 🆕 認証方式を localStorage から Cookies に変更（セキュアなログイン保持）

✅ **管理者機能(Admin)**

- ユーザー管理（登録・編集・削除）
- 商品の管理（登録・編集・削除）
- レビューの管理
- 注文詳細の閲覧 & 配送完了ステータス管理

✅ **データベース & バックエンド**

- 初期データ（商品 & ユーザー）のシード機能
- 🆕 Cloudinary と Multer を用いた画像アップロードの統合
- 🆕 Vercel (Frontend) と Render (Backend) に分けてデプロイ（コールドスタート対策）

## What's Improved? 🧐

**(EN)**

After the initial development, I made several improvements to enhance **security, performance, and design**:

- **🔒 Security Enhancements**

  - Added **CORS settings** enhance security
  - Implemented proper error handling with **try-catch** blocks in missing areas

- **🎨 UI/UX Improvements**

  - Adjusted font sizes and icons for better readability, especially on mobile
  - Enhanced animations:
    - Fixed and refined the search input close animation
    - Improved sidebar animations for a smoother and lighter experience
    - Optimized animations based on device type (mobile vs. non-mobile)

- **⚡ Performance Optimization**
  - **Order history & wishlist** sorting: Changed from ascending to descending order so that the latest items appear first
  - Improved button consistency & accessibility:
    - Enlarged icons and buttons for better usability, especially on mobile
    - Adjusted the "Shop Now" button to be more accessible

**(JP)**

最初の開発後、**セキュリティ、パフォーマンス、デザイン**を向上させるために以下の改善を行いました：

- **🔒 セキュリティの強化**

  - セキュリティ向上のため CORS 設定を追加
  - try-catch を追加し、適切なエラーハンドリングを実装

- **🎨 UI/UX Improvements**

  - フォントサイズやアイコンを調整し、特にモバイルでの視認性を向上
  - アニメーションの強化
    - サーチインプットの閉じる際のアニメーションを修正・改善
    - サイドバーのアニメーションをスムーズ＆軽量化
    - **端末に応じたアニメーション最適化**（モバイルと PC で異なる種類のアニメーションを適用）

- **⚡ パフォーマンスの最適化**
  - リストの並び順を改善
    - **注文履歴**や**ウィッシュリスト**を降順に変更（最新のものが先に表示されるように）
  - ボタンの一貫性と操作性の向上
    - アイコンやボタンを大きくし、押しやすく調整(特にモバイル)
    - 「Shop Now」ボタンのサイズを調整し、よりアクセスしやすく

## 📌 Recent Updates (2025/04/09)

**(EN)**

- ✅ **Split Deployment: Frontend (Vercel) / Backend (Render)**

  - To reduce cold start time and improve performance, the app was redeployed with the frontend hosted on Vercel and the backend on Render.
  - Compare:
    - [▶️ Render only version (slower)](https://athleisurestyles.onrender.com)
    - [✅ Vercel + Render version (optimized)](https://mern-athleisure-styles.vercel.app)

- ✅ **Authentication now handled via Cookies instead of localStorage**

  - Switching to cookies resolved cross-domain issues in a split-deploy environment.
  - Secure and SameSite attributes are dynamically adjusted depending on environment to ensure stable login/registration.

- ✅ **Image storage migrated to Cloudinary**

  - Profile and item images are now uploaded to Cloudinary instead of being saved locally.
  - This ensures image persistence even after deployment.

- ✅ **Improved Wishlist behavior on mobile devices**

  - Fixed an issue where wishlist removal didn’t reflect immediately on mobile devices due to missing re-render triggers.
  - Added toast notifications for clear visual feedback after adding/removing items.

- ✅ **Dynamic review count labels**
  - Previously, “1 reviews” was incorrectly shown for singular values.
  - A new utility now dynamically switches between “review” and “reviews” for correct grammar.

**(JP)**

- ✅ **Frontend (Vercel) / Backend (Render) の分離デプロイ**

  - Render のみでホスティングしていた場合に発生していた初回読み込みの遅延（コールドスタート）を改善、パフォーマンスと安定性を両立

    - [▶️ Render のみのデプロイ版](https://athleisurestyles.onrender.com)
    - [✅ Vercel + Render 分離デプロイ版（推奨）](https://mern-athleisure-styles.vercel.app)

- ✅ **認証情報の保存を LocalStorage から Cookie に変更**

  - フロントエンドとバックエンドを別ドメインでデプロイしたことにより、Cookie が渡らず認証が通らない問題が発生
  - Secure / SameSite の設定を動的に切り替えることで、デバイスや環境に関係なく安定したログイン/登録フローを実現

- ✅ **画像管理をローカルから Cloudinary に移行**

  - Cloudinary を導入し、ローカル保存からクラウド保存へ変更
  - デプロイ後の環境でもプロフィール画像や商品画像のアップロードが可能に

- ✅ **Wishlist 操作のモバイル対応強化**

  - モバイルデバイスでは Wishlist の削除操作が即時反映されない不具合を修正
  - タッチ操作後に toast 通知を表示することで、追加/削除のフィードバックを明確に

- ✅ **レビュー数の表示ロジックを改善**

  - 「1 reviews」のような不自然な表示を回避
  - レビュー数を単数/複数で出し分けるユーティリティを共通化して実装

## Usage 🚀

### 1. Setup

#### 📌 Required Accounts

- **MongoDB Atlas**: Create a database and obtain your MongoDB URI →&nbsp; [ Sign up](https://www.mongodb.com/cloud/atlas/register)
- **PayPal Developer**: Create an account and obtain your Client ID → &nbsp; [ Sign up](https://developer.paypal.com/home)
- **Cloudinary**: For image uploads → &nbsp; [ Sign up](https://cloudinary.com/)

<br />

### 🔧 Environment Variables

Rename `example.env` on Root directory to `.env` and add your credentials:

```
NODE_ENV = development
PORT = 5000

MONGO_URI = your_mongodb_uri

JWT_SECRET = your_secret_key
PAYPAL_CLIENT_ID = your_paypal_sandbox_client_id

🆕
CLOUDINARY_CLOUD_NAME=ADD_YOUR_CLOUDINARY_CLOUD_NAME
CLOUDINARY_API_KEY=ADD_YOUR_CLOUDINARY_API_KEY
CLOUDINARY_API_SECRET=ADD_YOUR_CLOUDINARY_API_SECRET

```

🆕 When split Deployment: Frontend (Vercel) / Backend (Render), add your backend URL. <br />
Rename `example.env` on frontend directory to `.env` and add your credentials:

```
REACT_APP_BACKEND_URL=ADD_YOUR_RENDER_BACKEND_URL
```

### 2. Run the Application Setup

```
# Run frontend (:3000) & backend (:5000)
npm run dev

# Run backend only
npm run server
```

### 3. Build & Deploy

```
# Create frontend production build
cd frontend
npm run build
```

### 4. Seed Database

You can pre-populate the database with sample users and items.

```
# Import sample data
npm run data:import

# Delete all data
npm run data:destroy
```

### ➡️ You can also create your own account manually.

#### 📌 Sample Logins

| Role  | Email            | Password |
| ----- | ---------------- | -------- |
| Admin | admin@email.com  | 123456   |
| User1 | kanoa@email.com  | 123456   |
| User2 | shohei@email.com | 123456   |

### 5. PayPal Test Payments 💳

To test the checkout process, follow these steps:

#### 1. Log in to [ PayPal Developer ](https://developer.paypal.com/home) with your account

#### 2. Go to Testing Tools → Sandbox Accounts

#### 3. Use the Personal (buyer) sandbox email & password for checkout

➡️ This allows you to simulate payments without real transactions.

<br />

## 📘 Development Notes

**(EN)**

This project went through several iterations of improvement and troubleshooting over the course of about a month.<br />
Along the way, I focused on enhancing performance, scalability, and cross-device compatibility.

**Key areas of improvement included:**

- Refactoring the backend/frontend to be deployed separately (Render + Vercel) to reduce cold start issues.
- Replacing localStorage with cookie-based authentication to ensure secure, cross-origin login between domains.
- Switching from local image storage to **Cloudinary** to support image uploads in production environments.
- Improving mobile user experience by fixing touch feedback issues on wishlist buttons.
- Minor UI/UX improvements such as pluralization fixes for the review count (1 Review vs 2 Reviews).

These refinements were not just technical upgrades—they were also valuable learning moments that strengthened my full-stack development skills. 🚀

**(JP)**

このプロジェクトは約 1 ヶ月間にわたってリファクタリングや不具合対応を重ね、
**パフォーマンス・拡張性・デバイス対応**の改善に取り組みました。

**主な改善点：**

- **Render × Vercel** による分離デプロイで、コールドスタート問題を解消
- **localStorage**から**Cookie**ベースの認証に変更し、クロスドメインでも安定したログイン処理を実現
- ローカル保存していた画像管理を**Cloudinary**に移行し、デプロイ環境でも画像アップロードに対応
- Wishlist ボタンの挙動を改善し、モバイルでのタッチ操作でもスムーズに動作するように修正し、toast 通知を表示することで、フィードバックを明確化
- 「1 reviews」などの不自然な表示を「1 review」「2 reviews」に切り替える細かい UI 調整し、コンポーネント化

技術的な成長だけでなく、多くの実践的な学びが詰まったリファクタリング期間でした。💪
