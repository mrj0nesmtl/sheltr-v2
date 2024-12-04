# SHELTR V2: Transforming Charitable Giving for Homelessness

## Overview

**SHELTR V2** is a groundbreaking platform designed to revolutionize charitable giving for homelessness by leveraging the latest in **blockchain transparency**, **AI-driven insights**, **QR code donations**, and a **gamified engagement model**. Our mission is to empower homeless individuals, enhance donor confidence, and create a **sustainable pathway** to address homelessness at scale.

Built by **Arcana Concept**, SHELTR V2 operates as a **SaaS platform**, available as a **white-label solution** to shelters, NGOs, and other social service organizations worldwide, **free of cost**. The platform focuses on **transparency**, **accountability**, and **empowerment**, ensuring donations are securely and effectively used to make a meaningful impact.

## Key Features in Development

### 1. Blockchain Transparency & Public Ledger

- **Hybrid Approach**: While donations are processed via traditional payment gateways (e.g., **Stripe**, **PayPal**), **blockchain technology** is leveraged to serve as a **public ledger**, ensuring complete transparency.
- **Smart Contracts**: Automatic allocation of funds into three categories:
  - **80%** for participant essentials (e.g., food, clothing).
  - **15%** for a **housing fund**, invested in a high-yield ETF.
  - **5%** for **operational costs**, ensuring platform sustainability.

### 2. QR Code-Driven Donations

Each homeless participant receives a **unique QR code** linked to their digital wallet, making donations easy, personalized, and traceable.

- **Multi-Platform Payment Options**: Support for **Stripe**, **PayPal**, **Apple Pay**, and even **cryptocurrency wallets**.
- **Instant Donations**: Quick and secure payments, giving donors confidence in their contributions.

### 3. Financial Empowerment with AI

- **AI-Driven Financial Guidance**: Tools to help participants **track spending**, **manage savings**, and receive **personalized budgeting tips**.
- **High-Yield Housing Fund**: A portion of donations is invested in a housing fund until it reaches a level sufficient to support sustainable housing solutions.

### 4. Social Media Integration & Gamification

- **Social Media Sharing**: Integration with popular platforms like **Facebook**, **Instagram**, and **TikTok** to amplify the reach of donations.
- **Milestone Badges & Rewards**: Donors and participants unlock badges as they achieve specific milestones, creating an engaging community environment.

### 5. Homeless Depot: Shopify Integration

- **Branded Marketing Materials**: Participants can access **QR code cards**, **posters**, **branded apparel**, and **digital assets** to promote their donation links through **Homeless Depot**, integrated via Shopify.
- **Participant Access & Empowerment**: Participants order materials via their dashboard using **earned tokens** or available wallet funds.

### 6. Multi-Auth System for Different User Roles

- **Shelter Admin**: Manages participant onboarding, donations, and fund allocation.
- **Donors**: Seamless onboarding, transparent donation tracking, and tax receipt generation.
- **Participants**: Homeless individuals who receive funds directly into digital wallets.
- **Authentication & Security**: Managed via **Supabase**, with **Role-Based Access Control (RBAC)** for appropriate permissions.

### 7. Privacy & Compliance

- **Data Encryption**: **AES-256** encryption for data at rest, **TLS 1.3** for data in transit.
- **Compliance**: Full compliance with **GDPR** and **Canadian privacy standards**.
- **Decentralized Data Storage**: Potential future integration with **IPFS** for enhanced privacy.

## Technology Stack

### Frontend
- **React 18 & TypeScript** for dynamic, responsive UIs.
- **Vite** for optimized builds.
- **Tailwind CSS** for UI design.
- **React Router DOM** for efficient navigation.

### Backend
- **Supabase**: Provides authentication, database management (PostgreSQL), real-time subscriptions, and storage.
- **Payment Integrations**: **Stripe**, **PayPal**, **Apple Pay** for secure transactions.
- **Blockchain**: Ethereum-based or similar public blockchain used for transparency.

### State Management & Utility
- **Zustand** for efficient state management.
- **Zod** for type-safe data validation.
- **HTML5-QRCode** for generating and tracking participant-specific QR codes.
- **i18next** for internationalization (English & French).

### AI & Analytics Tools
- **OpenAI API** for financial guidance and budgeting.
- **Recharts** for the Impact Dashboard.
- **TensorFlow.js** for in-browser machine learning.

## Deployment & Scalability

### Deployment Strategy
- **CI/CD**: Leveraging **GitHub Actions** for continuous integration and deployment.
- **Hosting**: Initial deployment via **Replit** for prototyping, with production deployment planned on **Netlify** or **Vercel**.
- **Scalable Backend**: Using **Supabase** and **Stripe** for real-time data handling and payment scalability.

## Roadmap

### 1. Expansion of AI Capabilities
- **Advanced Budget Coaching**: Enhanced insights into spending patterns and housing fund allocation.

### 2. More White-Label Options
- **Partner Customization**: Allowing partner shelters to create branded versions of SHELTR, fully customized to their needs.

### 3. Additional Payment Integrations
- **Cryptocurrency**: Expand support for multiple cryptocurrencies, enhancing international donation options.

### 4. Enhanced Data Privacy Features
- **Decentralized Storage**: Further exploration into decentralized data storage with **IPFS** for enhanced privacy.

## Contribution & Acknowledgements

We thank our **angel investors** and partners for their generous support in bringing SHELTR to life. SHELTR V2 represents a concerted effort from developers, designers, community organizers, and technology enthusiasts to create a meaningful difference in the fight against homelessness.

## How to Contribute

We welcome contributors to join our mission to **hack homelessness** through technology. Please feel free to raise **issues**, submit **pull requests**, or discuss ideas in our **community forums**.

## License

SHELTR V2 is open-source under the **MIT License**. See [LICENSE](LICENSE) for details.

## Contact

For more information about **Arcana Concept** and our projects, visit:

- [Arcana Concept](https://www.arcanaconcept.com)
- [SHELTR Overview](https://www.arcanaconcept.com/concepts/sheltr)

---

Help us make a difference—together, we can **hackhomelessness** and empower communities through technology.
