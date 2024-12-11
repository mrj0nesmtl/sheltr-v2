import type { Translations } from '../types';

export const fr: Translations = {
  common: {
    tagline: 'Pirater l\'itinérance avec la technologie.',
    cta: {
      becomeDonor: 'Devenir Donateur',
      partnerWithUs: 'Devenir Partenaire',
      donateNow: 'Faire un Don',
      learnMore: 'En Savoir Plus',
      getStarted: 'Commencer',
      partnerNow: 'Devenir Partenaire'
    },
    signOut: "Déconnexion",
    loading: "Chargement...",
    actions: {
      edit: "Modifier",
      delete: "Supprimer",
      save: "Enregistrer",
      cancel: "Annuler"
    },
    refresh: "Actualiser",
  },
  nav: {
    solutions_menu: {
      title: 'Solutions',
      howItWorks: 'Comment ça Marche',
      howItWorksDesc: 'Découvrez comment notre plateforme transforme les dons',
      solutions: 'Solutions',
      solutionsDesc: 'Découvrez nos solutions innovantes pour donateurs et refuges',
      impact: 'Impact',
      impactDesc: 'Suivez et mesurez l\'impact réel de vos contributions'
    },
    company_menu: {
      title: 'Entreprise',
      about: 'À Propos',
      aboutDesc: 'Notre mission de révolutionner les dons caritatifs',
      blog: 'Blogue',
      blogDesc: 'Dernières nouvelles et mises à jour de SHELTR',
      whitepaper: 'Livre Blanc',
      whitepaperDesc: 'Détails techniques et architecture de la plateforme'
    },
    scanDonate: 'Scanner & Donner',
    signUp: 'S\'inscrire',
    login: 'Connexion',
    platform_menu: {
      title: 'Plateforme',
      dashboard: 'Tableau de Bord',
      dashboardDesc: 'Voir les analyses et métriques du système',
      userManagement: 'Gestion des Utilisateurs',
      userManagementDesc: 'Gérer les utilisateurs et les permissions',
      systemSettings: 'Paramètres Système',
      systemSettingsDesc: 'Configurer les paramètres de la plateforme',
      shelterDashboard: 'Tableau de Bord du Refuge',
      shelterDashboardDesc: 'Gérer les opérations du refuge',
      residentManagement: 'Gestion des Résidents',
      residentManagementDesc: 'Suivre et soutenir les résidents du refuge'
    },
    donor_menu: {
      title: 'Mes Dons',
      donationHistory: 'Historique des Dons',
      donationHistoryDesc: 'Consultez vos contributions et leur impact',
      personalImpact: 'Impact Personnel',
      personalImpactDesc: 'Voyez comment vos dons font la différence'
    },
    participant_menu: {
      title: 'Services',
      availableServices: 'Services Disponibles',
      availableServicesDesc: 'Parcourir les options de services et de soutien',
      serviceHistory: 'Historique des Services',
      serviceHistoryDesc: 'Suivez votre utilisation des services et vos progrès'
    },
    blog: 'Blog',
    blockchain: {
      title: "Blockchain",
      desc: "Explorer les fonctionnalités blockchain",
      menu: {
        whitepaper: "Livre Blanc",
        whitepaperDesc: "Documentation technique et vision",
        token: "Jeton $SHELTER",
        tokenDesc: "Économie et utilités du jeton",
        transactions: "Transactions",
        transactionsDesc: "Voir les transactions blockchain",
        depot: "Dépôt Sans-Abri",
        depotDesc: "Accéder aux ressources des participants"
      }
    },
    footer: {
      about: 'À Propos',
      contact: 'Contact',
      privacy: 'Confidentialité',
      terms: 'Conditions',
      copyright: '© {{year}} SHELTR. Tous droits réservés.'
    },
    language: 'Langue',
    closeMenu: 'Fermer le menu',
    profile: 'Profil',
    dashboard: 'Tableau de Bord',
    signOut: 'Déconnexion',
    about: 'À Propos',
    menu: 'Menu'
  },
  hero: {
    title: 'Pirater l\'itinérance',
    subtitle: 'Transformez les dons en actions concrètes grâce à la technologie blockchain et aux contrats intelligents pour soutenir directement les sans-abri avec transparence et responsabilité.',
    backgroundAlt: 'Personne dormant sur un banc',
    cta: {
      scan: 'Scanner & Donner',
      learnMore: 'En Savoir Plus',
      title: "Rejoignez le Mouvement pour Mettre Fin à l'Itinérance",
      description: "Faites un impact direct grâce à des dons sécurisés et transparents qui créent un changement durable."
    },
    features: {
      impact: {
        title: 'Impact Direct',
        description: 'Vos dons soutiennent directement les personnes dans le besoin grâce à des transactions blockchain sécurisées et transparentes.'
      },
      allocation: {
        title: 'Allocation Intelligente',
        description: 'Les fonds sont automatiquement distribués : 80% pour les besoins immédiats, 15% pour le logement et 5% pour les opérations.'
      },
      housing: {
        title: 'Focus sur le Logement',
        description: 'Chaque don contribue à un fonds dédié au logement, aidant à créer un changement durable.'
      },
      qr: {
        title: 'Technologie QR',
        description: 'Scannez des codes QR uniques pour faire des dons instantanés et sécurisés à des personnes spécifiques dans le besoin.'
      },
      security: {
        title: 'Sécurité Blockchain',
        description: 'Chaque transaction est sécurisée et vérifiée par la technologie blockchain, assurant une transparence totale.'
      },
      tracking: {
        title: 'Suivi d\'Impact',
        description: 'Surveillez vos contributions et voyez l\'impact réel de vos dons en temps réel.'
      }
    }
  },
  // Rest of the French translations remain unchanged...
  // Keeping all existing translations exactly as they were
  howItWorks: {
    title: 'Comment Fonctionne SHELTR',
    subtitle: 'Notre plateforme innovante combine la technologie blockchain avec un soutien direct pour créer un changement durable dans la vie des sans-abri.',
    steps: {
      scan: {
        title: '1. Scanner le Code QR',
        description: 'Chaque participant possède un code QR unique lié à son portefeuille numérique sécurisé. Il suffit de scanner pour commencer votre don.'
      },
      allocation: {
        title: '2. Allocation Intelligente',
        description: 'Votre don est automatiquement réparti : 80% pour les besoins immédiats, 15% pour le logement et 5% pour les opérations.'
      },
      processing: {
        title: '3. Traitement Sécurisé',
        description: 'La technologie blockchain assure un traitement des transactions transparent et sécurisé avec une responsabilité totale.'
      },
      housing: {
        title: '4. Fonds Logement',
        description: '15% des dons s\'accumulent dans un fonds logement, aidant les participants à travailler vers des solutions de logement stables.'
      }
    },
    transparency: {
      title: 'Transparence & Confiance',
      blockchain: {
        title: 'Vérifié par Blockchain',
        description: 'Chaque transaction est enregistrée sur la blockchain, assurant une transparence et une responsabilité totales.'
      },
      contracts: {
        title: 'Contrats Intelligents',
        description: 'La distribution automatisée des fonds par contrats intelligents garantit que votre don est utilisé comme prévu.'
      },
      tracking: {
        title: 'Suivi d\'Impact',
        description: 'Suivez l\'impact réel de vos dons avec notre système de reporting transparent.'
      }
    },
    cta: {
      title: 'Prêt à Faire la Différence ?',
      description: 'Rejoignez-nous pour révolutionner les dons caritatifs et créer un impact durable.'
    }
  },
  solutions: {
    title: 'Solutions pour Tous',
    subtitle: 'Des outils et fonctionnalités complets conçus pour maximiser l\'impact et assurer la transparence.',
    sections: {
      shelters: {
        title: 'Pour les Refuges & Organisations',
        features: [
          'Système de gestion des participants',
          'Suivi de l\'allocation des fonds',
          'Tableau de bord d\'impact',
          'Génération de codes QR',
          'Analytique en temps réel'
        ]
      },
      residents: {
        title: 'Pour les Participants',
        features: [
          'Portefeuille numérique sécurisé',
          'Suivi du fonds de logement',
          'Surveillance des progrès',
          'Connexions aux ressources',
          'Réseau de soutien'
        ]
      },
      tracking: {
        title: 'Pour les Donateurs',
        features: [
          'Transactions transparentes',
          'Visualisation de l\'impact',
          'Historique des dons',
          'Reçus fiscaux',
          'Engagement communautaire'
        ]
      }
    },
    partnership: {
      title: 'Avantages du Partenariat',
      technology: {
        title: 'Avantages Technologiques',
        features: [
          'Sécurité blockchain',
          'Automatisation des contrats intelligents',
          'Suivi en temps réel',
          'Analyse des données',
          'Accessibilité mobile'
        ]
      },
      support: {
        title: 'Support et Ressources',
        features: [
          'Support technique 24/7',
          'Matériel de formation',
          'Guide d\'implémentation',
          'Forums communautaires',
          'Mises à jour régulières'
        ]
      },
      engagement: {
        title: 'Impact Communautaire',
        features: [
          'Gestion des relations donateurs',
          'Outils de narration d\'impact',
          'Suivi des succès des participants',
          'Réseautage communautaire',
          'Intégration des médias sociaux'
        ]
      }
    },
    cta: {
      title: 'Rejoignez la Révolution',
      description: 'Faites partie de la solution pour mettre fin à l\'itinérance grâce à la technologie innovante.'
    }
  },
  signUp: {
    title: 'Rejoignez la Communauté SHELTR',
    subtitle: 'Choisissez comment vous voulez faire la différence',
    haveAccount: 'Vous avez déjà un compte ?',
    signIn: 'Se connecter',
    donor: {
      title: 'Devenir Donateur',
      description: 'Soutenez directement les individus et suivez votre impact avec notre système de dons transparent.',
      form: {
        title: 'Créer un Compte Donateur',
        email: 'Email',
        password: 'Mot de passe',
        confirmPassword: 'Confirmer le mot de passe',
        name: 'Nom complet',
        city: 'Ville',
        address: 'Adresse (Optionnel)',
        defaultDonation: 'Montant de don par défaut ($)',
        taxReceipt: 'Je souhaite recevoir des reçus fiscaux pour mes dons',
        submit: 'Créer le compte',
        submitting: 'Création du compte...'
      }
    },
    shelter: {
      title: 'Enregistrer Votre Refuge',
      description: 'Collaborez avec nous pour gérer les participants et suivre l\'allocation des fonds efficacement.',
      form: {
        title: 'Enregistrer Votre Refuge',
        organization: 'Nom de l\'organisation',
        registrationNumber: 'Numéro d\'enregistrement',
        email: 'Email',
        password: 'Mot de passe',
        confirmPassword: 'Confirmer le mot de passe',
        contactPhone: 'Téléphone de contact',
        city: 'Ville',
        address: 'Adresse',
        capacity: 'Capacité d\'accueil',
        services: {
          title: 'Services Proposés',
          options: {
            emergencyshelter: 'Hébergement d\'urgence',
            transitionalhousing: 'Logement de transition',
            foodservices: 'Services alimentaires',
            medicalcare: 'Soins médicaux',
            mentalhealthservices: 'Services de santé mentale',
            jobtraining: 'Formation professionnelle',
            casemanagement: 'Gestion de cas',
            substanceabusetreatment: 'Traitement des dpendances'
          }
        },
        submit: 'Enregistrer le refuge',
        submitting: 'Création du compte...'
      }
    }
  },
  footer: {
    tagline: 'Pirater l\'itinérance avec la technologie.',
    quickLinks: 'Liens Rapides',
    resources: 'Ressources',
    connect: 'Connecter',
    links: {
      howItWorks: 'Comment ça Marche',
      solutions: 'Nos Solutions',
      scanDonate: 'Scanner & Donner',
      blog: 'Blog',
      privacy: 'Confidentialité',
      terms: 'Conditions d\'Utilisation'
    },
    social: {
      linkedin: 'Suivez-nous sur LinkedIn',
      youtube: 'Regardez sur YouTube',
      tiktok: 'Suivez sur TikTok',
      website: 'Visitez notre site web',
      substack: 'Lisez notre Substack'
    },
    podcast: {
      latest: 'Dernier Épisode',
      listen: 'Écouter',
      listenOn: 'Écouter sur Spotify',
      duration: 'Durée',
      showName: 'SHELTR Podcast',
      description: 'Découvrez notre dernier épisode sur les solutions technologiques pour l\'itinérance'
    },
    copyright: '© {{year}} SHELTR.',
    rights: 'Tous droits réservés.',
    language: 'English'
  },
  whitepaper: {
    title: "Document Technique",
    sections: {
      overview: {
        title: "Aperçu",
        content: "SHELTR V2 est une plateforme révolutionnaire..."
      },
      vision: {
        title: "Vision et Mission",
        content: "La vision de SHELTR est de redéfinir..."
      },
      blockchain: {
        title: "Architecture Blockchain",
        sections: {
          smartContracts: "Infrastructure des Contrats Intelligents",
          tokenomics: "Économie des Jetons",
          verification: "Vérification des Transactions"
        }
      }
    }
  },
  impact: {
    title: "Créer un Impact Mesurable",
    subtitle: "Suivez en temps réel l'impact des contributions de notre communauté dans la transformation des vies grâce à la technologie blockchain transparente.",
    metrics: {
      monthlyGrowth: "Tendances de Croissance Mensuelle",
      successRates: "Métriques de Réussite",
      communityImpact: "Impact Communautaire",
      participantsHoused: "Participants Logés",
      citiesAndTowns: "Villes et Communes",
      donationIncrease: "Augmentation des Dons",
      categories: {
        housingPlacement: "Placement en Logement",
        jobPlacement: "Placement Professionnel",
        financialStability: "Stabilité Financière",
        healthcareAccess: "Accès aux Soins"
      },
      livesImpacted: "Vies Impactées",
      titles: {
        impactMetrics: "Métriques de Réussite du Programme",
        fundAllocation: "Allocation des Fonds",
        donationTrends: "Tendances des Dons"
      },
      labels: {
        housingSuccess: "Taux de Réussite du Logement",
        communityEngagement: "Engagement Communautaire",
        resourceUtilization: "Utilisation des Ressources"
      },
      title: "Métriques de Succès",
      description: "Suivez nos progrès dans les domaines clés",
      timeframe: "30 derniers jours"
    },
    cta: {
      title: "Faites Partie de l'Impact",
      description: "Rejoignez notre communauté grandissante de donateurs et de partenaires qui font une différence mesurable pour mettre fin à l'itinérance.",
      getStarted: "Commencer"
    },
    donationTrends: "Tendances des Dons",
    realtimeDonations: "Dons en Temps Réel",
    fundAllocation: "Allocation des Fonds",
    impactMetrics: "Métriques d'Impact",
    transactions: {
      title: "Transactions Blockchain",
      viewAll: "Voir Tout",
      timestamp: "Horodatage",
      type: "Type",
      amount: "Montant",
      status: "Statut",
      hash: "Hash de Transaction",
      types: {
        direct: "Support Direct",
        housing: "Fonds de Logement",
        operations: "Opérations"
      },
      statuses: {
        completed: "Complété",
        pending: "En Cours",
        failed: "Échoué"
      }
    },
    charts: {
      title: "Analyses d'Impact",
      monthlyGrowth: "Croissance Mensuelle",
      fundAllocation: "Allocation des Fonds",
      impactMetrics: "Métriques d'Impact"
    }
  },
  qrScanner: {
    title: "Scanner le Code QR pour Faire un Don",
    instructions: "Positionnez le code QR dans le cadre pour le scanner",
    scannerActive: "Le scanner est actif et prêt",
    retryButton: "Réessayer",
    errors: {
      cameraPermission: "Veuillez autoriser l'accès à la caméra pour scanner les codes QR",
      noCamera: "Aucune caméra trouvée sur votre appareil",
      cameraInUse: "La caméra est utilisée par une autre application",
      initialization: "Impossible d'initialiser le scanner QR"
    }
  },
  auth: {
    login: {
      title: "Connexion à SHELTR",
      email: "Adresse e-mail",
      password: "Mot de passe",
      signIn: "Se connecter",
      signingIn: "Connexion en cours...",
      noAccount: "Vous n'avez pas de compte ?",
      signUp: "S'inscrire",
      errors: {
        invalidCredentials: "Email ou mot de passe invalide",
        serverError: "Impossible de se connecter au serveur"
      }
    }
  },
  about: {
    title: 'À propos de SHELTR',
    intro: {
      title: 'Introduction à SHELTR',
      content: 'Découvrez notre mission de pirater l\'itinérance grâce à la technologie.'
    },
    readme: {
      title: 'Aperçu du Projet',
      content: 'Aperçu technique et instructions de configuration pour les développeurs.'
    },
    techstack: {
      title: 'Stack Technologique',
      content: 'Analyse détaillée de notre infrastructure technologique.'
    },
    whitepaper: {
      title: 'Livre Blanc',
      content: 'Documentation technique approfondie de la plateforme SHELTR.'
    }
  },
  dashboard: {
    title: "Tableau de Bord",
    lastLogin: "Dernière Connexion",
    never: "Jamais",
    loading: "Chargement...",
    roles: {
      participant: {
        title: "Tableau de Bord Participant",
        subtitle: "Suivez vos avantages et services",
        welcome: "Bienvenue sur votre tableau de bord participant",
        stats: {
          totalReceived: "Total Reçu",
          housingFund: "Fonds de Logement",
          totalDonations: "Total des Dons",
          activeServices: "Services Actifs",
          nextAppointment: "Prochain Rendez-vous",
          programProgress: "Progression du Programme"
        },
        qrCode: {
          title: "Votre Code QR",
          subtitle: "Partagez ce code pour recevoir des dons",
          shareText: "Partager votre code QR de don",
          downloadText: "Télécharger le code QR"
        }
      },
      admin: {
        title: "Tableau de Bord Administrateur",
        subtitle: "Gérez votre refuge",
        welcome: "Bienvenue, {{name}}",
        stats: {
          totalDonations: "Total des Dons",
          totalParticipants: "Total des Participants",
          activeParticipants: "Participants Actifs",
          totalTransactions: "Total des Transactions",
          participantGrowth: "Croissance des Participants",
          averageDonation: "Don Moyen",
          monthlyTrends: "Tendances Mensuelles",
          serviceDistribution: "Distribution des Services",
          recentActivity: "Activité Récente"
        }
      },
      donor: {
        title: "Tableau de Bord Donateur",
        subtitle: "Suivez votre impact",
        welcome: "Bienvenue sur votre tableau de bord donateur",
        stats: {
          totalDonated: "Total des Dons",
          impactScore: "Score d'Impact",
          donationCount: "Nombre de Dons",
          beneficiariesHelped: "Bénéficiaires Aidés",
          monthlyDonation: "Don Mensuel",
          yearlyContribution: "Contribution Annuelle"
        }
      }
    }
  },
  transaction: {
    status: {
      completed: 'Terminé',
      pending: 'En attente',
      failed: 'Échoué'
    }
  },
  support: {
    needHelp: 'Besoin d\'aide ?',
    description: 'Notre équipe de support est là pour vous 24/7',
    callUs: 'Appelez-nous',
    callDescription: 'Parlez à un représentant du support',
    chatWithUs: 'Chattez avec nous',
    chatDescription: 'Obtenez de l\'aide instantanée de notre assistant IA',
    startChat: 'Démarrer le chat'
  },
  podcast: {
    preview: {
      listen: 'Écouter sur Spotify',
      latest: 'Dernier épisode',
      duration: 'Durée',
      date: 'Publié le',
      showName: 'Tomes of Arcana'
    }
  },
  home: {
    title: "Accueil",
    welcome: "Bienvenue sur SHELTR"
  },
  profile: {
    transactions: {
      title: "Transactions Récentes",
      empty: "Aucune transaction",
      monthly: "Don mensuel",
      oneTime: "Don unique",
      completed: "Terminé",
      pending: "En attente",
      failed: "Échoué"
    },
    stats: {
      title: "Vos Statistiques",
      totalDonations: "Total des Dons",
      totalAmount: "Montant Total",
      impactScore: "Score d'Impact",
      donationsCount: "Nombre de Dons"
    },
    friends: {
      title: "Amis",
      empty: "Aucun ami pour l'instant",
      add: "Ajouter un Ami",
      pending: "Demandes en Attente",
      activities: "Activités des Amis"
    },
    activity: {
      title: "Activité Récente",
      empty: "Aucune activité récente",
      donation: "a fait un don",
      referral: "a parrainé un ami",
      post: "a partagé une publication",
      impact: "a atteint un jalon d'impact"
    }
  },
  admin: {
    superAdmin: {
      title: "Tableau de Bord Super Admin",
      subtitle: "Analyses et gestion de la plateforme",
      userDistribution: {
        title: "Distribution des Utilisateurs",
        subtitle: "Répartition des utilisateurs par rle"
      },
      servicePerformance: {
        title: "Performance des Services",
        subtitle: "Analyse de l'utilisation et de l'impact des services"
      },
      shelterPerformance: {
        title: "Analyse de Performance des Refuges",
        subtitle: "Analyse comparative des opérations des refuges"
      },
      fundAllocation: {
        title: "Analyse de l'Attribution des Fonds",
        subtitle: "Comparaison des fonds levés et attribués par type d'utilisateur"
      }
    },
    userTypes: {
      donor: "Donateurs",
      participant: "Participants",
      shelterAdmin: "Administrateurs de Refuge",
      superAdmin: "Super Administrateurs",
      guest: "Invités"
    },
    stats: {
      totalShelters: "Total des Refuges",
      activeParticipants: "Participants Actifs",
      totalDonations: "Total des Dons",
      successRate: "Taux de Réussite",
      verifiedShelters: "refuges vérifiés",
      avgPerShelter: "moyenne par refuge",
      perParticipant: "par participant",
      aboveAverage: "Au-dessus de la moyenne du secteur"
    },
    dashboard: {
      title: "Tableau de Bord Admin",
      welcome: "Bienvenue sur votre tableau de bord"
    },
    shelter: {
      title: "Tableau de Bord du Refuge",
      subtitle: "Gérez votre refuge",
      welcome: "Bienvenue, {{name}}",
      donors: {
        title: "Donateurs",
        export: "Exporter",
        name: "Nom",
        totalDonated: "Total des Dons",
        lastDonation: "Dernier Don",
        frequency: "Fréquence",
        status: "Statut"
      },
      participants: {
        title: "Participants",
        add: "Ajouter un Participant",
        name: "Nom",
        status: "Statut",
        joinDate: "Date d'inscription",
        totalReceived: "Total Reçu",
        qrCode: "Code QR",
        loginToken: "Jeton de Connexion",
        viewDetails: "Voir les Détails",
        statuses: {
          active: "Actif",
          inactive: "Inactif",
          pending: "En Attente"
        }
      }
    },
    participant: {
      registration: {
        title: 'Inscrire un Nouveau Participant',
        steps: {
          personal: 'Informations Personnelles',
          contact: 'Contact',
          needs: 'Évaluation des Besoins',
          verification: 'Vérification'
        },
        form: {
          firstName: 'Prénom',
          lastName: 'Nom',
          dateOfBirth: 'Date de Naissance',
          gender: {
            label: 'Genre',
            options: {
              male: 'Homme',
              female: 'Femme',
              other: 'Autre',
              preferNotToSay: 'Préfère ne pas dire'
            }
          },
          email: 'Adresse Email',
          phone: 'Numéro de Téléphone',
          emergency: {
            title: 'Contact d\'Urgence',
            name: 'Nom du Contact',
            phone: 'Téléphone du Contact',
            relationship: 'Relation'
          },
          housing: {
            label: 'Situation de Logement',
            options: {
              emergency: 'Refuge d\'Urgence',
              transitional: 'Logement de Transition',
              atRisk: 'À Risque',
              permanent: 'Logement Permanent',
              street: 'Sans Abri'
            }
          },
          employment: {
            label: 'Situation Professionnelle',
            options: {
              unemployed: 'Sans Emploi',
              partTime: 'Temps Partiel',
              fullTime: 'Temps Plein',
              selfEmployed: 'Travailleur Indépendant',
              unableToWork: 'Incapable de Travailler',
              retired: 'Retraité'
            }
          }
        }
      }
    }
  }
};