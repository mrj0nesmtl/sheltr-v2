<div align="center">

![SHELTR](https://img.shields.io/badge/SHELTR-V2-blue)
![Version](https://img.shields.io/badge/Version-0.4.0-orange)
![Stage](https://img.shields.io/badge/Stage-Alpha-red)
![License](https://img.shields.io/badge/License-MIT-purple)
[![Listen on Spotify](https://img.shields.io/badge/Listen_on-Spotify-1DB954?logo=spotify)](https://open.spotify.com/show/3Q2RpnzF9sUv26yPMP9tWI)

</div>

## 🌟 Overview

**SHELTR V2** is a groundbreaking platform designed to revolutionize charitable giving for homelessness by leveraging the latest in **blockchain transparency**, **AI-driven insights**, **QR code donations**, and a **gamified engagement model**. Our mission is to empower homeless individuals, enhance donor confidence, and create a **sustainable pathway** to address homelessness at scale. Sheltr is an innovative platform leveraging modern web technologies to revolutionize charitable giving. Built with React 18, TypeScript, and Supabase, it implements role-based authentication, real-time analytics, and blockchain transparency to create a secure and efficient donation ecosystem.

## ⚡ Current Implementation Status

### 🔐 Authentication System (Stable)
- ✅ Role-based access control
- ✅ Session persistence
- ✅ Profile management
- ✅ Protected routes

### 🧭 Navigation System (In Progress)
- ✅ Basic routing framework
- ✅ Desktop/Mobile navigation
- ⚠️ Mobile responsiveness optimization needed
- ✅ Role-based menu items

### 📱 QR Scanner (In Development)
- ❌ Camera permissions pending
- ❌ HTML5-QRCode integration
- ❌ Error handling
- ❌ Loading states

## ⚡ Key Features in Development

### 🔄 1. QR Code-Driven Donations

Each homeless participant receives a **unique QR code** linked to their digital wallet, making donations easy, personalized, and traceable.

- **Multi-Platform Payment Options**: Support for **Stripe**, **PayPal**, **Apple Pay**, and even **cryptocurrency wallets**.
- **Instant Donations**: Quick and secure payments, giving donors confidence in their contributions.

### 🔗 2. Blockchain Transparency & Public Ledger

- **Hybrid Approach**: While donations are processed via traditional payment gateways (e.g., **Stripe**, **PayPal**), **blockchain technology** is leveraged to serve as a **public ledger**, ensuring complete transparency.
- **Smart Contracts**: Automatic allocation of funds into three categories:
  - **80%** for participant essentials (e.g., food, clothing).
  - **15%** for a **housing fund**, invested in a high-yield ETF.
  - **5%** for **operational costs**, ensuring platform sustainability.


### 🤖 3. Financial Empowerment with AI

- **AI-Driven Financial Guidance**: Tools to help participants **track spending**, **manage savings**, and receive **personalized budgeting tips**.
- **High-Yield Housing Fund**: A portion of donations is invested in a housing fund until it reaches a level sufficient to support sustainable housing solutions.

### 🎮 4. Social Media Integration & Gamification

- **Social Media Sharing**: Integration with popular platforms like **Facebook**, **Instagram**, and **TikTok** to amplify the reach of donations.
- **Milestone Badges & Rewards**: Donors and participants unlock badges as they achieve specific milestones, creating an engaging community environment.

### 🛍️ 5. Homeless Depot: Shopify Integration

- **Branded Marketing Materials**: Participants can access **QR code cards**, **posters**, **branded apparel**, and **digital assets** to promote their donation links through **Homeless Depot**, integrated via Shopify.
- **Participant Access & Empowerment**: Participants order materials via their dashboard using **earned tokens** or available wallet funds.

### 🔐 6. Multi-Auth System for Different User Roles

- **Shelter Admin**: Manages participant onboarding, donations, and fund allocation.
- **Donors**: Seamless onboarding, transparent donation tracking, and tax receipt generation.
- **Participants**: Homeless individuals who receive funds directly into digital wallets.
- **Authentication & Security**: Managed via **Supabase**, with **Role-Based Access Control (RBAC)** for appropriate permissions.

### 🛡️ 7. Privacy & Compliance

- **Data Encryption**: **AES-256** encryption for data at rest, **TLS 1.3** for data in transit.
- **Compliance**: Full compliance with **GDPR** and **Canadian privacy standards**.
- **Decentralized Data Storage**: Potential future integration with **IPFS** for enhanced privacy.

## 🛠️ Technology Stack (Current Implementation)

### 🎨 Frontend (Implemented)
- ✅ React 18 & TypeScript
- ✅ Tailwind CSS for styling
- ✅ React Router DOM v6
- ⚠️ Mobile responsiveness in progress

### ⚙️ Backend & Authentication (Partial)
- ✅ Supabase Authentication
- ✅ Role-based access control
- ✅ PostgreSQL database setup
- ❌ Payment integrations pending
- ❌ Blockchain integration pending

### 📦 State Management & Utilities (In Progress)
- ✅ Zustand for state management
- ✅ Zod for type validation
- ❌ HTML5-QRCode implementation pending
- ⚠️ i18next implementation started

### 🧠 AI & Analytics (Planned)
- ❌ OpenAI API integration pending
- ❌ Impact Dashboard pending
- ❌ TensorFlow.js integration planned

## 🚀 Current Development Status

### Completed Features (v0.4.0)
- ✅ Authentication system with role-based access
- ✅ Basic navigation framework
- ✅ Component architecture foundation
- ✅ Type safety improvements
- ✅ Layout system structure

### In Progress
- 🔄 QR Scanner implementation
- 🔄 Mobile responsive design
- 🔄 Dashboard development
- 🔄 Profile management features

### Upcoming Sprint Goals
1. Complete QR scanner integration
2. Implement role-specific dashboards
3. Add real-time updates
4. Enhance mobile experience

## 🗺️ Immediate Roadmap

### Phase 1 (Current - v0.4.0)
- Complete core authentication and navigation
- Implement QR scanner functionality
- Establish dashboard framework
- Optimize mobile experience

### Phase 2 (Upcoming - v0.5.0)
- Payment integration implementation
- Initial analytics dashboard
- Profile management enhancement
- Real-time updates system

## 🤝 Contribution & Acknowledgements

<div align="center">

[![GitHub Stars](https://img.shields.io/github/stars/arcanaconcept/sheltr-V2?style=social)](https://github.com/arcanaconcept/sheltr-V2)
[![Follow on LinkedIn](https://img.shields.io/badge/Follow-LinkedIn-0077B5?logo=linkedin)](https://www.linkedin.com/company/arcana-concept)
[![YouTube Channel](https://img.shields.io/badge/Watch-YouTube-FF0000?logo=youtube)](https://www.youtube.com/@ArcanaConcept)

</div>

We thank our **angel investors** and partners for their generous support in bringing SHELTR to life. SHELTR V2 represents a concerted effort from developers, designers, community organizers, and technology enthusiasts to create a meaningful difference in the fight against homelessness.

## 📝 How to Contribute

```bash
# Clone the repository
git clone https://github.com/arcanaconcept/sheltr-V2.git

# Install dependencies
npm install

# Start development server
npm run dev
```

We welcome contributors to join our mission to **hack homelessness** through technology. Please feel free to:
- 🐛 Report bugs
- 💡 Suggest features
- 🔧 Submit pull requests
- 💬 Join discussions

## 📄 License

SHELTR V2 is open-source under the **MIT License**. See [LICENSE](LICENSE) for details.

## 📱 Connect With Us

<div align="center">

[![Website](https://img.shields.io/badge/Visit-Website-blue?logo=google-chrome)](https://www.arcanaconcept.com)
[![Spotify](https://img.shields.io/badge/Listen-Podcast-1DB954?logo=spotify)](https://open.spotify.com/show/3Q2RpnzF9sUv26yPMP9tWI)
[![TikTok](https://img.shields.io/badge/Follow-TikTok-000000?logo=tiktok)](https://tiktok.com/@arcanaconcept)

</div>

For more information about **Arcana Concept** and our projects:
- 🌐 [Arcana Concept](https://www.arcanaconcept.com)
- 📚 [SHELTR Overview](https://www.arcanaconcept.com/concepts/sheltr)
- 🎧 [Listen to our Podcast](https://open.spotify.com/show/3Q2RpnzF9sUv26yPMP9tWI)

---

<div align="center">

**Help us make a difference—together, we can #hackhomelessness and empower communities through technology.**

</div>
