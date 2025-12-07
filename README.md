# Movie & Series Streaming Platform

A modern, full-featured streaming application built with **Laravel 12** and **React 18** (via Inertia.js). This project provides a robust backend API and a dynamic frontend for browsing, searching, and streaming movies and TV series.

![Laravel](https://img.shields.io/badge/Laravel-FF2D20?style=for-the-badge&logo=laravel&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)

## 🚀 Features

### 🎬 Content Management
- **Movies & Series:** Comprehensive database of movies and TV shows with detailed metadata.
- **TMDB Integration:** Automated data fetching from The Movie Database (TMDB) for easy content population.
- **Genres & Persons:** Categorize content and manage cast/crew information.
- **Seasons & Episodes:** Full support for episodic content structure.

### 👤 User Experience
- **Authentication:** Secure login/registration via Laravel Sanctum, including Telegram Mini App auto-login.
- **Watch History:** Track viewing progress and "Continue Watching" functionality.
- **Ratings & Reviews:** Users can rate content (star rating) and write reviews.
- **Profile Management:** Update user details, password, and VIP status redemption.
- **Search & Discovery:** Advanced search, trending lists, and genre filtering.

### 🛠 Admin Panel
- **Dashboard:** Overview of platform statistics (Movies, Series, Users, etc.).
- **Content CRUD:** Full management of all content types.
- **Link Management:** Manage streaming and download links.
- **TMDB Tools:** Search and import content directly from the admin interface.

### 📡 API & Streaming
- **RESTful API:** Fully documented API for external clients (Mobile apps, etc.).
- **Streaming Proxy:** Secure proxying of video streams and downloads.
- **Swagger UI:** Interactive API documentation available at `/api/documentation`.

---

## 🛠 Tech Stack

- **Backend:** Laravel 12, PHP 8.2+
- **Frontend:** React 18, Inertia.js, Tailwind CSS 3.2+
- **Build Tool:** Vite 7
- **Database:** MySQL / Pgsql
- **Authentication:** Laravel Sanctum
- **External APIs:** TMDB, Telegram Bot API

---

## ⚙️ Prerequisites

Ensure you have the following installed on your system:
- **PHP** >= 8.2
- **Composer**
- **Node.js** & **NPM**
- **MySQL** (or use SQLite)

---

## 📥 Installation

1.  **Clone the repository**
    ```bash
    git clone <repository-url>
    cd movie-react-api-client
    ```

2.  **Install PHP dependencies**
    ```bash
    composer install
    ```

3.  **Install Node.js dependencies**
    ```bash
    npm install
    ```

4.  **Environment Setup**
    Copy the example environment file and configure your database and API keys.
    ```bash
    cp .env.example .env
    ```
    *Update `.env` with your DB credentials, TMDB API key, and other settings.*

5.  **Generate Application Key**
    ```bash
    php artisan key:generate
    ```

6.  **Run Migrations**
    Set up the database schema.
    ```bash
    php artisan migrate
    ```

7.  **Build Frontend Assets**
    ```bash
    npm run build
    ```

---

## 🚀 Usage

### Development Server
To run the application locally with hot-reloading:

1.  **Start the Laravel server:**
    ```bash
    php artisan serve
    ```

2.  **Start the Vite development server (in a new terminal):**
    ```bash
    npm run dev
    ```

Access the application at `http://localhost:8000`.

### Admin Access
Access the admin panel at `http://localhost:8000/admin/dashboard`.
*(Ensure you have an admin user created in your database)*.

---

## 📚 API Documentation

The project includes auto-generated Swagger documentation.

- **UI URL:** `http://localhost:8000/api/documentation`
- **JSON Spec:** `http://localhost:8000/docs`

### Key Endpoints

#### Public
- `GET /api/movies` - List movies
- `GET /api/movies/trending` - Get trending movies
- `GET /api/series` - List series
- `GET /api/search` - Search content

#### Protected (Requires Bearer Token)
- `GET /api/user` - Get current user
- `GET /api/watch-history` - Get user watch history
- `POST /api/watch-history/progress` - Update viewing progress
- `GET /api/movies/{slug}/stream` - Get streaming links

---

## 📂 Project Structure

```
├── app/
│   ├── Http/Controllers/   # API, Web, and Admin Controllers
│   ├── Models/             # Eloquent Models (Movie, Series, Review, etc.)
│   └── Services/           # Business logic (TmdbService, etc.)
├── database/
│   ├── migrations/         # Database schema definitions
│   └── seeders/            # Data seeders
├── resources/
│   ├── js/
│   │   ├── Components/     # Reusable React components
│   │   ├── Layouts/        # Page layouts (Authenticated, Guest)
│   │   ├── Pages/          # Inertia.js Pages (Admin, Public, User)
│   │   └── app.jsx         # Main entry point
│   └── views/              # Blade templates (mostly for root HTML)
├── routes/
│   ├── api.php             # API Routes
│   └── web.php             # Web Routes (Inertia)
└── tests/                  # Automated tests
```

## 🤝 Contributing

1.  Fork the repository.
2.  Create a new feature branch (`git checkout -b feature/amazing-feature`).
3.  Commit your changes (`git commit -m 'Add some amazing feature'`).
4.  Push to the branch (`git push origin feature/amazing-feature`).
5.  Open a Pull Request.

## 📄 License

The Laravel framework is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).
