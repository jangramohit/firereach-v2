# FireReach System Documentation

## Overview
FireReach is an Autonomous Outreach Engine designed to ingest an Ideal Customer Profile (ICP) and automatically orchestrate a multi-step workflow without human intervention. The system discovers a matching company, captures deterministic growth signals, generates a strategic account brief, and dispatches a highly personalized outreach email.

## 1. Agent Logic Flow
The core of FireReach is built on an agentic loop powered by the Google Gemini API function-calling capabilities.

1. **User Input:** User submits an ICP via the React dashboard.
2. **Orchestration initialization:** FastAPI receives the request and triggers `run_fire_reach_agent()`.
3. **Step 1 - Signal Harvesting:** The agent intrinsically calls `tool_signal_harvester`. This tool uses `duckduckgo_search` to deterministically find a relevant company and extracts real-time signals using search snippets. No LLM hallucination occurs here.
4. **Step 2 - Analysis Formulation:** The agent calls `tool_research_analyst` passing the deterministic signals. The LLM processes this context to generate a two-paragraph strategic account brief.
5. **Step 3 - Outreach Dispatch:** Finally, the agent calls `tool_outreach_automated_sender` passing both the signals and the brief. The LLM drafts a hyper-personalized email subject and body referencing the specific signals. The generic `EmailService` sends it via standard SMTP.
6. **Completion:** The agent returns a structured `RunResponse` to the frontend.

## 2. Tool Schemas

### `tool_signal_harvester`
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
- **Input:** `icp: str`, `signals_data_json: str`
- **Output:** `string` (Account Brief)

### `tool_outreach_automated_sender`
- **Input:** `account_brief: str`, `signals_data_json: str`
- **Output:**
  ```json
  {
      "email_status": "string (sent | failed)",
      "recipient": "string",
      "subject": "string"
  }
  ```

## 3. System Prompt
The agent is constrained by the following core system instructions:
> "You are the central controller for FireReach. Your core objective is to execute a strict deterministic sequence to draft and send highly targeted outreach. You must strictly execute these three tools in this exact order: tool_signal_harvester -> tool_research_analyst -> tool_outreach_automated_sender. DO NOT SKIP STEPS. Do not ask for user permission between steps. Do not hallucinate company data."

## 4. Architecture
- **Backend:** Python + FastAPI + Pydantic. Async endpoint managing a blocking/sync agent loop.
- **Frontend:** Vanilla React single-page app bundled with Vite, styled with TailwindCSS.
- **Data Gathering:** 100% Free architecture leveraging `duckduckgo-search` and `requests`/`beautifulsoup4`.
