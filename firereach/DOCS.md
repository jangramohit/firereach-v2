# FireReach System Documentation

## Overview
FireReach is an Autonomous Outreach Engine designed to ingest an Ideal Customer Profile (ICP) and automatically orchestrate a multi-step workflow without human intervention. The system discovers a matching company, captures deterministic growth signals, generates a strategic account brief, and dispatches a highly personalized outreach email.

## 1. Agent Logic Flow
The core of FireReach is built on an agentic loop powered by **Groq** function-calling capabilities using the `llama-3.3-70b-versatile` model.

1. **User Input:** User submits an ICP and optionally a target email via the React dashboard.
2. **Orchestration Initialization:** FastAPI receives the asynchronous POST request and triggers the `OutreachAgent.process_company` sync function.
3. **Step 1 - Signal Harvesting:** The agent intrinsically calls `tool_signal_harvester`. This tool uses search utilities (like `duckduckgo_search`) and web scrapers (like `BeautifulSoup`) to deterministically find a relevant company and extracts real-time signals.
4. **Step 2 - Analysis Formulation:** The agent calls `tool_research_analyst` passing the deterministic signals. The LLM processes this context to generate a strategic account brief.
5. **Step 3 - Outreach Dispatch:** Finally, the agent calls `tool_outreach_automated_sender` passing both the signals and the brief. The LLM drafts a hyper-personalized email subject and body referencing the specific signals. The system then automatically sends it out via standard SMTP configured in `.env`.
6. **Completion:** The agent halts execution, and the backend returns a structured `ProcessedCompany` response to the frontend.

## 2. Tool Schemas

### `tool_signal_harvester`
- **Goal:** Find a company matching the ICP and gather recent news/signals.
- **Input:** `company: str`
- **Output:** `ProcessedCompany` signals array.

### `tool_research_analyst`
- **Goal:** Synthesize the raw signals into a coherent account strategy brief.
- **Input:** `icp: str`, `company: str`, `signals_data_json: str`
- **Output:** Account Brief (`str`).

### `tool_outreach_automated_sender`
- **Goal:** Draft the final email using the brief and signals, then physically send it.
- **Input:** `company: str`, `account_brief: str`, `signals_data_json: str`, `target_email: Optional[str]`
- **Output:**
  ```json
  {
      "email_status": "string (sent | failed)",
      "recipient": "string",
      "subject": "string"
  }
  ```

## 3. System Prompt Constraints
The agent is constrained by core system instructions to ensure deterministic execution. It follows a loop limit of 10 iterations to prevent runaway recursive calls limit.

## 4. Technical Architecture
- **Backend:** Python + FastAPI + Pydantic. Provides an async REST endpoint (`/api/run-agent`) that manages the blocking/sync Groq agent loop.
- **Frontend:** Vanilla React single-page app bundled with Vite, styled with TailwindCSS and Lucide React icons.
- **Data Gathering:** 100% Free architecture leveraging `duckduckgo-search` and web scraping libraries (`requests`/`beautifulsoup4`).
- **AI Inference Engine:** The agent loop is driven entirely by Groq's high-speed inference endpoints using Llama 3.3. Gemini was replaced in favor of Groq for faster TTFB (Time to First Byte) during recursive agent steps.
