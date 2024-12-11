import type { Translations } from '../types';

export const en: Translations = {
  common: {
    tagline: 'Hacking Homelessness with Technology.',
    cta: {
      becomeDonor: 'Become a Donor',
      partnerWithUs: 'Partner with Us',
      donateNow: 'Donate Now',
      learnMore: 'Learn More',
      getStarted: 'Get Started',
      partnerNow: 'Partner Now'
    },
    signOut: "Sign Out",
    loading: "Loading...",
    actions: {
      edit: "Edit",
      delete: "Delete",
      save: "Save",
      cancel: "Cancel"
    },
    refresh: "Refresh"
  },
  nav: {
    howItWorks: 'How It Works',
    solutions: 'Solutions',
    scanDonate: 'Scan & Donate',
    impact: 'Impact',
    signUp: 'Sign Up',
    login: 'Login',
    profile: 'Profile',
    dashboard: 'Dashboard',
    signOut: 'Sign Out',
    about: 'About',
    solutions_menu: {
      title: 'Solutions',
      howItWorks: 'How It Works',
      howItWorksDesc: 'Learn how our platform transforms charitable giving',
      solutions: 'Solutions',
      solutionsDesc: 'Discover our innovative solutions for donors and shelters',
      impact: 'Impact',
      impactDesc: 'Track and measure the real impact of your contributions'
    },
    company_menu: {
      title: 'Company',
      about: 'About',
      aboutDesc: 'Our mission to revolutionize charitable giving',
      blog: 'Blog',
      blogDesc: 'Latest news and updates from SHELTR',
      whitepaper: 'Whitepaper',
      whitepaperDesc: 'Technical details and platform architecture'
    },
    platform_menu: {
      title: 'Platform',
      dashboard: 'Dashboard',
      dashboardDesc: 'View system-wide analytics and metrics',
      userManagement: 'User Management',
      userManagementDesc: 'Manage platform users and permissions',
      systemSettings: 'System Settings',
      systemSettingsDesc: 'Configure platform settings and preferences',
      shelterDashboard: 'Shelter Dashboard',
      shelterDashboardDesc: 'Manage your shelter operations',
      residentManagement: 'Resident Management',
      residentManagementDesc: 'Track and support shelter residents'
    },
    donor_menu: {
      title: 'My Donations',
      donationHistory: 'Donation History',
      donationHistoryDesc: 'View your past contributions and impact',
      personalImpact: 'Personal Impact',
      personalImpactDesc: 'See how your donations make a difference'
    },
    participant_menu: {
      title: 'Services',
      availableServices: 'Available Services',
      availableServicesDesc: 'Browse services and support options',
      serviceHistory: 'Service History',
      serviceHistoryDesc: 'Track your service usage and progress'
    },
    menu: 'Menu',
    blog: 'Blog',
    blockchain: {
      title: "Blockchain",
      desc: "Explore blockchain features",
      menu: {
        whitepaper: "White Paper",
        whitepaperDesc: "Technical details and platform architecture",
        token: "$SHELTER Token",
        tokenDesc: "Token economics and utilities",
        transactions: "Transactions",
        transactionsDesc: "View blockchain transactions",
        depot: "Homeless Depot",
        depotDesc: "Access participant resources"
      }
    },
    home: 'Home',
    adminDashboard: 'Admin Dashboard',
    myDonations: 'My Donations',
    profile_menu: {
      title: "Profile",
      profile: "My Profile",
      profileDesc: "View and edit your profile information",
      settings: "Settings",
      settingsDesc: "Manage your account settings and preferences"
    },
    language: 'Language',
    closeMenu: 'Close menu'
  },
  hero: {
    mainTitle: "Transform Charitable Giving",
    subtitle: 'Transform donations into meaningful actions using blockchain technology and smart contracts to directly support homeless individuals with transparency and accountability.',
    backgroundAlt: 'Person sleeping on bench',
    cta: {
      scan: 'Scan & Donate',
      learnMore: 'Learn More',
      title: "Join the Movement to End Homelessness",
      description: "Make a direct impact through secure, transparent donations that create lasting change."
    },
    features: {
      impact: {
        title: 'Direct Impact',
        description: 'Your donations directly support individuals in need through secure, transparent blockchain transactions.'
      },
      allocation: {
        title: 'Smart Allocation',
        description: 'Funds are automatically distributed: 80% for immediate needs, 15% for housing, and 5% for operations.'
      },
      housing: {
        title: 'Housing Focus',
        description: 'Every donation contributes to a dedicated housing fund, helping create lasting change.'
      },
      qr: {
        title: 'QR Technology',
        description: 'Scan unique QR codes to make instant, secure donations to specific individuals in need.'
      },
      security: {
        title: 'Blockchain Security',
        description: 'Every transaction is secured and verified through blockchain technology, ensuring complete transparency.'
      },
      tracking: {
        title: 'Impact Tracking',
        description: 'Monitor your contributions and see the real impact of your donations in real-time.'
      }
    },
    title: "Transform Charitable Giving",
    qrTechnology: "Scan & Give Instantly",
    directImpact: "Direct Impact on Lives",
    smartAllocation: "Smart Fund Allocation",
    housingFocus: "Housing First Approach",
    blockchainSecurity: "Secure Blockchain Tech",
    impactTracking: "Track Your Impact"
  },
  // Rest of the English translations remain unchanged...
  // Keeping all existing translations exactly as they were
  howItWorks: {
    title: 'How SHELTR Works',
    subtitle: 'Our innovative platform combines blockchain technology with direct support to create lasting change in the lives of homeless individuals.',
    steps: {
      scan: {
        title: '1. Scan QR Code',
        description: 'Each participant has a unique QR code linked to their secure digital wallet. Simply scan to start your donation.'
      },
      allocation: {
        title: '2. Smart Allocation',
        description: 'Your donation is automatically split: 80% for immediate needs, 15% for housing, and 5% for operations.'
      },
      processing: {
        title: '3. Secure Processing',
        description: 'Blockchain technology ensures transparent and secure transaction processing with complete accountability.'
      },
      housing: {
        title: '4. Housing Fund',
        description: '15% of donations accumulate in a housing fund, helping participants work towards stable housing solutions.'
      }
    },
    transparency: {
      title: 'Transparency & Trust',
      blockchain: {
        title: 'Blockchain Verified',
        description: 'Every transaction is recorded on the blockchain, ensuring complete transparency and accountability.'
      },
      contracts: {
        title: 'Smart Contracts',
        description: 'Automated fund distribution through smart contracts ensures your donation is used as intended.'
      },
      tracking: {
        title: 'Impact Tracking',
        description: 'Track the real impact of your donations with our transparent reporting system.'
      }
    },
    cta: {
      title: 'Ready to Make a Difference?',
      description: 'Join us in revolutionizing charitable giving and creating lasting impact.'
    }
  },
  solutions: {
    title: 'Solutions for Everyone',
    subtitle: 'Comprehensive tools and features designed to maximize impact and ensure transparency.',
    sections: {
      shelters: {
        title: 'For Shelters & Organizations',
        features: [
          'Participant management system',
          'Fund allocation tracking',
          'Impact reporting dashboard',
          'QR code generation',
          'Real-time analytics'
        ]
      },
      residents: {
        title: 'For Participants',
        features: [
          'Secure digital wallet',
          'Housing fund tracking',
          'Progress monitoring',
          'Resource connections',
          'Support network'
        ]
      },
      tracking: {
        title: 'For Donors',
        features: [
          'Transparent transactions',
          'Impact visualization',
          'Donation history',
          'Tax receipts',
          'Community engagement'
        ]
      }
    },
    benefits: {
      technology: {
        title: 'Technology Benefits',
        features: [
          'Blockchain security',
          'Smart contract automation',
          'Real-time tracking',
          'Data analytics',
          'Mobile accessibility'
        ]
      },
      support: {
        title: 'Support & Resources',
        features: [
          '24/7 technical support',
          'Training materials',
          'Implementation guidance',
          'Community forums',
          'Regular updates'
        ]
      }
    },
    partnership: {
      title: "Partnership Benefits",
      technology: {
        title: "Technology Benefits",
        features: [
          "Blockchain security",
          "Smart contract automation",
          "Real-time tracking",
          "Data analytics",
          "Mobile accessibility"
        ]
      },
      support: {
        title: "Support & Resources",
        features: [
          "24/7 technical support",
          "Training materials",
          "Implementation guidance",
          "Community forums",
          "Regular updates"
        ]
      },
      engagement: {
        title: "Community Impact",
        features: [
          "Donor relationship management",
          "Impact storytelling tools",
          "Participant success tracking",
          "Community networking",
          "Social media integration"
        ]
      }
    },
    cta: {
      title: "Join the Revolution",
      description: "Be part of the solution to end homelessness through innovative technology."
    }
  },
  signUp: {
    title: 'Join the SHELTR Community',
    subtitle: 'Choose how you want to make a difference',
    haveAccount: 'Already have an account?',
    signIn: 'Sign in',
    donor: {
      title: 'Become a Donor',
      description: 'Support individuals directly and track your impact with our transparent donation system.',
      form: {
        title: 'Create Donor Account',
        email: 'Email',
        password: 'Password',
        confirmPassword: 'Confirm Password',
        name: 'Full Name',
        city: 'City',
        address: 'Address (Optional)',
        defaultDonation: 'Default Donation Amount ($)',
        taxReceipt: 'I would like to receive tax receipts for my donations',
        submit: 'Create Account',
        submitting: 'Creating Account...'
      }
    },
    shelter: {
      title: 'Register Your Shelter',
      description: 'Partner with us to manage participants and track fund allocation effectively.',
      form: {
        title: 'Register Your Shelter',
        organization: 'Organization Name',
        registrationNumber: 'Registration Number',
        email: 'Email',
        password: 'Password',
        confirmPassword: 'Confirm Password',
        contactPhone: 'Contact Phone',
        city: 'City',
        address: 'Address',
        capacity: 'Shelter Capacity',
        services: {
          title: 'Services Offered',
          options: {
            emergencyshelter: 'Emergency Shelter',
            transitionalhousing: 'Transitional Housing',
            foodservices: 'Food Services',
            medicalcare: 'Medical Care',
            mentalhealthservices: 'Mental Health Services',
            jobtraining: 'Job Training',
            casemanagement: 'Case Management',
            substanceabusetreatment: 'Substance Abuse Treatment'
          }
        },
        submit: 'Register Shelter',
        submitting: 'Creating Account...'
      }
    }
  },
  footer: {
    tagline: 'Hacking Homelessness with Technology.',
    quickLinks: 'Quick Links',
    resources: 'Resources',
    connect: 'Connect',
    links: {
      howItWorks: 'How It Works',
      solutions: 'Our Solutions',
      scanDonate: 'Scan & Donate',
      blog: 'Blog',
      privacy: 'Privacy Policy',
      terms: 'Terms of Service'
    },
    social: {
      linkedin: 'Follow on LinkedIn',
      youtube: 'Watch on YouTube',
      tiktok: 'Follow on TikTok',
      website: 'Visit Website',
      substack: 'Read on Substack'
    },
    podcast: {
      latest: 'Latest Episode',
      listen: 'Listen',
      listenOn: 'Listen on Spotify',
      duration: 'Duration',
      showName: 'SHELTR Podcast',
      description: 'Discover our latest episode about tech solutions for homelessness'
    },
    copyright: '© {{year}} SHELTR.',
    rights: 'All rights reserved.',
    language: 'Français'
  },
  whitepaper: {
    title: 'SHELTR Whitepaper: Revolutionizing Charitable Giving for Homelessness',
    toc: {
      title: 'Table of Contents',
      introduction: 'Introduction',
      technology: 'Core Technology & Architecture',
      userflow: 'User Flow & Onboarding',
      depot: 'Homeless Depot',
      financial: 'Financial Empowerment',
      social: 'Social Media Integration',
      operations: 'Backend Operations',
      legal: 'Legal & Compliance',
      marketing: 'Marketing & Outreach',
      conclusion: 'Conclusion'
    },
    sections: {
      introduction: {
        title: 'Introduction',
        vision: {
          title: 'Vision and Mission',
          content: 'SHELTR\'s vision is to redefine charitable giving by leveraging advanced technology to create a secure, intelligent, and scalable platform that directly supports homeless individuals. By utilizing technologies like blockchain, AI, and financial tools, SHELTR empowers participants, promotes accountability, and drives long-term solutions to homelessness.'
        }
      },
      technology: {
        title: 'Core Technology & Architecture',
        blockchain: {
          title: 'Blockchain Transparency & Smart Contracts',
          content: 'SHELTR uses blockchain technology for public verification and fund tracking, creating a transparent ledger for donations. Smart contracts automate the allocation of each donation into three categories.',
          allocation: {
            direct: '80% to Participant Wallet: For purchasing essentials like food, clothing, and hygiene items',
            housing: '15% Rent Fund: To support participants in their housing journey',
            operations: '5% for Operational Costs: To sustain SHELTR\'s growth'
          }
        }
      }
    }
  },
  impact: {
    title: "Making a Measurable Difference",
    subtitle: "Track the real-time impact of our community's contributions in transforming lives through transparent blockchain technology.",
    metrics: {
      monthlyGrowth: "Monthly Growth Trends",
      successRates: "Success Metrics",
      communityImpact: "Community Impact",
      participantsHoused: "Participants Housed",
      citiesAndTowns: "Cities & Towns",
      donationIncrease: "Increase in Donations",
      categories: {
        housingPlacement: "Housing Placement",
        jobPlacement: "Job Placement",
        financialStability: "Financial Stability",
        healthcareAccess: "Healthcare Access"
      },
      livesImpacted: "Lives Impacted"
    },
    cta: {
      title: "Be Part of the Impact",
      description: "Join our growing community of donors and partners making a measurable difference in ending homelessness.",
      getStarted: "Get Started"
    },
    transactions: {
      title: "Blockchain Transactions",
      viewAll: "View All",
      timestamp: "Timestamp",
      type: "Type",
      amount: "Amount",
      status: "Status",
      hash: "Transaction Hash",
      types: {
        direct: "Direct Support",
        housing: "Housing Fund",
        operations: "Operations"
      },
      statuses: {
        completed: "Completed",
        pending: "Pending",
        failed: "Failed"
      }
    },
    donationTrends: "Donation Trends",
    charts: {
      title: "Impact Analytics",
      monthlyGrowth: "Monthly Growth",
      fundAllocation: "Fund Allocation",
      impactMetrics: "Program Success Metrics"
    },
    titles: {
      impactMetrics: "Program Success Metrics",
      fundAllocation: "Fund Allocation",
      donationTrends: "Donation Trends"
    },
    labels: {
      housingSuccess: "Housing Success Rate",
      communityEngagement: "Community Engagement",
      resourceUtilization: "Resource Utilization"
    }
  },
  qrScanner: {
    title: 'Scan QR Code',
    instructions: 'Point your camera at a participant\'s QR code',
    scannerActive: 'Scanner is active',
    retryButton: 'Try Again',
    errors: {
      cameraPermission: 'Camera access denied. Please enable camera access to scan QR codes.',
      initialization: 'Failed to initialize scanner. Please try again.',
      invalidCode: 'Invalid QR Code',
      invalidCodeDesc: 'This QR code is not valid or has expired. Please try scanning a valid participant QR code.'
    }
  },
  auth: {
    login: {
      title: "Sign In to SHELTR",
      email: "Email",
      password: "Password",
      signIn: "Sign In",
      signingIn: "Signing in...",
      noAccount: "Don't have an account?",
      signUp: "Sign up",
      errors: {
        invalidCredentials: "Invalid email or password",
        serverError: "Unable to connect to server"
      }
    }
  },
  about: {
    title: "About SHELTR",
    subtitle: "Hacking Homelessness with Tech-4-Good",
    intro: {
      title: "Introduction",
      expand: "Read More",
      collapse: "Show Less",
      abstract: "SHELTR is revolutionizing charitable giving through blockchain technology, creating direct connections between donors and individuals experiencing homelessness."
    },
    roadmap: {
      title: "Project Roadmap",
      subtitle: "Our development journey and milestones"
    },
    checkpoint: {
      title: "Development Status",
      subtitle: "Current progress and metrics"
    },
    techStack: {
      title: "Technology Stack",
      subtitle: "Powering SHELTR's Innovation",
      sections: {
        frontend: "Frontend Technologies",
        backend: "Backend Infrastructure",
        blockchain: "Blockchain Integration",
        auth: "Authentication & Security",
        mobile: "Mobile & PWA",
        devops: "DevOps & Deployment"
      }
    },
    whitepaper: {
      title: "White Paper & Tokenomics",
      subtitle: "Technical Documentation",
      abstract: "A comprehensive overview of SHELTR's blockchain-based charitable giving platform, detailing our technical architecture, tokenomics, and implementation strategy.",
      readMore: "Read Full White Paper",
      toc: {
        title: "Table of Contents",
        sections: {
          intro: "Introduction",
          tech: "Technical Architecture",
          tokenomics: "Tokenomics & Economics",
          implementation: "Implementation Strategy",
          roadmap: "Development Roadmap",
          conclusion: "Conclusion"
        }
      }
    }
  },
  transaction: {
    status: {
      completed: 'Completed',
      pending: 'Pending',
      failed: 'Failed'
    }
  },
  support: {
    needHelp: 'Need Help?',
    description: 'Our support team is here to help you 24/7',
    callUs: 'Call Us',
    callDescription: 'Speak with a support representative',
    chatWithUs: 'Chat With Us',
    chatDescription: 'Get instant help from our AI assistant',
    startChat: 'Start Chat'
  },
  podcast: {
    preview: {
      listen: 'Listen on Spotify',
      latest: 'Latest Episode',
      duration: 'Duration',
      date: 'Released',
      showName: 'Tomes of Arcana'
    }
  },
  dashboard: {
    donor: {
      title: 'Donor Dashboard',
      subtitle: 'Track your impact',
      welcome: 'Welcome to your donor dashboard',
      stats: {
        totalDonated: 'Total Donated',
        impactScore: 'Impact Score',
        donationCount: 'Number of Donations',
        beneficiariesHelped: 'Beneficiaries Helped',
        monthlyDonation: 'Monthly Donation',
        yearlyContribution: 'Yearly Contribution',
        recentDonations: 'Recent Donations'
      },
      impact: {
        title: 'Your Impact',
        subtitle: 'See how you are making a difference',
        metrics: {
          peopleHelped: 'People Helped',
          servicesProvided: 'Services Provided',
          communitiesServed: 'Communities Served'
        }
      }
    },
    totalDonated: 'Total Donated',
    impactScore: 'Impact Score',
    totalDonations: 'Total Donations',
    participant: {
      title: 'Participant Dashboard',
      subtitle: 'Track your benefits and services',
      welcome: 'Welcome to your participant dashboard',
      stats: {
        totalReceived: 'Total Received',
        housingFund: 'Housing Fund',
        totalDonations: 'Total Donations',
        activeServices: 'Active Services',
        nextAppointment: 'Next Appointment',
        programProgress: 'Program Progress'
      },
      qrCode: {
        title: 'Your QR Code',
        subtitle: 'Share this code to receive donations',
        shareText: 'Share your donation QR code',
        downloadText: 'Download QR code',
        qrCodeShare: 'Share this QR code to receive donations',
        recentActivity: 'Recent Activity',
        donationHistory: 'Donation History'
      }
    },
    admin: {
      title: 'Shelter Admin Dashboard',
      subtitle: 'Manage your shelter',
      welcome: 'Welcome, {{name}}',
      stats: {
        totalDonations: 'Total Donations',
        totalParticipants: 'Total Participants',
        activeParticipants: 'Active Participants',
        totalTransactions: 'Total Transactions',
        participantGrowth: 'Participant Growth',
        averageDonation: 'Average Donation',
        monthlyTrends: 'Monthly Trends',
        serviceDistribution: 'Service Distribution',
        recentActivity: 'Recent Activity'
      },
      charts: {
        monthlyTitle: 'Monthly Statistics',
        distributionTitle: 'Service Distribution',
        trendingTitle: 'Trending Metrics'
      }
    }
  },
  admin: {
    superAdmin: {
      title: "Super Admin Dashboard",
      subtitle: "Platform-wide analytics and management",
      userDistribution: {
        title: "User Distribution",
        subtitle: "Breakdown of platform users by role"
      },
      servicePerformance: {
        title: "Service Performance",
        subtitle: "Analysis of service utilization and impact"
      },
      shelterPerformance: {
        title: "Shelter Performance Analysis",
        subtitle: "Comparative analysis of shelter operations"
      },
      fundAllocation: {
        title: "Fund Allocation Analysis",
        subtitle: "Comparison of funds raised and allocated across user types"
      }
    },
    userTypes: {
      donor: "Donors",
      participant: "Participants",
      shelterAdmin: "Shelter Admins",
      superAdmin: "Super Admins",
      guest: "Guests"
    },
    stats: {
      totalShelters: "Total Shelters",
      activeParticipants: "Active Participants",
      totalDonations: "Total Donations",
      successRate: "Success Rate",
      verifiedShelters: "verified shelters",
      avgPerShelter: "avg. per shelter",
      perParticipant: "per participant",
      aboveAverage: "Above industry average"
    },
    dashboard: {
      title: "Admin Dashboard",
      welcome: "Welcome back to your dashboard"
    },
    shelter: {
      title: 'Shelter Dashboard',
      subtitle: 'Manage your shelter',
      welcome: 'Welcome, {{name}}',
      donors: {
        title: 'Donors',
        export: 'Export',
        name: 'Name',
        totalDonated: 'Total Donated',
        lastDonation: 'Last Donation',
        frequency: 'Frequency',
        status: 'Status'
      },
      participants: {
        title: 'Participants',
        add: 'Add Participant',
        name: 'Name',
        status: 'Status',
        joinDate: 'Join Date',
        totalReceived: 'Total Received',
        qrCode: 'QR Code',
        loginToken: 'Login Token',
        viewDetails: 'View Details',
        statuses: {
          active: 'Active',
          inactive: 'Inactive',
          pending: 'Pending'
        }
      }
    },
    participant: {
      registration: {
        title: 'Register New Participant',
        steps: {
          personal: 'Personal Info',
          contact: 'Contact',
          needs: 'Needs Assessment',
          verification: 'Verification'
        },
        form: {
          firstName: 'First Name',
          lastName: 'Last Name',
          dateOfBirth: 'Date of Birth',
          gender: {
            label: 'Gender',
            options: {
              male: 'Male',
              female: 'Female',
              other: 'Other',
              preferNotToSay: 'Prefer not to say'
            }
          },
          email: 'Email Address',
          phone: 'Phone Number',
          emergency: {
            title: 'Emergency Contact',
            name: 'Contact Name',
            phone: 'Contact Phone',
            relationship: 'Relationship'
          },
          housing: {
            label: 'Housing Status',
            options: {
              emergency: 'Emergency Shelter',
              transitional: 'Transitional Housing',
              atRisk: 'At Risk',
              permanent: 'Permanent Housing',
              street: 'Street'
            }
          },
          employment: {
            label: 'Employment Status',
            options: {
              unemployed: 'Unemployed',
              partTime: 'Part-Time',
              fullTime: 'Full-Time',
              selfEmployed: 'Self-Employed',
              unableToWork: 'Unable to Work',
              retired: 'Retired'
            }
          },
          specialNeeds: 'Special Needs or Requirements',
          identification: {
            title: 'Identity Verification',
            type: 'ID Type',
            number: 'ID Number',
            expiry: 'Expiry Date',
            issuer: 'Issuing Authority'
          }
        },
        buttons: {
          next: 'Next',
          back: 'Back',
          submit: 'Complete Registration',
          cancel: 'Cancel'
        },
        validation: {
          required: 'This field is required',
          invalidEmail: 'Please enter a valid email address',
          invalidPhone: 'Please enter a valid phone number',
          minAge: 'Participant must be at least 18 years old',
          invalidName: 'Please enter a valid name'
        }
      },
      housing: {
        emergency: 'Emergency Shelter',
        transitional: 'Transitional Housing',
        atRisk: 'At Risk of Homelessness'
      },
      employment: {
        unemployed: 'Unemployed',
        partTime: 'Part-Time',
        fullTime: 'Full-Time'
      }
    }
  },
  home: {
    title: "Home",
    welcome: "Welcome to SHELTR"
  },
  profile: {
    transactions: {
      title: "Recent Transactions",
      empty: "No transactions yet",
      monthly: "Monthly donation",
      oneTime: "One-time donation",
      completed: "Completed",
      pending: "Pending",
      failed: "Failed"
    },
    stats: {
      title: "Your Stats",
      totalDonations: "Total Donations",
      totalAmount: "Total Amount",
      impactScore: "Impact Score",
      donationsCount: "Number of Donations"
    },
    friends: {
      title: "Friends",
      empty: "No friends yet",
      add: "Add Friend",
      pending: "Pending Requests",
      activities: "Friend Activities"
    },
    activity: {
      title: "Recent Activity",
      empty: "No recent activity",
      donation: "made a donation",
      referral: "referred a friend",
      post: "shared a post",
      impact: "reached impact milestone"
    },
    title: 'Profile',
    editProfile: 'Edit Profile',
    sections: {
      personalInfo: 'Personal Information',
      preferences: 'Preferences',
      socialLinks: 'Social Links',
      activity: 'Recent Activity'
    },
    fields: {
      name: 'Name',
      email: 'Email',
      bio: 'Bio',
      notifications: 'Email Notifications',
      theme: 'Theme',
      language: 'Language'
    },
    buttons: {
      save: 'Save Changes',
      cancel: 'Cancel',
      uploadImage: 'Upload Image',
      removeImage: 'Remove Image'
    },
    activityFeed: {
      empty: 'No recent activity',
      donation: 'made a donation',
      referral: 'referred a participant',
      impact: 'achieved an impact milestone',
      title: 'Recent Activity'
    }
  }
};