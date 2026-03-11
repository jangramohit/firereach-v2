# FireReach System Documentation

## Overview
FireReach is an Autonomous Outreach Engine designed to ingest an Ideal Customer Profile (ICP) and automatically orchestrate a multi-step workflow without human intervention. The system discovers a matching company, captures deterministic growth signals, generates a strategic account brief, and dispatches a highly personalized outreach email.

## 1. Agent Logic Flow
The core of FireReach is built on an agentic loop powered by LLM function-calling capabilities.

1. **User Input:** User submits an ICP via the React dashboard.
2. **Orchestration initialization:** FastAPI receives the request and triggers the main agent loop.
3. **Step 1 - Signal Harvesting:** The agent intrinsically calls `tool_signal_harvester`. This tool uses search utilities (like `duckduckgo_search`) to deterministically find a relevant company and extracts real-time signals using search snippets. No hallucination occurs here.
4. **Step 2 - Analysis Formulation:** The agent calls `tool_research_analyst` passing the deterministic signals. The LLM processes this context to generate a two-paragraph strategic account brief.
5. **Step 3 - Outreach Dispatch:** Finally, the agent calls `tool_outreach_automated_sender` passing both the signals and the brief. The LLM drafts a hyper-personalized email subject and body referencing the specific signals. The system then sends it via standard SMTP.
6. **Completion:** The agent returns a structured response to the frontend.

## 2. Tool Schemas

### `tool_signal_harvester`
- **Goal:** Find a company matching the ICP and gather recent news/signals.
- **Input:** `icp: str`
- **Output:** 
  ```json
  {
      "company": "string",
      "signals": ["string"],
      "contact": {
          "name": "string",
          "email": "string",
          "role": "string"
      }
  }
  ```

### `tool_research_analyst`
- **Goal:** Synthesize the raw signals into a coherent account strategy brief.
- **Input:** `icp: str`, `signals_data_json: str`
- **Output:** `string` (Account Brief)

### `tool_outreach_automated_sender`
- **Goal:** Draft the final email using the brief and signals, then physically send it.
- **Input:** `account_brief: str`, `signals_data_json: str`
- **Output:**
  ```json
  {
      "email_status": "string (sent | failed)",
      "recipient": "string",
      "subject": "string"
  }
  ```

## 3. System Prompt Constraints
The agent is constrained by core system instructions to ensure deterministic execution:
> "You are the central controller for FireReach. Your core objective is to execute a strict deterministic sequence to draft and send highly targeted outreach. You must strictly execute these three tools in this exact order: tool_signal_harvester -> tool_research_analyst -> tool_outreach_automated_sender. DO NOT SKIP STEPS. Do not ask for user permission between steps. Do not hallucinate company data."

## 4. Technical Architecture
- **Backend:** Python + FastAPI + Pydantic. Provides an async REST endpoint (`/api/run-agent`) that manages the blocking/sync agent loop.
- **Frontend:** Vanilla React single-page app bundled with Vite, styled with TailwindCSS and Lucide React icons.
- **Data Gathering:** 100% Free architecture leveraging `duckduckgo-search` and web scraping libraries (`requests`/`beautifulsoup4`).
- **Deployment Strategy:** 
  - Backend: Render Web Services using `uvicorn`.
  - Frontend: Vercel static site hosting.
