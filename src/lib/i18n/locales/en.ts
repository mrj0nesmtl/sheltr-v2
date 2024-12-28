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
      partnerNow: 'Partner Now',
      scanNow: 'Scan Now',
      joinMovement: 'Join the Movement',
      confirm: 'Confirm'
    },
    signOut: "Sign Out",
    loading: "Loading...",
    actions: {
      edit: "Edit",
      delete: "Delete",
      save: "Save",
      cancel: "Cancel",
      confirm: "Confirm",
      back: "Back",
      next: "Next",
      submit: "Submit",
      close: "Close",
      view: "View",
      download: "Download",
      share: "Share",
      copy: "Copy",
      generate: "Generate"
    },
    refresh: "Refresh",
    status: {
      active: "Active",
      inactive: "Inactive",
      pending: "Pending",
      completed: "Completed",
      failed: "Failed",
      processing: "Processing",
      verified: "Verified",
      unverified: "Unverified"
    },
    errors: {
      general: "Something went wrong. Please try again.",
      notFound: "Resource not found.",
      unauthorized: "You are not authorized to perform this action.",
      validation: "Please check your input and try again.",
      network: "Network error. Please check your connection.",
      server: "Server error. Please try again later.",
      "Failed to check auth status": "Unable to verify authentication status. Please try again.",
      invalidCredentials: "Invalid login credentials",
      serverError: "Server error occurred. Please try again."
    },
    success: {
      saved: "Successfully saved",
      updated: "Successfully updated",
      deleted: "Successfully deleted",
      created: "Successfully created"
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
      forgotPassword: "Forgot password?",
      rememberMe: "Remember me",
      errors: {
        "Failed to check auth status": "Unable to verify authentication status. Please try again.",
        "Invalid login credentials": "Invalid email or password",
        "Email not confirmed": "Please verify your email address",
        "No user returned": "Login failed. Please try again.",
        "No profile found": "User profile not found. Please contact support.",
        invalidCredentials: "Invalid login credentials",
        serverError: "Server error occurred. Please try again."
      }
    },
    register: {
      title: "Create Your SHELTR Account",
      subtitle: "Join the movement to end homelessness",
      firstName: "First Name",
      lastName: "Last Name",
      email: "Email",
      password: "Password",
      confirmPassword: "Confirm Password",
      role: "I am a",
      roles: {
        donor: "Donor",
        shelter: "Shelter Administrator",
        participant: "Participant"
      },
      terms: "I agree to the Terms of Service and Privacy Policy",
      createAccount: "Create Account",
      alreadyHaveAccount: "Already have an account?",
      signIn: "Sign in"
    },
    forgotPassword: {
      title: "Reset Your Password",
      subtitle: "Enter your email to receive reset instructions",
      email: "Email",
      submit: "Send Reset Link",
      success: "If an account exists, you will receive an email shortly",
      backToLogin: "Back to login"
    },
    resetPassword: {
      title: "Create New Password",
      newPassword: "New Password",
      confirmPassword: "Confirm New Password",
      submit: "Reset Password",
      success: "Password successfully reset"
    },
    verification: {
      title: "Verify Your Email",
      subtitle: "Please check your email for verification link",
      resend: "Resend verification email",
      success: "Verification email sent"
    }
  },

  nav: {
    about: "About",
    howItWorks: "How It Works",
    solutions: "Solutions",
    scanDonate: "Scan + Donate",
    impact: "Impact",
    login: "Login",
    signUp: "Sign Up",
    solutions_menu: {
      title: 'Solutions',
      howItWorks: 'How It Works',
      solutions: 'Solutions',
      scanDonate: 'Scan + Donate'
    },
    company_menu: {
      title: 'Company',
      about: 'About',
      blog: 'Blog'
    },
    blockchain: {
      title: 'Blockchain',
      menu: {
        whitepaper: 'Whitepaper',
        transactions: 'Transactions'
      }
    },
    footer: {
      copyright: '© {{year}} SHELTR. All rights reserved.',
      tagline: 'Hacking Homelessness with Technology.',
      quickLinks: 'Quick Links',
      resources: 'Resources',
      connect: 'Connect',
      links: {
        howItWorks: 'How It Works',
        solutions: 'Solutions',
        scanDonate: 'Scan + Donate',
        about: 'About',
        blog: 'Blog',
        whitepaper: 'Whitepaper',
        transactions: 'Transactions',
        privacy: 'Privacy Policy',
        terms: 'Terms of Service'
      },
      social: {
        linkedin: 'Follow us on LinkedIn',
        youtube: 'Watch on YouTube',
        tiktok: 'Follow on TikTok',
        website: 'Visit our Blog',
        substack: 'Read our Substack',
        spotify: 'Listen on Spotify'
      },
      podcast: {
        latest: 'Latest Episode',
        listen: 'Listen Now',
        duration: 'Duration',
        showName: 'Tomes of Arcana'
      }
    },
    profile: "Profile",
    settings: "Settings",
    signOut: "Sign Out",
    dashboard: "Dashboard"
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
    title: "Transform Donations into Impact",
    description: "Create meaningful actions using blockchain technology and smart contracts to directly support homeless individuals with transparency and accountability."
  },

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

  dashboard: {
    common: {
      welcome: "Welcome back, {{name}}",
      summary: "Here's your overview",
      quickActions: "Quick Actions",
      recentActivity: "Recent Activity",
      viewAll: "View All",
      metrics: "Key Metrics",
      notifications: "Notifications",
      howItWorks: "How It Works",
      mainTitle: "Main Dashboard",
      subtitle: "Your Overview",
      backgroundAll: "View All Background",
      cta: {
        scan: "Scan QR Code",
        learnMore: "Learn More",
        title: "Dashboard Title",
        description: "Dashboard Description"
      },
      feature: {
        title: "Feature Title",
        description: "Feature Description"
      }
    },
    admin: {
      title: "Admin Dashboard",
      metrics: {
        totalUsers: "Total Users",
        activeShelters: "Active Shelters",
        totalDonations: "Total Donations",
        activeParticipants: "Active Participants"
      },
      actions: {
        manageUsers: "Manage Users",
        approveShelters: "Approve Shelters",
        systemSettings: "System Settings",
        viewReports: "View Reports"
      }
    },
    shelter: {
      title: "Shelter Dashboard",
      metrics: {
        occupancy: "Current Occupancy",
        availableBeds: "Available Beds",
        totalResidents: "Total Residents",
        monthlyDonations: "Monthly Donations"
      },
      actions: {
        addResident: "Add Resident",
        generateReports: "Generate Reports",
        updateAvailability: "Update Availability",
        manageServices: "Manage Services"
      }
    },
    donor: {
      title: "Donor Dashboard",
      metrics: {
        totalDonated: "Total Donated",
        impactScore: "Impact Score",
        peopleHelped: "People Helped",
        activeSubscriptions: "Active Subscriptions"
      },
      actions: {
        makeDonation: "Make Donation",
        manageSubscriptions: "Manage Subscriptions",
        viewImpact: "View Impact",
        downloadReceipts: "Download Receipts"
      }
    },
    participant: {
      title: "Participant Dashboard",
      metrics: {
        totalReceived: "Total Received",
        servicesUsed: "Services Used",
        upcomingAppointments: "Upcoming Appointments",
        housingProgress: "Housing Progress"
      },
      actions: {
        viewServices: "View Services",
        scheduleAppointment: "Schedule Appointment",
        updateProfile: "Update Profile",
        contactSupport: "Contact Support"
      }
    }
  },

  profile: {
    common: {
      title: "Profile",
      editProfile: "Edit Profile",
      saveChanges: "Save Changes",
      cancelChanges: "Cancel Changes",
      uploadPhoto: "Upload Photo",
      removePhoto: "Remove Photo"
    },
    sections: {
      personalInfo: {
        title: "Personal Information",
        firstName: "First Name",
        lastName: "Last Name",
        email: "Email",
        phone: "Phone",
        dateOfBirth: "Date of Birth",
        address: "Address"
      },
      preferences: {
        title: "Preferences",
        language: "Language",
        timezone: "Timezone",
        currency: "Currency",
        notifications: "Notifications"
      },
      security: {
        title: "Security",
        changePassword: "Change Password",
        twoFactor: "Two-Factor Authentication",
        loginHistory: "Login History",
        connectedDevices: "Connected Devices"
      }
    },
    notifications: {
      email: {
        donations: "Donation Receipts",
        updates: "Platform Updates",
        newsletter: "Newsletter",
        marketing: "Marketing Communications"
      },
      push: {
        newDonations: "New Donations",
        milestones: "Achievement Milestones",
        systemAlerts: "System Alerts"
      }
    }
  },

  donations: {
    common: {
      amount: "Amount",
      date: "Date",
      status: "Status",
      recipient: "Recipient",
      method: "Payment Method",
      frequency: "Frequency"
    },
    types: {
      oneTime: "One-time Donation",
      monthly: "Monthly Donation",
      annual: "Annual Donation",
      custom: "Custom Donation"
    },
    status: {
      processing: "Processing",
      completed: "Completed",
      failed: "Failed",
      refunded: "Refunded",
      pending: "Pending"
    },
    forms: {
      amount: {
        label: "Donation Amount",
        placeholder: "Enter amount",
        custom: "Custom Amount"
      },
      frequency: {
        label: "Donation Frequency",
        options: {
          oneTime: "One-time",
          monthly: "Monthly",
          annual: "Annual"
        }
      },
      payment: {
        title: "Payment Information",
        cardNumber: "Card Number",
        expiry: "Expiry Date",
        cvv: "CVV",
        name: "Name on Card"
      }
    },
    confirmation: {
      title: "Thank You for Your Donation!",
      receipt: "Donation Receipt",
      impact: "Your Impact",
      share: "Share Your Impact"
    }
  },

  services: {
    categories: {
      housing: "Housing Services",
      medical: "Medical Services",
      food: "Food Services",
      employment: "Employment Services",
      education: "Education Services",
      mental: "Mental Health Services"
    },
    status: {
      available: "Available",
      unavailable: "Unavailable",
      limited: "Limited Availability",
      scheduled: "Scheduled",
      completed: "Completed"
    },
    booking: {
      title: "Book Service",
      date: "Select Date",
      time: "Select Time",
      notes: "Additional Notes",
      confirm: "Confirm Booking"
    }
  },

  analytics: {
    common: {
      timeRange: "Time Range",
      compare: "Compare To",
      export: "Export Data",
      refresh: "Refresh Data"
    },
    metrics: {
      donations: {
        total: "Total Donations",
        average: "Average Donation",
        frequency: "Donation Frequency",
        retention: "Donor Retention"
      },
      impact: {
        peopleHelped: "People Helped",
        servicesProvided: "Services Provided",
        successRate: "Success Rate",
        communityEngagement: "Community Engagement"
      },
      shelters: {
        occupancy: "Occupancy Rate",
        turnover: "Resident Turnover",
        serviceUtilization: "Service Utilization",
        successMetrics: "Success Metrics"
      }
    },
    reports: {
      types: {
        summary: "Summary Report",
        detailed: "Detailed Report",
        impact: "Impact Report",
        financial: "Financial Report"
      },
      frequency: {
        daily: "Daily",
        weekly: "Weekly",
        monthly: "Monthly",
        quarterly: "Quarterly",
        annual: "Annual"
      }
    }
  },

  settings: {
    general: {
      title: "General Settings",
      language: "Language",
      timezone: "Timezone",
      currency: "Currency",
      dateFormat: "Date Format"
    },
    notifications: {
      title: "Notification Settings",
      email: "Email Notifications",
      push: "Push Notifications",
      sms: "SMS Notifications"
    },
    privacy: {
      title: "Privacy Settings",
      visibility: "Profile Visibility",
      dataSharing: "Data Sharing",
      activityTracking: "Activity Tracking"
    },
    security: {
      title: "Security Settings",
      password: "Password",
      twoFactor: "Two-Factor Authentication",
      sessions: "Active Sessions",
      devices: "Connected Devices"
    }
  },

  errors: {
    validation: {
      required: "This field is required",
      email: "Please enter a valid email address",
      password: "Password must be at least 8 characters",
      match: "Passwords do not match",
      phone: "Please enter a valid phone number",
      amount: "Please enter a valid amount",
      date: "Please enter a valid date"
    },
    auth: {
      invalid: "Invalid credentials",
      expired: "Session expired",
      unauthorized: "Unauthorized access",
      notFound: "User not found"
    },
    server: {
      internal: "Internal server error",
      network: "Network error",
      timeout: "Request timeout",
      maintenance: "System maintenance"
    }
  },

  success: {
    auth: {
      login: "Successfully logged in",
      register: "Account created successfully",
      logout: "Successfully logged out",
      passwordReset: "Password reset successfully"
    },
    profile: {
      update: "Profile updated successfully",
      photo: "Profile photo updated",
      settings: "Settings saved successfully"
    },
    donation: {
      complete: "Donation completed successfully",
      recurring: "Recurring donation set up",
      receipt: "Receipt sent to your email"
    }
  },

  qrScanner: {
    title: "Scan QR Code to Donate",
    instructions: "Point your camera at a participant's QR code",
    scannerActive: "Scanner is active",
    retryButton: "Try Again",
    errors: {
      cameraPermission: "Camera access denied. Please enable camera permissions.",
      initialization: "Failed to initialize camera. Please try again.",
      invalidCode: "Invalid QR Code",
      invalidCodeDesc: "This QR code is not associated with a SHELTR participant.",
      processing: "Error processing QR code. Please try again.",
      noCamera: "No camera found on your device.",
      notSupported: "QR scanning is not supported on this device."
    },
    instructionsDetail: "Position the QR code within the frame. The scanner will automatically detect and process it.",
    startButton: "Start Scanner"
  }
};
