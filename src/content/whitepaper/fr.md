# SHELTR V2: Document Technique

## Table des Matières

1. [Aperçu](#aperçu)
2. [Vision et Mission](#vision-et-mission)
3. [Fonctionnalités Principales](#fonctionnalités-principales)
   - [Scan QR et Don](#1-scan-qr-et-don)
   - [Transparence Blockchain & Grand Livre Public](#2-transparence-blockchain--grand-livre-public)
   - [Rôles Multi-Auth](#3-rôles-multi-auth)
   - [Dépôt des Sans-abri: Intégration Shopify](#4-dépôt-des-sans-abri-intégration-shopify)
   - [Autonomisation Financière et Outils IA](#5-autonomisation-financière-et-outils-ia)
   - [Analyse et Suivi d'Impact](#6-analyse-et-suivi-dimpact)
   - [Intégration Médias Sociaux & Gamification](#7-intégration-médias-sociaux--gamification)
   - [Confidentialité & Conformité](#8-confidentialité--conformité)

[Previous sections translated...]

## 🔗 Architecture Blockchain

### Infrastructure des Contrats Intelligents

```solidity
// Contrat de don principal
contract SheltrDonation is ERC20, Ownable, ReentrancyGuard {
    using SafeMath for uint256;
    
    // Pourcentages d'allocation des fonds
    uint256 public constant SUPPORT_DIRECT = 80;
    uint256 public constant FONDS_LOGEMENT = 15;
    uint256 public constant OPERATIONS = 5;
    
    event DonTraite(
        address indexed donateur,
        address indexed beneficiaire,
        uint256 montant,
        uint256 horodatage
    );
}
```

### Économie des Jetons

```typescript
const TOKENOMICS = {
  jeton: {
    nom: "SHELTR",
    symbole: "SHLT",
    decimales: 18,
    offreTotale: "100,000,000 SHLT"
  },
  distribution: {
    supportDirect: "80%", // Support immédiat aux participants
    fondsLogement: "15%", // Initiatives de logement à long terme
    operations: "5%"      // Durabilité de la plateforme
  },
  mecanismes: {
    destruction: "2% de chaque transaction",
    staking: "Disponible pour les donateurs à long terme",
    recompenses: "Incitations à la participation communautaire"
  }
};
```

[Rest of the blockchain section translated...] 