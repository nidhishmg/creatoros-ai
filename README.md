# creatoros-ai

**AI-Powered Direct-to-Creator Platform for Content Intelligence & Monetization**

creatoros-ai is a Direct-to-Creator (D2C) software platform that uses AI to help content creators understand their unique creative identity, generate personalized content ideas, predict audience reactions, and monetize their work directly through UPI payments with automatic GST compliance.

## 🎯 What is creatoros-ai?

creatoros-ai analyzes creator-provided content to build a comprehensive **Creator DNA Profile** that captures:
- Tone and language style
- Humor level (including dark humor where appropriate)
- Risk tolerance
- Audience characteristics and behavior
- Monetization readiness

Using this profile, the platform provides:
- **Personalized content suggestions** that match your authentic voice
- **Audience reaction predictions** before you publish
- **Revenue opportunity detection** based on real audience behavior
- **Risk assessment** for content decisions
- **Direct monetization** via UPI with automatic GST invoicing
- **Optional IP micro-licensing** for original content

## 🚫 What creatoros-ai is NOT

creatoros-ai explicitly does **NOT**:
- Claim ownership over creator ideas, formats, or topics
- Prevent creators from posting content on any platform
- Enforce takedowns or legal actions automatically
- Replace human creative decision-making
- Act as a brand deal broker or talent agency
- Guarantee engagement, revenue, or virality

**All AI outputs are advisory.** Creators retain full control over whether to post content, monetize, license IP, or act on risk warnings.

## 🏗️ Architecture Overview

The platform is built on six core AI components powered by Large Language Models (LLMs):

1. **Creator DNA Scanner** - Analyzes your content to build your unique profile
2. **Content Personality Engine** - Generates ideas that match your style
3. **Audience Emotion Reader** - Predicts how your audience will react
4. **Revenue Detector** - Identifies monetization opportunities
5. **Risk Guard** - Assesses content risk (without censoring)
6. **Growth Memory** - Tracks your evolution over time

### Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Frontend**: React + Tailwind CSS
- **Database**: Supabase (PostgreSQL)
- **Auth**: Supabase Auth (Email + Google)
- **AI Layer**: OpenAI GPT-4 Turbo
- **Hosting**: Vercel
- **Payments**: UPI integration (Razorpay/PayU/Cashfree)
- **Compliance**: Automatic GST invoice generation
- **Testing**: Property-based testing with fast-check/Hypothesis

## 📋 Project Structure

```
creatoros-ai/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── api/
│   │   │   └── creator-dna/
│   │   │       └── scan/       # POST /api/creator-dna/scan
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── globals.css
│   ├── services/
│   │   └── creator-dna/        # Creator DNA Scanner service
│   │       ├── index.ts        # Main entry point
│   │       ├── analyzers.ts    # Attribute analyzers
│   │       ├── aggregator.ts   # Content aggregation
│   │       ├── parsers.ts      # LLM response parsers
│   │       └── storage.ts      # Supabase storage
│   ├── lib/
│   │   ├── openai.ts           # OpenAI client
│   │   ├── supabase.ts         # Supabase client
│   │   └── prompts.ts          # LLM prompt templates
│   └── types/
│       ├── creator-dna.ts      # Type definitions
│       ├── schemas.ts          # Zod validation schemas
│       └── database.ts         # Supabase types
├── supabase/
│   └── migrations/             # Database migrations
├── requirements.md
├── design.md
└── README.md
```

## 🎨 Key Features

### 1. Creator DNA Profile
Understand your unique creative identity through AI analysis of your content:
- Tone analysis (casual, professional, humorous, etc.)
- Humor classification (0-10 scale, including dark humor detection)
- Risk tolerance assessment
- Audience demographics and engagement patterns

### 2. Content Intelligence
- Generate content ideas that feel natural to your brand
- Predict audience emotional reactions before publishing
- Get confidence scores on predictions
- Receive risk assessments without censorship

### 3. Direct Monetization
- **UPI Payments**: Accept subscriptions, donations, and event payments
- **Automatic GST Compliance**: Generate legally compliant invoices
- **Revenue Opportunities**: AI-detected monetization suggestions
- **IP Licensing**: Optional micro-licensing for original content

### 4. Privacy & Consent First
- Explicit consent required for all data processing
- Granular control over data usage
- One-click consent revocation
- Full data export and deletion capabilities

## 🔬 Property-Based Testing

creatoros-ai uses **property-based testing** to ensure correctness across all inputs:
- 51 formal correctness properties
- Automated generation of hundreds of test cases
- Validates universal behaviors, not just specific examples
- Complements traditional unit testing

Example property:
```typescript
// Property 3: JSON storage round-trip
// For any ingested content item, storing and retrieving 
// should produce equivalent data with all fields preserved
```

## 🚀 Development Roadmap

### Phase 1: Launch (Months 0-6)
- LLM APIs for all AI components
- JSON-based data storage
- Single-region deployment
- UPI payment integration
- GST invoice automation

### Phase 2: Growth (Months 6-12)
- Caching layer implementation
- CDN for static content
- Auto-scaling infrastructure
- Rate limiting and queue management

### Phase 3: Scale (Months 12-24)
- Custom ML models for high-volume operations
- Hybrid LLM + custom model approach
- Multi-region deployment
- Advanced caching strategies

## 📊 Performance Targets

**Current (LLM-Based):**
- Creator DNA Profile generation: 30-60 seconds
- Content idea generation: 10-20 seconds
- Audience reaction prediction: 5-10 seconds
- Payment processing: 2-5 seconds

**Future (Custom Models):**
- Creator DNA Profile generation: 5-10 seconds
- Content idea generation: 2-5 seconds
- Audience reaction prediction: 1-2 seconds
- Payment processing: <2 seconds

## � Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn
- Supabase account
- OpenAI API key

### Installation

```bash
# Clone the repository
git clone https://github.com/nidhishmg/creatoros-ai.git
cd creatoros-ai

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local

# Add your API keys to .env.local
# NEXT_PUBLIC_SUPABASE_URL=
# NEXT_PUBLIC_SUPABASE_ANON_KEY=
# SUPABASE_SERVICE_ROLE_KEY=
# OPENAI_API_KEY=

# Run database migrations in Supabase SQL Editor
# (copy contents of supabase/migrations/001_creator_dna_schema.sql)

# Start development server
npm run dev
```

### API Usage

**Scan Creator DNA:**

```bash
curl -X POST http://localhost:3000/api/creator-dna/scan \
  -H "Content-Type: application/json" \
  -d '{
    "creator_id": "creator123",
    "posts": [
      {
        "content": "Just dropped a new video explaining quantum computing to my cat 😂",
        "post_type": "reel",
        "engagement": { "likes": 15000, "comments": 500, "shares": 200 },
        "comments_sample": ["This is hilarious!", "Actually learned something"],
        "posted_at": "2025-01-15T10:00:00Z"
      }
    ]
  }'
```

**Response:**

```json
{
  "success": true,
  "profile": {
    "creator_id": "creator123",
    "generated_at": "2025-01-31T12:00:00Z",
    "creator_dna": {
      "primary_tone": "educational",
      "humor_level": 7,
      "dark_humor_present": false,
      "risk_tolerance": "medium",
      "audience_type": "educational / learner-focused",
      "confidence": {
        "tone": 0.85,
        "humor": 0.78,
        "risk": 0.72,
        "audience": 0.80
      }
    }
  }
}
```

## �🔒 Security & Compliance

- **Encryption**: AES-256 at rest, TLS 1.3 in transit
- **Authentication**: Multi-factor authentication for creators
- **Payment Security**: PCI DSS compliance
- **Indian Regulations**: IT Act 2000, GST Act, Payment and Settlement Systems Act
- **Data Protection**: GDPR-inspired practices

## 🌍 Target Market

**Primary**: India (UPI + GST first)
**Future**: Globally extensible architecture

### User Personas
1. **Independent Creator** (10K-500K followers)
2. **Emerging Creator** (<10K followers)
3. **Established Creator/Organization** (500K+ followers)
4. **Audience Members** (supporting creators directly)

## 📖 Documentation

- **[requirements.md](requirements.md)** - Complete functional requirements with user stories
- **[design.md](design.md)** - Detailed system architecture, data models, and correctness properties

## 🤝 Contributing

This project is currently in the design and planning phase. Implementation contributions will be welcome once the core architecture is established.

## 📄 License

[To be determined]

## 🎯 Success Metrics

- Creator retention rate
- Monetization conversion rate
- AI suggestion acceptance rate
- Payment success rate (target: ≥99.9%)
- Reduction in creator decision time

## 💡 Philosophy

creatoros-ai believes in:
- **Human-in-the-loop**: AI advises, humans decide
- **Consent-first**: Your data, your control
- **Creator empowerment**: Direct relationships with your audience
- **Transparency**: Clear explanations of AI reasoning
- **No ownership claims**: Your ideas remain yours

---

**Built for creators, by understanding creators.**

For questions or feedback, please open an issue in this repository.
