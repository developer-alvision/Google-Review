# Jyothsna Maternity & General Hospital (JMHG) Review Application

A production-quality, mobile-first patient feedback and Google Review web application built with **Next.js (App Router)**, **TypeScript**, and **Tailwind CSS**.

Designed specifically for patients and families scanning QR codes displayed across hospital counters, consultation rooms, and discharge lounges.

---

## 🌟 Key Features

- **Genuine & Ethical Patient Feedback**:
  - No rating manipulation, no forced 5-stars, and no rating gating.
  - Every patient (ratings 1 through 5) experiences the same transparent, empowering workflow.
- **Mobile-First Healthcare Aesthetic**:
  - Warm, professional pink & white healthcare palette (`#D94F70`, `#FCECEF`, `#FFF7F8`).
  - Optimized for 320px–430px smartphone widths (iOS Safari & Android Chrome) with large touch targets (≥44px).
  - Subtle CSS-only medical abstract decorative motifs.
- **Accessible Interactive Rating**:
  - 5-star interactive selector with keyboard navigation (`Arrow keys`, `Enter`, `Space`) and ARIA radiogroup roles.
- **Multi-Select Experience Categories**:
  - Neutral chips (Doctor consultation, Staff support, Communication, Cleanliness, Waiting experience, Overall care, Other).
- **Feedback Textarea & Validation**:
  - Live character count guidance (minimum 10 characters).
  - Privacy safeguards: explicitly advises avoiding sensitive medical history, diagnosis, patient IDs, or phone numbers.
- **AI-Powered Grammar & Clarity Polish (`polishFeedback`)**:
  - Strictly preserves the patient's original sentiment, claims, and enthusiasm.
  - Never fabricates praise or claims.
  - Transparent review card showing verified customer badges, category tags, and an option to switch between polished and original text.
  - "Edit my feedback" flow to adjust notes at any point.
- **Seamless Google Review CTA**:
  - "Copy Feedback & Open Google": automatically copies feedback to the clipboard and opens the hospital's Google Review link in a new tab.
  - Dedicated "Copy feedback" secondary button with clipboard fallback.
  - Confirmation screen thanking patients for their contribution to hospital care.
- **Abstract Analytics Tracker**:
  - Pre-wired events (`page_view`, `rating_selected`, `feedback_started`, `feedback_submitted`, `review_copied`, `google_opened`) ready for GA4, PostHog, or Vercel Analytics without collecting patient identifiers.

---

## 🚀 1. How to Run Locally

### Prerequisites
- Node.js 18.17+ or Node.js 20+ / 24+
- npm, yarn, or pnpm

### Steps
1. Clone or navigate into the project directory:
   ```bash
   cd "C:\Users\admin\Desktop\google review"
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open your browser:
   Visit [http://localhost:3000](http://localhost:3000)

To test a production build locally:
```bash
npm run build
npm run start
```

---

## 🔗 2. Where to Add `GOOGLE_REVIEW_URL`

There are two easy ways to update your Google Review URL:

### Option A: Via Environment Variable (Recommended for Vercel)
In your `.env.local` file or in your Vercel Project Settings:
```env
NEXT_PUBLIC_GOOGLE_REVIEW_URL="https://g.page/r/YOUR_HOSPITAL_GOOGLE_REVIEW_LINK/review"
```

### Option B: In the Configuration File
Open [`lib/config.ts`](file:///c:/Users/admin/Desktop/google%20review/lib/config.ts) and replace `"PASTE_GOOGLE_REVIEW_URL_HERE"`:
```typescript
export const GOOGLE_REVIEW_URL =
  process.env.NEXT_PUBLIC_GOOGLE_REVIEW_URL || "https://g.page/r/YOUR_HOSPITAL_GOOGLE_REVIEW_LINK/review";
```

> **How to get the official Google Review link from Google Business Profile:**
> 1. Log in to [Google Business Profile Manager](https://business.google.com).
> 2. Select **Jyothsna Maternity & General Hospital**.
> 3. Click **Ask for reviews** / **Get more reviews**.
> 4. Copy the short review link (e.g. `https://g.page/r/.../review`).

---

## 🤖 3. Where to Connect the AI API

The AI polish service runs securely server-side in [`app/api/polish-feedback/route.ts`](file:///c:/Users/admin/Desktop/google%20review/app/api/polish-feedback/route.ts). **API keys are never exposed in frontend browser code.**

The application includes an **instant out-of-the-box local grammar engine** that cleans and capitalizes sentences without requiring any API key.

To connect a cloud AI model (such as Google Gemini, OpenAI, or Groq):

1. Create a `.env.local` file (or set variables in Vercel):
   ```env
   # Option 1: Google Gemini (Recommended)
   GEMINI_API_KEY="AIzaSy..."

   # Option 2: OpenAI
   OPENAI_API_KEY="sk-..."

   # Option 3: Groq
   GROQ_API_KEY="gsk_..."
   ```

2. The server route automatically detects whichever key is present and uses it to polish grammar according to the strict medical feedback prompt. If the API fails or is unreachable, the app automatically falls back to the original text without throwing errors to the patient.

---

## ☁️ 4. How to Deploy to Vercel

1. Push your repository to GitHub, GitLab, or Bitbucket.
2. Sign in to [Vercel](https://vercel.com) and click **Add New Project**.
3. Import this repository.
4. In the **Environment Variables** section, add:
   - `NEXT_PUBLIC_GOOGLE_REVIEW_URL` = your Google Review link
   - `GEMINI_API_KEY` (or `OPENAI_API_KEY`) = your AI API key (optional)
5. Click **Deploy**. Vercel will build and deploy the Next.js app on a global edge CDN with SSL.

---

## 🌐 5. How to Connect the Custom Subdomain `reviews.jmgh.in`

To point `reviews.jmgh.in` to this Vercel deployment:

### Step 1: Add the Domain in Vercel
1. Open your project dashboard in [Vercel](https://vercel.com).
2. Go to **Settings** → **Domains**.
3. Type `reviews.jmgh.in` and click **Add**.

### Step 2: Configure DNS at your Domain Registrar / DNS Provider (for `jmgh.in`)
Add the following DNS record in your DNS manager (e.g., Cloudflare, GoDaddy, Namecheap, Google Domains):

| Type  | Name/Host | Value / Destination | TTL |
| :---  | :---      | :---                | :--- |
| **CNAME** | `reviews` | `cname.vercel-dns.com` | Auto (or 3600) |

*(Note: If your DNS provider is Cloudflare, set the proxy status to "DNS only" during initial SSL verification).*

### Step 3: Automatic SSL
Within 1–5 minutes, Vercel will verify the DNS record and automatically issue a free Let's Encrypt SSL certificate. Your patients can then access the review page securely at:
**`https://reviews.jmgh.in`**

---

## 📱 QR Code Generation Tip

Once `https://reviews.jmgh.in` is live:
1. Generate high-resolution SVG/PNG QR codes pointing to `https://reviews.jmgh.in?source=qr`.
2. Print standees or table cards for:
   - OPD consultation waiting areas
   - Billing & discharge desks
   - In-patient rooms & pharmacy counters
