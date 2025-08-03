# OpenMusic API v1

RESTful API untuk pengelolaan data musik dengan fitur Albums dan Songs menggunakan Node.js, Hapi.js, dan PostgreSQL.

## 🚀 Fitur

- **Albums Management**: CRUD operations untuk album
- **Songs Management**: CRUD operations untuk lagu dengan filtering
- **Database Relations**: Relasi antara albums dan songs
- **Input Validation**: Validasi menggunakan Joi schema
- **Error Handling**: Custom error classes dengan proper HTTP status codes
- **Environment Configuration**: Konfigurasi melalui environment variables
- **Code Quality**: ESLint untuk konsistensi code style
- **Documentation**: Comprehensive JSDoc documentation

## 📋 Prerequisites

- Node.js (v14 atau lebih tinggi)
- PostgreSQL Server (v12 atau lebih tinggi)
- npm atau yarn

## 🛠️ Installation

1. **Clone repository**
   ```bash
   git clone https://github.com/NaufalArsyaputraPradana/openmusic-api-v1
   cd openmusic-api-v1
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Setup environment variables**
   
   Buat file `.env` di root directory:
   ```env
   HOST=localhost
   PORT=5000
   PGUSER=postgres
   PGPASSWORD=your_password
   PGDATABASE=openmusic
   PGHOST=localhost
   PGPORT=5432
   ```

4. **Setup database**
   
   Buat database PostgreSQL:
   ```sql
   CREATE DATABASE openmusic;
   ```

5. **Run migrations**
   ```bash
   npm run migrate
   ```

6. **Start server**
   ```bash
   # Development
   npm run start-dev
   
   # Production
   npm start
   ```

## 📚 API Endpoints

### Albums

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/albums` | Tambah album baru |
| GET | `/albums/{id}` | Dapatkan album by ID |
| PUT | `/albums/{id}` | Update album by ID |
| DELETE | `/albums/{id}` | Hapus album by ID |

### Songs

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/songs` | Tambah lagu baru |
| GET | `/songs` | Dapatkan semua lagu |
| GET | `/songs/{id}` | Dapatkan lagu by ID |
| PUT | `/songs/{id}` | Update lagu by ID |
| DELETE | `/songs/{id}` | Hapus lagu by ID |

## 🔍 Query Parameters

### GET /songs
- `title` (optional): Filter berdasarkan judul lagu
- `performer` (optional): Filter berdasarkan performer

Contoh: `/songs?title=fix&performer=coldplay`

## 📊 Request/Response Examples

### POST /albums
**Request:**
```json
{
  "name": "Viva la Vida",
  "year": 2008
}
```

**Response:**
```json
{
  "status": "success",
  "message": "Album berhasil ditambahkan",
  "data": {
    "albumId": "album-Mk8AnmCp210PwT6B"
  }
}
```

### POST /songs
**Request:**
```json
{
  "title": "Viva la Vida",
  "year": 2008,
  "genre": "Alternative Rock",
  "performer": "Coldplay",
  "duration": 242,
  "albumId": "album-Mk8AnmCp210PwT6B"
}
```

**Response:**
```json
{
  "status": "success",
  "message": "Lagu berhasil ditambahkan",
  "data": {
    "songId": "song-A23ycQrF3c6XwPiX"
  }
}
```

### GET /albums/{id}
**Response:**
```json
{
  "status": "success",
  "data": {
    "album": {
      "id": "album-Mk8AnmCp210PwT6B",
      "name": "Viva la Vida",
      "year": 2008,
      "songs": [
        {
          "id": "song-A23ycQrF3c6XwPiX",
          "title": "Viva la Vida",
          "performer": "Coldplay"
        }
      ]
    }
  }
}
```

## 🗄️ Database Schema

### Albums Table
```sql
CREATE TABLE albums (
  id VARCHAR(50) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  year INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### Songs Table
```sql
CREATE TABLE songs (
  id VARCHAR(50) PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  year INT NOT NULL,
  genre VARCHAR(100) NOT NULL,
  performer VARCHAR(255) NOT NULL,
  duration INT,
  album_id VARCHAR(50),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (album_id) REFERENCES albums(id) ON DELETE SET NULL
);
```

## 🛡️ Error Handling

API menggunakan consistent error format:

**Client Error (400):**
```json
{
  "status": "fail",
  "message": "Error message"
}
```

**Not Found (404):**
```json
{
  "status": "fail",
  "message": "Resource tidak ditemukan"
}
```

**Server Error (500):**
```json
{
  "status": "error",
  "message": "terjadi kegagalan pada server kami"
}
```

## 📁 Project Structure

```
openmusic-api-v1/
├── migrations/               # Database migrations
├── src/
│   ├── albums/              # Albums module
│   │   ├── handler.js       # Request handlers
│   │   ├── index.js         # Plugin registration
│   │   ├── routes.js        # Route definitions
│   │   ├── service.js       # Business logic
│   │   └── validator.js     # Input validation
│   ├── songs/               # Songs module
│   │   ├── handler.js
│   │   ├── index.js
│   │   ├── routes.js
│   │   ├── service.js
│   │   └── validator.js
│   ├── exceptions/          # Custom error classes
│   │   ├── ClientError.js
│   │   ├── InvariantError.js
│   │   └── NotFoundError.js
│   └── utils/
│       └── mapDBToModel.js  # Database mapping utilities
├── .env                     # Environment variables
├── .migrationrc.json        # Migration configuration
├── package.json
└── server.js               # Application entry point
```

## 🧪 Available Scripts

- `npm start` - Run production server
- `npm run start-dev` - Run development server with nodemon
- `npm run migrate` - Run database migrations
- `npm run migrate-down` - Rollback migrations

## 📋 Validation Rules

### Album Payload
- `name`: Required string
- `year`: Required integer (1900 - current year)

### Song Payload
- `title`: Required string
- `year`: Required integer (1900 - current year)
- `genre`: Required string
- `performer`: Required string
- `duration`: Optional integer (>= 0)
- `albumId`: Optional string

## 🔧 Technology Stack

- **Framework**: Hapi.js v21.4.0
- **Database**: PostgreSQL with pg driver
- **Validation**: Joi v17.13.3
- **Environment**: dotenv v17.2.1
- **Migration**: node-pg-migrate v8.0.3
- **ID Generation**: nanoid v5.1.5

## 📄 License

ISC License

## 👨‍💻 Development

Untuk development, gunakan:
```bash
npm run start-dev
```

Server akan restart otomatis ketika ada perubahan file.
