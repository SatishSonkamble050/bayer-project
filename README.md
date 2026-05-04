# 📦 Image Upload & Batch Management System (Full Stack)

A full-stack application that allows users to upload images directly to AWS S3 using presigned URLs, store metadata in a database, and manage image batches.

---

## 🚀 Tech Stack

### 🔹 Frontend

* Next.js (React)
* Tailwind CSS

### 🔹 Backend

* FastAPI
* SQLAlchemy
* PostgreSQL / MySQL / SQLite
* AWS S3 (Boto3)

---

## 📁 Project Structure

```bash
project-root/
│
├── backend/
│   ├
│   │── main.py
│   │── core/
│   │── db/
│   │── models/
│   │── schemas/
│   │── services/
│   │── routers/
│   │── utils/
│   ├── requirements.txt
│   └── .env
│
├── frontend/
│   ├── app/ or pages/
│   ├── components/
│   ├── services/
│   ├── package.json
│
└── README.md
```

---

# ⚙️ Backend Setup (FastAPI)

## 1️⃣ Navigate to Backend

```bash
cd backend
```

---

## 2️⃣ Create Virtual Environment

```bash
python -m venv venv
source venv/bin/activate      # Mac/Linux
.venv/Scripts/activate         # Windows
```

---

## 3️⃣ Install Dependencies

```bash
pip install -r requirements.txt
```

---

## 4️⃣ Environment Variables

Create `.env` file inside `backend/`:

```env
AWS_ACCESS_KEY_ID=your_access_key
AWS_SECRET_ACCESS_KEY=your_secret_key
AWS_REGION=ap-south-1
AWS_S3_BUCKET=your-bucket-name

DATABASE_URL=sqlite:///./test.db
```

---

## 5️⃣ Run Backend Server

```bash
uvicorn main:app --reload
```

👉 Backend URL:
http://127.0.0.1:8000

👉 Swagger Docs:
http://127.0.0.1:8000/docs

---

# 💻 Frontend Setup (Next.js)

## 1️⃣ Navigate to Frontend

```bash
cd frontend
```

---

## 2️⃣ Install Dependencies

```bash
npm install
```

---

## 4️⃣ Run Frontend

```bash
npm run dev
```

👉 Frontend URL:
http://localhost:3000

---

# 🔄 Application Flow

```text
1. User selects images in frontend
2. Frontend calls backend → generate presigned URL
3. Frontend uploads image directly to AWS S3
4. Frontend sends uploaded image URLs to backend
5. Backend stores image metadata in database
6. Frontend fetches batches & displays images
```

---

# 📡 API Endpoints

## 🔹 Generate Upload URL

```
POST /images/generate-upload-url
```

## 🔹 Save Images

```
POST /images/save-images
```

## 🔹 Get All Batches

```
GET /images/batches?page=1&limit=10
```

## 🔹 Get Single Batch

```
GET /images/batches/{batch_id}
```

---

# ⚠️ Important Notes

* Images are uploaded **directly to AWS S3**
* Signed URL expires in **5 minutes**
* Backend only stores metadata (not files)
* Always call `/save-images` after upload

---

# 🛠️ Future Improvements

* Authentication (JWT)
* Image delete API
* Retry mechanism (S3 + DB consistency)
* Upload progress bar
* Large file upload optimization (multi-part upload)
* CDN integration (CloudFront)

---

# 🧪 Testing

* Backend: Swagger (`/docs`)
* Frontend: Browser UI

---
