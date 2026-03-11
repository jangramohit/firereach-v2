# FireReach - Autonomous Outreach Engine

FireReach is an autonomous AI Sales Development Representative (SDR) system. It takes a single prompt (an Ideal Customer Profile - ICP), discovers matching companies, captures real growth signals via web scraping, formulates strategic account briefs, and automatically sends personalized outreach emails.

## Table of Contents
- [Features](#features)
- [Architecture](#architecture)
- [Local Setup](#local-setup)
- [Deployment](#deployment)
- [Environment Variables](#environment-variables)
- [Documentation](#documentation)

## Features
- **Autonomous Lead Generation:** Leverages DuckDuckGo search to find relevant companies based on your ICP.
- **Signal Harvesting:** Scrapes real-time data and news to find contextual "growth signals" for personalization.
- **AI-Powered Analysis:** Uses Google Gemini to generate strategic two-paragraph account briefs.
- **Automated Outreach:** Drafts hyper-personalized emails and sends them automatically via SMTP.
- **Modern Dashboard:** A sleek React/Vite frontend to monitor and trigger outbound campaigns.

## Architecture
- **Frontend:** React, Vite, TailwindCSS
- **Backend:** Python, FastAPI, Contextual AI Agents (Gemini)
- **Deployment:** Vercel (Frontend), Render (Backend)

---

## Local Setup

### 1. Backend (FastAPI)
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Create and activate a virtual environment:
   ```bash
   python3 -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Configure Environment Variables:
   - Copy `.env.example` to `.env` (or create a `.env` file).
   - Fill in your Gemini API Key and SMTP credentials (see [Environment Variables](#environment-variables)).
5. Run the server:
   ```bash
   uvicorn app.main:app --reload --host 0.0.0.0 --port 10000
   ```
   The backend will be available at `http://localhost:10000`.

### 2. Frontend (Vite + React)
1. Open a new terminal and navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure Environment Variables:
   - Ensure the backend URL in `src/App.jsx` points to `http://localhost:10000` for local development.
4. Run the development server:
   ```bash
   npm run dev
   ```
   Access the dashboard at `http://localhost:5173`.

---

## Deployment

I attempted to deploy this project live using **Vercel** (for the Vite frontend) and **Render** (for the FastAPI backend), but encountered some configuration issues that prevented a successful live build.

_If you'd like to attempt deployment, you can try following standard Vite/FastAPI hosting guides for those platforms._

### Screenshots / Images

If you want to add images of the application running locally to this README, you can place your image files (e.g., `dashboard.png`) directly into this repository folder and embed them using the following format:

```markdown
![Dashboard View](./dashboard.png)
![Running Server](./server-log.jpg)
```


## Environment Variables

Your backend requires the following variables in its `.env` file (or provider settings):

```env
GROQ_API_KEY=your_groq_api_key
SMTP_SERVER=smtp.gmail.com
SMTP_PORT=587
SMTP_USERNAME=your_gmail@gmail.com
SMTP_PASSWORD=your_gmail_app_password
SENDER_EMAIL=your_gmail@gmail.com
```

*(Note: While the variable is named GROQ_API_KEY, the system leverages Gemini under the hood in its current iteration).*

## Documentation
For more detailed information on the agentic loop, system prompts, and tool schemas, please refer to [DOCS.md](./DOCS.md).
