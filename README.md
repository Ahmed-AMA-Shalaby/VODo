# VODo - Your Streaming Hub 🎬

VODo is a web application built with **Next.js 15** that allows users to browse TV shows and view episode details. The data is fetched from the **TVMaze API**, and the project follows **best practices** for performance, scalability, and maintainability.

---

## 🚀 Features
- **Browse TV Shows** - Displays a list of TV shows.
- **Show Details Page** - View show information and episodes.
- **Episode Details Page** - See episode-specific details with navigation.
- **Responsive UI** - Optimized for both desktop and mobile.
- **Server-Side Rendering (SSR)** - Enhances performance and SEO.
- **Unit Tests** - Ensures core functionality works correctly.

---

## 📂 Project Structure, Setup & Installation, and Running Tests


```
VODo/
├── app/
│   ├── shows/
│   │   ├── [showId]/
│   │   │   ├── episodes/
│   │   │   │   ├── [episodeId]/
│   │   │   │   │   ├── index.tsx   # Episode Details Page
│   │   │   ├── index.tsx           # Show Details Page
│   │   ├── page.tsx                # Shows Page
│── shared/
│   ├── assets/                     # Placeholder images and static assets
│   ├── components/
│   │   ├── EpisodeCard.tsx         # Reusable episode card component
│   ├── models/
│   │   ├── episode.ts              # Episode Type
│   │   ├── show.ts                 # Show Type
│   ├── services/
│   │   ├── index.ts                # API Fetching Logic
```

---

### 🛠️ Setup & Installation

#### 1️⃣ Clone the Repository
```sh
git clone https://github.com/Ahmed-AMA-Shalaby/VODo.git

cd vodo
```

#### 2️⃣ Install Dependencies
```sh
npm install
```

#### 3️⃣ Run the Application
```sh
npm run dev
```

The app will be available at http://localhost:3000

---

🧪 Running Tests

#### To run unit tests:
```sh
npm test
```