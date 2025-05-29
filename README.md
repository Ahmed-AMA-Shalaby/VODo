# [VODo](https://vodo-aamas.vercel.app/) 🎬

VODo is your go-to app for discovering awesome TV shows!

Explore a huge variety of series, search for your favorites, and enjoy a seamless experience on any device. Finding your next binge-worthy show has never been easier or more fun! 📺🍿

<div align="center">
    <a href="https://vodo-aamas.vercel.app/" target="_blank"><img src="https://vodo-aamas.vercel.app/favicon.ico" alt="VODo Logo" width="150" height="150"></a>
</div>

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [Setup & Installation](#setup--installation)
- [Running Tests](#running-tests)


## Features
- **Browse TV Shows** - Displays a list of TV shows and search for specific ones.
- **Show Details Page** - View show information and episodes.
- **Episode Details Page** - See episode-specific details with navigation.
- **Responsive UI** - Optimized for both desktop and mobile.
- **Server-Side Rendering (SSR)** - Enhances performance and SEO.
- **Unit Tests** - Ensures core functionality works correctly.

## Technologies Used

<div align="center">
    <a href="https://nodejs.org/" target="_blank"><img src="https://img.icons8.com/color/48/000000/nodejs.png" alt="Next.js Logo" width="50" height="50"></a>
    <a href="https://nextjs.org/" target="_blank"><img src="https://nextjs.org/favicon.ico" alt="Next.js Logo" width="50" height="50"></a>
    <a href="https://www.typescriptlang.org/" target="_blank"><img src="https://www.typescriptlang.org/favicon.ico" alt="Typescript Logo" width="50" height="50"></a>
    <a href="https://eslint.org/" target="_blank"><img src="https://eslint.org/favicon.ico" alt="ESlint Logo" width="50" height="50"></a>
    <a href="https://prettier.io/" target="_blank"><img src="https://prettier.io/icon.png" alt="ESlint Logo" width="50" height="50"></a>
    <a href="https://vitest.dev/" target="_blank"><img src="https://vitest.dev/favicon.ico" alt="ESlint Logo" width="50" height="50"></a>
    <a href="https://www.tvmaze.com/api" target="_blank"><img src="https://static.tvmaze.com/images/favico/favicon-32x32.png" alt="TVMaze API Logo" width="50" height="50"></a>
    <a href="https://vercel.com/" target="_blank"><img src="https://vercel.com/favicon.ico" alt="Vercel Logo" width="50" height="50"></a>
</div>

- **Node.js**: v20.x.x
- **Framework**: Next.js
- **Language**: Typescript
- **Linting**: ESLint
- **Formatting**: Prettier
- **Unit Testing**: Vitest
- **Content REST API**: TVmaze API
- **Hosting**: Vercel

## Project Structure

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
│   ├── utils/
│   │   ├── SearchContext.tsx       # Context for shows search 
```

## Setup & Installation

1. **Clone the Repository**
    ```sh
    git clone https://github.com/Ahmed-AMA-Shalaby/VODo.git
    cd vodo
    ```

2. **Install Dependencies**
    ```sh
    npm install
    ```

3. **Run the Application**
    ```sh
    npm run dev
    ```

The app will be available at http://localhost:3000


## Running Tests

#### To run unit tests:
```sh
npm test
```