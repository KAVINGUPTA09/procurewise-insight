# ⚡ ProcureMind AI

## Agentic B2B Procurement Intelligence Platform — Frontend

> **Turning complex procurement workflows into an intelligent, explainable and human-controlled decision experience.**

ProcureMind AI is an **AI-powered B2B procurement intelligence platform** that helps organizations evaluate vendor quotations, analyze RFQs, compare suppliers, understand procurement risks and make explainable purchasing decisions.

This repository contains the **React + TypeScript frontend** of ProcureMind AI.

The application provides dedicated workspaces for:

- 👤 Buyers
- ✅ Approvers
- 🛡️ Administrators

and connects them with the complete **FastAPI + LangGraph procurement intelligence backend**.

---

# 🚀 What the Platform Does

A procurement buyer can upload:

```text
1 RFQ PDF
    +
Multiple Vendor Quotation PDFs
```

ProcureMind then processes them through the backend AI workflow:

```text
Document Extraction
        ↓
Data Validation
        ↓
Technical Compliance
        ↓
Vendor Scoring
        ↓
AI Recommendation
        ↓
Risk Intelligence
        ↓
Human Approval
        ↓
Procurement Decision
```

The frontend transforms these results into an enterprise-style procurement workspace.

---

# 🧠 Complete Product Flow

```text
            ┌───────────────────────┐
            │ Email / Google Login  │
            └───────────┬───────────┘
                        │
                        ▼
                Role Detection
                        │
          ┌─────────────┼─────────────┐
          │             │             │
          ▼             ▼             ▼
       👤 BUYER      ✅ APPROVER    🛡️ ADMIN
          │             │             │
          ▼             ▼             ▼
     Procurement     Approval       Governance
       Analysis       Queue        & User Roles
          │
          ▼
     RFQ + Vendors
          │
          ▼
     LangGraph AI
          │
          ▼
   Vendor Comparison
          │
          ▼
 Decision Intelligence
          │
          ▼
 History · Reports · Analytics
```

---

# 👤 Buyer Workspace

The Buyer workspace is designed for procurement teams creating and evaluating purchasing requests.

Buyers can:

- Upload an RFQ PDF
- Upload multiple vendor quotation PDFs
- Run AI procurement analysis
- Review extracted RFQ requirements
- Compare supplier pricing
- Compare delivery timelines
- Compare warranties
- Inspect technical compliance
- View supplier performance
- Review weighted vendor scores
- View the recommended vendor
- Read AI-generated procurement reasoning
- Access procurement history
- Download procurement reports
- Open Decision Intelligence

---

# 📄 New Procurement Analysis

The analysis workspace allows buyers to upload:

### RFQ

The procurement requirement document.

### Vendor Quotations

Two or more supplier quotation PDFs.

Example:

```text
RFQ
 └── rfq.pdf

Vendor Quotations
 ├── vendor_lenovo.pdf
 ├── vendor_dell.pdf
 └── vendor_hp.pdf
```

The frontend sends these documents to the backend procurement workflow.

---

# 🧠 LangGraph Procurement Agent

The frontend visualizes the AI workflow as it progresses through the procurement pipeline.

```text
RFQ Extraction
      ↓
Vendor Extraction
      ↓
Data Validation
      ↓
Compliance
      ↓
Weighted Scoring
      ↓
AI Recommendation
      ↓
Risk Check
      ↓
Persistence
```

The underlying workflow is orchestrated using **LangGraph**.

---

# 🏆 Vendor Comparison

Once an analysis completes, ProcureMind displays a structured comparison of all suppliers.

The comparison includes:

| Metric | Description |
|---|---|
| Rank | Overall vendor position |
| Subtotal | Total quotation cost |
| Price | Relative price score |
| Delivery | Delivery performance |
| Compliance | Technical compliance |
| Rating | Supplier performance |
| Warranty | Warranty score |
| Final Score | Overall procurement score |

The recommended supplier is clearly highlighted.

---

# 🤖 AI Procurement Recommendation

ProcureMind presents the AI recommendation in a structured business-friendly format.

The interface displays:

### Executive Summary

Why the recommended vendor provides the strongest overall procurement value.

### Why Selected

The major factors that caused the vendor to rank first.

### Strengths

Important advantages of the supplier.

### Risks

Potential procurement concerns.

### Other Vendor Analysis

Comparison with competing suppliers.

### Negotiation Suggestions

Commercial recommendations that may improve the final procurement agreement.

### Final Decision

Example:

```text
Recommended Vendor
Lenovo Enterprise

Winning Score
99.14

Final Decision
Approve with Conditions
```

---

# 🧠 Decision Intelligence

ProcureMind goes beyond displaying a vendor ranking.

The **Decision Intelligence workspace** provides advanced tools for understanding the recommendation.

---

## 🔄 What-If Analysis

Users can simulate different procurement priorities.

For example:

```text
Increase Price Importance
        ↓
Recalculate Ranking
        ↓
Compare Decision Change
```

This helps procurement teams understand how scoring priorities affect supplier selection.

---

## 🔍 Explainability

The explainability layer helps users understand:

- Why a vendor ranked first
- Which factors increased the score
- Which factors reduced the score
- How each procurement criterion affected the decision

This makes AI-assisted decisions easier to inspect.

---

## ⚠️ Risk Intelligence

The interface exposes procurement risk analysis to help users evaluate potential concerns before final approval.

---

## 🤝 Negotiation Intelligence

ProcureMind can surface negotiation opportunities involving:

- Price
- Payment terms
- Warranty
- Delivery
- Commercial conditions

---

## 🤖 Procurement Copilot

The Procurement Copilot provides analysis-grounded AI assistance.

Users can ask procurement questions related to the current analysis rather than interacting with a generic chatbot.

---

## 🧠 Agent Pipeline

Users can inspect the stages involved in generating the procurement decision.

This improves transparency into the agentic workflow.

---

# ✅ Approver Workspace

ProcureMind implements a **Human-in-the-Loop procurement approval system**.

Approvers can review AI-assisted procurement decisions before final authorization.

```text
Procurement Analysis
        ↓
AI Recommendation
        ↓
Risk Evaluation
        ↓
Approver Dashboard
        ↓
   ┌────┴─────┐
   │          │
Approve     Reject
   │          │
   └────┬─────┘
        ↓
 Decision Audit
```

The Approver workspace can display:

- Procurement analysis
- Recommended supplier
- Vendor ranking
- Final score
- AI recommendation
- Risk context
- Approval status

---

# 🛡️ Admin Workspace

The Admin workspace provides organisation-level governance.

Admin capabilities include:

- View platform users
- Inspect assigned roles
- Manage authorised roles
- Monitor procurement activity
- Access B2B analytics
- Support procurement governance

The application supports:

```text
BUYER
APPROVER
ADMIN
```

---

# 📊 Procurement Analytics

The Analytics workspace provides higher-level procurement intelligence.

It can expose information such as:

- Procurement activity
- Supplier performance
- Vendor outcomes
- Procurement trends
- Decision statistics
- Commercial insights

---

# 📜 Contract Intelligence

ProcureMind includes a Contracts workspace connected to backend contract intelligence APIs.

This extends the platform beyond vendor selection into broader procurement lifecycle management.

---

# 📈 Spend Forecasting

Backend forecasting capabilities can provide directional procurement spend intelligence for planning and analysis.

---

# 📚 Procurement History

Completed analyses are persisted and accessible through the History workspace.

Users can revisit previous procurement decisions instead of losing results after each session.

This creates a persistent procurement decision trail.

---

# 📑 Procurement Reports

ProcureMind supports automated procurement reports.

Users can download reports associated with completed analyses for:

- Documentation
- Review
- Procurement records
- Decision sharing
- Audit support

---

# 🔐 Authentication

ProcureMind supports:

- Email/password authentication
- JWT-based sessions
- Google authentication
- Protected routes
- Role-aware workspaces
- Buyer authorization
- Approver authorization
- Admin authorization

---

# 🧭 Role-Aware Navigation

The application dynamically adapts to the user's role.

```text
Authentication
      ↓
Current User
      ↓
Role Detection
      ↓
┌────────────┬────────────┬────────────┐
│   Buyer    │  Approver  │   Admin    │
└────────────┴────────────┴────────────┘
      ↓            ↓             ↓
 Buyer UI     Approval UI     Admin UI
```

This allows a single frontend application to support multiple enterprise procurement workflows.

---

# 🖥️ Main Application Screens

| Screen | Purpose |
|---|---|
| Dashboard | Procurement overview |
| New Analysis | Upload RFQ and vendor quotations |
| Analysis | Vendor ranking and recommendation |
| Decision Intelligence | Advanced procurement reasoning |
| Analytics | Procurement analytics |
| Approver Dashboard | Human approval workflow |
| Admin Dashboard | User and role governance |
| Contracts | Contract intelligence |
| History | Previous procurement analyses |
| Reports | Procurement reporting |
| Profile | User account |
| Architecture | System architecture |
| Sample Demo | Prebuilt procurement demonstration |
| Builder | Engineering/project profile |

---

# 🛠️ Frontend Technology Stack

| Layer | Technology |
|---|---|
| Frontend | React |
| Language | TypeScript |
| Build Tool | Vite |
| Routing | TanStack Router |
| Server State | TanStack Query |
| Styling | Tailwind CSS |
| API | REST |
| Authentication | JWT + Google |
| Backend | FastAPI |
| Agent Workflow | LangGraph |
| Database | PostgreSQL |
| Cache | Redis / Valkey |

---

# 🏗️ Full System Architecture

```text
┌─────────────────────────────────┐
│     React + TypeScript UI       │
│                                 │
│ Buyer · Approver · Admin        │
│ Analytics · Decision Intel.     │
└────────────────┬────────────────┘
                 │
                 │ REST API + JWT
                 ▼
┌─────────────────────────────────┐
│          FastAPI Backend        │
│                                 │
│ Authentication                  │
│ Procurement APIs                │
│ RBAC                            │
│ Reports                         │
├─────────────────────────────────┤
│        LangGraph Workflow       │
│                                 │
│ RFQ Extraction                  │
│ Vendor Extraction               │
│ Validation                      │
│ Compliance                      │
│ Scoring                         │
│ LLM Recommendation              │
│ Risk Routing                    │
└────────────┬───────────┬────────┘
             │           │
             ▼           ▼
       PostgreSQL    Redis / Valkey
```

---

# 🔥 Why ProcureMind Is Different

ProcureMind is **not just another AI chatbot frontend**.

It represents a complete AI-assisted enterprise workflow:

```text
Document Intelligence
        +
Deterministic Procurement Logic
        +
LangGraph Agentic Orchestration
        +
LLM Reasoning
        +
Explainable Scoring
        +
Human-in-the-Loop Approval
        +
Role-Based Access
        +
Persistent Data
        +
Caching
        +
Business Analytics
```

The application demonstrates how generative AI can be integrated with traditional software engineering and deterministic business rules to create an explainable decision-support system.

---

# 📁 Important Frontend Areas

```text
src/
│
├── api/
│   └── b2b.ts
│
├── components/
│   └── app/
│       └── AppSidebar.tsx
│
└── routes/
    ├── admin-dashboard.tsx
    ├── analytics.tsx
    ├── approver-dashboard.tsx
    ├── contracts.tsx
    ├── analysis.$analysisId.tsx
    └── intelligence.$analysisId.tsx
```

---

# ⚙️ Local Development

## Clone Repository

```bash
git clone https://github.com/KAVINGUPTA09/procurewise-insight.git
```

Enter the project:

```bash
cd procurewise-insight
```

Install dependencies:

```bash
npm install
```

Start development server:

```bash
npm run dev
```

Vite will display the local application URL in the terminal.

---

# 🔧 Environment Configuration

Configure the frontend environment with values such as:

```env
VITE_API_BASE_URL=YOUR_BACKEND_API_URL
VITE_GOOGLE_CLIENT_ID=YOUR_GOOGLE_CLIENT_ID
```

For local development, the backend may run at:

```text
http://127.0.0.1:8001
```

> Never commit private credentials, API secrets or sensitive `.env` files.

---

# 🎬 Complete Interview Demo Flow

A strong end-to-end demonstration of ProcureMind:

```text
1. Open ProcureMind
          ↓
2. Login using Google / Email
          ↓
3. Show Buyer Dashboard
          ↓
4. Open New Analysis
          ↓
5. Upload 1 RFQ + 2 Vendor PDFs
          ↓
6. Run AI Procurement Analysis
          ↓
7. Show LangGraph Workflow
          ↓
8. Show Vendor Ranking
          ↓
9. Explain Weighted Scoring
          ↓
10. Show AI Recommendation
          ↓
11. Open Decision Intelligence
          ↓
12. Show Risk / Explainability / What-If
          ↓
13. Show Procurement History + Report
          ↓
14. Login as Approver
          ↓
15. Show Human Approval Workflow
          ↓
16. Login as Admin
          ↓
17. Show Admin Governance
          ↓
18. Show Analytics + Contracts
          ↓
19. Open FastAPI Swagger
          ↓
20. Show Redis Health
```

This demonstrates the **complete system**, not only the AI output.

---

# 🧠 Backend Repository

The AI procurement engine and APIs are maintained separately.

**Backend Repository:**

```text
https://github.com/KAVINGUPTA09/procuremind-ai-backend
```

Backend stack:

```text
Python
FastAPI
LangGraph
LangChain
PostgreSQL
SQLAlchemy
Redis / Valkey
PyMuPDF
JWT
LLM APIs
```

---

# 👨‍💻 Builder

## Kavin Gupta

**B.Tech CSE · AI/ML & Agentic AI**

### Focus Areas

`Agentic AI` · `Large Language Models` · `LangGraph` · `RAG` · `Multi-Agent Systems` · `Machine Learning` · `AI Automation`

### GitHub

```text
KAVINGUPTA09
```

### LinkedIn

```text
kavin-gupta-509b8a321
```

---

# ⚠️ Disclaimer

ProcureMind AI is an **AI-assisted decision-support platform**.

AI recommendations are intended to assist procurement professionals and should not replace organisational procurement policies, due diligence, contractual review or authorised human judgement.

FRONTEND LINK-https://procurewise-insight.onrender.com/

---

<p align="center">
  <strong>⚡ ProcureMind AI</strong>
  <br>
  Agentic B2B Procurement Intelligence Platform
</p>

<p align="center">
  React · TypeScript · FastAPI · LangGraph · PostgreSQL · Redis
</p>
