## Getting Started

Vercel Deploy: [MoviesNextJS](https://movies-next-js-six.vercel.app/)

### Technologies Used

- [**Next.js**](https://nextjs.org/)
- [**TypeScript**](https://www.typescriptlang.org/)
- [**Tailwind CSS**](https://tailwindcss.com/)
- [**DaisyUI**](https://daisyui.com/)

### Prerequisites

Ensure you have the following installed on your development machine:
- Node.js (v20.x or later)
- npm, yarn, pnpm, or bun (depending on your preference)

### Installation

First, install the project dependencies:

```bash
# Using npm
npm install

# Using yarn
yarn install

# Using pnpm
pnpm install

# Using bun
bun install
```

### Development Setup

Once the dependencies are installed, run the development server:

```bash
# Using npm
npm run dev

# Using yarn
yarn dev

# Using pnpm
pnpm dev

# Using bun
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Environment Variables

You need to create a `.env` file in the root of the project and add the following variables:

```env
NEXT_PUBLIC_TMDB_PUBLIC_KEY=
NEXT_PUBLIC_TMDB_PUBLIC_BASE_URL=https://api.themoviedb.org/3
NEXT_PUBLIC_TMDB_PUBLIC_IMAGE_BASE_URL=https://media.themoviedb.org/t/p/w220_and_h330_bestv2
NEXT_PUBLIC_API_PUBLIC_BASE_URL=
```

- `NEXT_PUBLIC_TMDB_PUBLIC_KEY`: Your API key from [The Movie Database](https://www.themoviedb.org/documentation/api)
- `NEXT_PUBLIC_TMDB_PUBLIC_BASE_URL`: The base URL for TMDB API
- `NEXT_PUBLIC_TMDB_PUBLIC_IMAGE_BASE_URL`: The base URL for TMDB images
- `NEXT_PUBLIC_API_PUBLIC_BASE_URL`: The base URL for your API [Movies API](https://github.com/igorcardosoy/MovieJsonServerAPI)

### Admin Login for [Movies API](https://github.com/igorcardosoy/MovieJsonServerAPI)

Use the following credentials to log in as an admin:

```bash
email: email@email.com
password: 12345678
```


