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

## Deployment Instructions

### Deploying the Backend (Render / Railway)

**Render**
1. Create a new **Web Service**.
2. Connect your GitHub repository linking to the `backend` folder as the root.
3. Build Command: `pip install -r requirements.txt`
4. Start Command: `uvicorn main:app --host 0.0.0.0 --port $PORT`
5. Add all Environment Variables matching your `.env` file to the Render dashboard.

**Railway**
1. Create a new project and select "Deploy from Github repo".
2. Set the Root Directory to `/backend`.
3. Railway will auto-detect Python. 
4. Add your Environment variables in the Railway settings.

### Deploying the Frontend (Vercel / Render / Netlify)
You can deploy the Vite React app easily on any static host.
1. Root directory: `/frontend`
2. Build command: `npm run build`
3. Output directory: `dist`
4. Make sure to update the `axios.post` URL in `src/App.jsx` to point to your live backend URL before deploying.
