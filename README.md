# ProcureWise Dashboard

Build a polished production-style frontend for my existing AI procurement platform called “ProcureMind AI”.

IMPORTANT:
- Do NOT create a new backend.
- Do NOT create Supabase.
- Do NOT create a new database.
- Do NOT replace my authentication system.
- My backend already exists in FastAPI.
- My backend base URL during local development is:

http://127.0.0.1:8001

Use my existing REST APIs only.

====================================================
PRODUCT OVERVIEW
====================================================

ProcureMind AI is an AI-powered procurement decision-support platform.

The user uploads:
1. One RFQ PDF
2. Two or more vendor quotation PDFs

The backend then performs:
- PDF extraction
- LLM structured extraction
- Vendor compliance checking
- Vendor scoring
- Vendor ranking
- LangGraph workflow orchestration
- AI recommendation
- PostgreSQL persistence
- Procurement history
- PDF report generation

The frontend should present all of this in a clean enterprise procurement dashboard.

====================================================
DESIGN STYLE
====================================================

Use a modern enterprise SaaS design.

Preferred style:
- Professional
- Clean
- Premium
- Procurement / enterprise dashboard feel
- Not overly colorful
- Minimal gradients
- Responsive
- Desktop-first but mobile-friendly
- Strong information hierarchy
- Cards, tables, status badges, progress indicators
- Good spacing
- Modern typography
- Sidebar navigation

Use a visual style similar to modern B2B SaaS products.

Main navigation:
- Dashboard
- New Analysis
- History
- Reports
- Profile / Account
- Logout

Use a left sidebar on desktop.

====================================================
AUTHENTICATION
====================================================

Authentication is already implemented in FastAPI using JWT Bearer tokens.

Create:

1. Signup page
2. Login page
3. Protected application routes
4. Logout

LOGIN API:

POST
/auth/login

Request JSON:

{
  "email": "user@example.com",
  "password": "password"
}

Response:

{
  "access_token": "JWT_TOKEN",
  "token_type": "bearer"
}

Store the access token securely for the current frontend session.

Every protected API call must send:

Authorization: Bearer JWT_TOKEN

CURRENT USER API:

GET
/auth/me

Use this to load the logged-in user's profile.

Expected response:

{
  "id": 1,
  "name": "User Name",
  "email": "user@example.com",
  "role": "buyer",
  "is_active": true
}

SIGNUP API:

POST
/auth/signup

Request:

{
  "name": "User Name",
  "email": "user@example.com",
  "password": "StrongPassword",
  "role": "buyer"
}

Create proper success and error states.

If the JWT is missing or invalid:
- redirect user to login.

====================================================
PAGE 1 — LOGIN
====================================================

Create a premium login page.

Include:
- ProcureMind AI logo/text
- Email
- Password
- Login button
- Link to signup
- Error message
- Loading state

Headline:
“Smarter Procurement. Faster Decisions.”

Subtext:
“Compare vendors, evaluate compliance, and generate AI-assisted procurement recommendations.”

====================================================
PAGE 2 — SIGNUP
====================================================

Fields:
- Full name
- Email
- Password
- Confirm password
- Role

Default role:
buyer

Include:
- frontend validation
- password mismatch handling
- backend error handling

====================================================
PAGE 3 — DASHBOARD
====================================================

Dashboard should feel like a real procurement analytics system.

Top header:
“Procurement Intelligence Dashboard”

Show summary cards such as:
- Total Analyses
- Latest Best Vendor
- Latest Decision
- Manual Review Count

Get history using:

GET
/history

Example response:

{
  "user_id": 8,
  "total_analyses": 1,
  "history": [
    {
      "analysis_id": 3,
      "filename": "rfq.pdf",
      "rfq_title": "Request For Quotation",
      "department": "IT",
      "created_at": "...",
      "best_vendor": "Lenovo Enterprise",
      "final_decision": "Approve"
    }
  ]
}

Show recent procurement analyses in a table.

Columns:
- Analysis ID
- RFQ
- Department
- Best Vendor
- Decision
- Created At
- Action

Action:
“View Analysis”

Also add a prominent:
“New Procurement Analysis” button.

====================================================
PAGE 4 — NEW ANALYSIS
====================================================

This is the most important page.

Create a step-based upload interface.

STEP 1:
Upload RFQ PDF

STEP 2:
Upload vendor quotation PDFs

Require at least 2 vendor PDFs.

Allow:
- drag and drop
- file selector
- remove selected file
- display selected filenames
- display PDF icons
- validation if fewer than 2 vendors

Button:
“Run AI Procurement Analysis”

Use API:

POST
/procurement/compare-multiple-pdfs

Content-Type:
multipart/form-data

Fields:

rfq_file = one PDF

vendor_files = multiple PDFs

Send JWT Authorization header.

While processing:
show a professional analysis loading state.

Loading progress text can rotate through:

- Reading procurement documents
- Extracting RFQ requirements
- Analyzing vendor quotations
- Checking technical compliance
- Ranking vendors
- Running LangGraph workflow
- Generating AI recommendation
- Saving procurement analysis

Do NOT fake completion percentages if backend does not provide progress.
Use an indeterminate progress indicator.

====================================================
ANALYSIS SUCCESS RESPONSE
====================================================

The API response can look like:

{
  "message": "Procurement analysis completed successfully using LangGraph.",
  "workflow_status": "Procurement analysis saved successfully",
  "analysis_id": 6,
  "comparison_id": 5,
  "user_id": 10,
  "rfq_filename": "rfq.pdf",
  "vendor_count": 3,
  "data_complete": true,
  "compliance_passed": true,
  "requires_manual_review": false,
  "review_reason": "",
  "structured_rfq": {...},
  "vendors": [...],
  "compliance_reports": [...],
  "scoring_result": {...},
  "ai_recommendation": {...}
}

After success:
navigate to a Result / Analysis Detail page.

====================================================
PAGE 5 — ANALYSIS RESULT
====================================================

Create a premium procurement decision page.

Top summary:

Analysis #ID

Status badge:
- Approved
- Manual Review
- Rejected
depending on backend response.

Show:

Best Vendor:
scoring_result.best_vendor

Final Decision:
ai_recommendation.final_decision

====================================================
SECTION — RFQ SUMMARY
====================================================

Use structured_rfq.

Display:
- RFQ title
- Department
- Currency
- Required delivery days
- Required warranty months

Then show required items in a table:

Columns:
- Item
- Required Quantity
- Specifications

Specifications should display cleanly from key-value pairs.

====================================================
SECTION — VENDOR RANKING
====================================================

Use:

scoring_result.rankings

Example fields:

{
  "vendor_name": "Lenovo Enterprise",
  "subtotal": 1360000,
  "price_score": 97.06,
  "delivery_score": 100,
  "compliance_score": 100,
  "past_rating_score": 94,
  "warranty_score": 100,
  "final_score": 98.37,
  "rank": 1
}

Create a polished ranking table.

Columns:
- Rank
- Vendor
- Subtotal
- Price
- Delivery
- Compliance
- Rating
- Warranty
- Final Score

Highlight rank 1.

Use score badges / progress bars where useful.

Add a horizontal bar chart for vendor final scores if possible.

====================================================
SECTION — VENDOR DETAIL CARDS
====================================================

For every vendor show:
- Vendor name
- Currency
- Delivery days
- Warranty months
- Payment terms
- Technical compliance %
- Past rating

Also show quotation items:
- Item
- Quantity
- Unit Price
- Specifications

====================================================
SECTION — COMPLIANCE
====================================================

Use compliance_reports.

For each vendor show:
- Overall compliance %
- Delivery match
- Warranty match
- Passed checks / total checks

Inside expandable detail:
show item-level compliance.

Example:
Laptop
- Quantity match
- RAM match
- Storage match
- Processor match

Use:
green check icons for pass
red icons for fail

====================================================
SECTION — AI RECOMMENDATION
====================================================

Use:

ai_recommendation

Fields can include:

best_vendor
executive_summary
selection_reasons
strengths
risks
other_vendor_analysis
negotiation_suggestions
final_decision

Create a visually strong AI recommendation card.

Sections:

Recommended Vendor

Executive Summary

Why Selected

Strengths

Risks

Other Vendor Analysis

Negotiation Suggestions

Final Decision

Do not generate frontend AI content.
Display exactly what backend returns.

====================================================
MANUAL REVIEW FLOW
====================================================

LangGraph can return:

requires_manual_review = true

If true:

Do NOT show normal approval styling.

Show prominent amber/orange status:

“Manual Review Required”

Display:

review_reason
data_complete
missing_data_reason
compliance_passed
compliance_reason

Explain:
“This procurement workflow requires human review before final approval.”

====================================================
PAGE 6 — HISTORY
====================================================

Use:

GET
/history

Show user's procurement history.

Use table/list with:
- Analysis ID
- RFQ title
- Filename
- Department
- Best Vendor
- Final Decision
- Date
- View
- Download Report
- Delete

====================================================
ANALYSIS DETAIL FROM HISTORY
====================================================

API:

GET
/history/{analysis_id}

Example:

GET /history/3

The response contains:
- RFQ
- vendors
- comparison
- scoring
- AI recommendation

Create the same Analysis Result UI using saved data.

Do not rerun procurement analysis when opening history.

====================================================
DELETE HISTORY
====================================================

API:

DELETE
/history/{analysis_id}

Before deleting:
show confirmation dialog:

“Delete this procurement analysis?”

Buttons:
Cancel
Delete

After successful deletion:
refresh history.

====================================================
PDF REPORT DOWNLOAD
====================================================

API:

GET
/reports/{analysis_id}/pdf

This endpoint returns application/pdf.

Add:
“Download Procurement Report”

button on:
- result page
- history page
- analysis detail page

Make sure the JWT Authorization header is included when downloading.

Implement PDF downloading properly using blob handling.

Suggested flow:

fetch endpoint with Authorization Bearer token
→ response.blob()
→ create temporary object URL
→ trigger browser download

Filename example:
ProcureMind_Report_6.pdf

====================================================
ERROR HANDLING
====================================================

Create proper UI for:

400:
bad user input

401:
redirect to login / token expired

404:
analysis not found

422:
validation error

500:
backend / LangGraph error

Show useful messages instead of raw JSON whenever possible.

====================================================
API ARCHITECTURE
====================================================

Create a reusable API service layer.

Example structure:

src/
  api/
    client.ts
    auth.ts
    procurement.ts
    history.ts
    reports.ts

Use environment variable:

VITE_API_BASE_URL

or equivalent depending on framework.

Default local value:

http://127.0.0.1:8001

Do NOT hard-code the backend URL throughout components.

====================================================
TOKEN HANDLING
====================================================

Create a reusable authenticated API client.

For protected requests automatically attach:

Authorization: Bearer <token>

Handle 401 globally:
- clear authentication
- redirect to login

====================================================
COMPONENT STRUCTURE
====================================================

Create reusable components such as:

Sidebar
TopHeader
MetricCard
StatusBadge
FileUploader
VendorRankingTable
VendorCard
ComplianceCard
AIRecommendationCard
HistoryTable
LoadingAnalysis
ConfirmDeleteDialog
EmptyState
ErrorState

====================================================
RESPONSIVENESS
====================================================

Desktop:
sidebar + main dashboard

Tablet:
collapsible sidebar

Mobile:
drawer navigation
stack cards vertically
tables should scroll horizontally

====================================================
IMPORTANT TECHNICAL RULES
====================================================

1. Do not create Supabase.
2. Do not create a backend.
3. Do not create mock API endpoints.
4. Do not replace FastAPI authentication.
5. Do not invent procurement results.
6. Backend is the source of truth.
7. Use actual backend responses.
8. Keep API logic separate from UI components.
9. Write clean reusable React/TypeScript code.
10. Use proper loading and error states.
11. Protect authenticated routes.
12. Use the existing JWT bearer token.
13. The project should be easy to run locally and later deploy.

====================================================
EXAMPLE DEMO RESULT
====================================================

Design the UI to handle results such as:

Best Vendor:
Lenovo Enterprise

Vendor Rankings:

1. Lenovo Enterprise
Final Score: 98.37
Compliance: 100%

2. Dell Technologies
Final Score: 92.39
Compliance: 100%

3. HP Solutions
Final Score: 84.56
Compliance: 87.5%

Final Decision:
Approve

This is only an example for UI structure.
Actual values must always come from the API.

====================================================
FINAL GOAL
====================================================

The final frontend should make ProcureMind look like a production-grade AI procurement SaaS product suitable for:
- portfolio presentation
- placements
- technical interviews
- project demonstrations

Build all major pages and components with a cohesive enterprise visual system.

Do not simplify this into a single-page upload demo.
It should feel like a complete procurement management product.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/e0cba328-9709-41de-908e-7ae0ef726b0e).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
