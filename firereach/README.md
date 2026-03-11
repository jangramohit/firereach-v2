# FireReach - Autonomous Outreach Engine

An autonomous AI SDR system that takes a single prompt (Ideal Customer Profile), discovers a matching company, captures real growth signals via web scraping, formulates an account brief, and automatically sends a personalized outreach email.

## Local Setup

### 1. Backend
1. `cd backend`
2. Create virtual environment: `python3 -m venv venv && source venv/bin/activate`
3. Install dependencies: `pip install -r requirements.txt`
4. Copy `.env.example` to `.env` and fill in your Gemini API Key and SMTP credentials.
5. Setup your `.env` like this:
   ```env
   GEMINI_API_KEY=your_key_here
   SMTP_SERVER=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USERNAME=your_gmail@gmail.com
   SMTP_PASSWORD=your_gmail_app_password
   SENDER_EMAIL=your_gmail@gmail.com
   ```
6. Run the server: `uvicorn main:app --reload --host 0.0.0.0 --port 8000`

### 2. Frontend
1. `cd frontend`
2. Install dependencies: `npm install`
3. Run the development server: `npm run dev`
4. Access the dashboard at `http://localhost:5173`.

---

### Deploying the Backend (Render / Railway)

**Render**
1. Create a new **Web Service**.
2. Connect your GitHub repository: `https://github.com/jangramohit/firereach-v2.git`
3. Set **Root Directory** to `firereach/backend`.
4. **Build Command**: `pip install -r requirements.txt`
5. **Start Command**: `uvicorn main:app --host 0.0.0.0 --port $PORT`
6. Add Environment Variables: `GEMINI_API_KEY`, `SMTP_PASSWORD`, etc.

### Deploying the Frontend (Vercel / Netlify)
1. Import the repository in Vercel.
2. Set **Root Directory** to `firereach/frontend`.
3. Vercel will auto-detect Vite.
4. Add **Environment Variable**: `VITE_API_URL` set to your live Render backend URL.
5. Deploy!
