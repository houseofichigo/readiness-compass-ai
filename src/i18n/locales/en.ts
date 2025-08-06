export const enResources = {
  translation: {
    // Navigation & Common UI
    navigation: {
      home: "Home",
      assessment: "Assessment",
      admin: "Admin",
      login: "Login",
      logout: "Logout",
    },
    
    // Common actions
    common: {
      next: "Next",
      previous: "Previous",
      submit: "Submit",
      cancel: "Cancel",
      save: "Save",
      edit: "Edit",
      delete: "Delete",
      confirm: "Confirm",
      back: "Back",
      continue: "Continue",
      complete: "Complete",
      loading: "Loading...",
      submitting: "Submitting...",
      completeAssessment: "Complete Assessment",
      startAssessment: "Start Assessment",
      viewResults: "View Results",
      downloadReport: "Download Report",
    },

    // Language selector
    language: {
      selectLanguage: "Select Language",
      english: "English",
      french: "Français",
      switchTo: "Switch to {{language}}",
    },

    // Assessment flow
    assessment: {
      title: "AI Readiness Assessment v2.0",
      subtitle: "Evaluate your organization's AI readiness",
      welcome: {
        title: "Welcome to the AI Readiness Assessment",
        description: "This comprehensive assessment will evaluate your organization's preparedness for AI implementation across 8 key dimensions.",
        estimatedTime: "Estimated time: 15-20 minutes",
        getStarted: "Get Started",
      },
      progress: {
        sectionOf: "Section {{current}} of {{total}}",
        questionsRemaining: "{{count}} questions remaining",
        track: "Track: {{track}}",
        trackInfo: "Based on your role and industry, we've customized the questions for your track",
        complete: "Complete",
        sectionsComplete: "Sections complete",
        sectionsRemaining: "Sections remaining", 
        questionsRemaining_plural: "Questions remaining",
        generalTrack: "General Track",
      },
      validation: {
        required: "This field is required",
        email: "Please enter a valid email address",
        completeMissing: "Please complete all required questions",
        someQuestionsNeed: "Some questions still need your input.",
      },
      consent: {
        accept: "I agree to the data processing terms",
        required: "You must accept to continue",
        dataProcessing: "By proceeding, you agree to process your data for this readiness report and related communications.",
      },
      additionalQuestions: "Additional Questions",
      thankYou: {
        title: "Assessment Complete!",
        message: "Thank you for completing the AI Readiness Assessment. Your results are being processed.",
        nextSteps: "What's next?",
        reportReady: "Your personalized report will be ready shortly",
        emailSent: "We'll send you a copy via email",
        dashboard: "Access your admin dashboard for detailed insights",
      },
    },

    // Form labels and placeholders
    form: {
      organizationName: "Organization Name",
      fullName: "Full Name", 
      email: "Email Address",
      role: "Your Role",
      industry: "Industry",
      country: "Country",
      size: "Organization Size",
      revenue: "Annual Revenue",
      pleaseSelect: "Please select...",
      enterText: "Enter text...",
      other: "Other",
      specifyOther: "Please specify",
      preferNotToSay: "Prefer not to say",
      basicInformation: "Basic Information",
      organizationDetails: "Organization Details",
      enterOrgName: "Enter your organization name",
      enterFullName: "Enter your full name",
      enterEmail: "your.name@company.com",
      selectRole: "Select your primary role...",
      selectIndustry: "Select your industry...",
      selectCountry: "Select your country...",
    },

    // Notifications and messages
    notifications: {
      success: "Success!",
      error: "Error",
      warning: "Warning",
      info: "Information",
      assessmentSaved: "Assessment progress saved",
      assessmentCompleted: "Assessment completed successfully",
      errorSaving: "Error saving assessment",
      errorCompleting: "Error completing assessment. Please try again or contact support.",
      tryAgain: "Please try again",
      contactSupport: "or contact support",
    },

    // Admin dashboard
    admin: {
      dashboard: "Admin Dashboard",
      overview: "Overview",
      submissions: "Submissions",
      analytics: "Analytics",
      executive: "Executive Dashboard",
      totalSubmissions: "Total Submissions",
      averageScore: "Average Score",
      completionRate: "Completion Rate",
      topIndustries: "Top Industries",
      recentSubmissions: "Recent Submissions",
      exportData: "Export Data",
      viewDetails: "View Details",
      filters: "Filters",
      dateRange: "Date Range",
      searchSubmissions: "Search submissions...",
    },

    // Error messages
    errors: {
      pageNotFound: "Page Not Found",
      goHome: "Go Home",
      somethingWrong: "Something went wrong",
      tryRefresh: "Try refreshing the page",
      loginRequired: "Login Required",
      accessDenied: "Access Denied",
    },

    // Assessment sections
    sections: {
      section_0: "Organization Profile",
      section_1: "Strategy & Use-Case Readiness", 
      section_2: "Budget, Runway & Compliance",
      section_3: "Data Foundation & Security",
      section_4: "Tool Stack & Integration",
      section_5: "Automation & AI Agents",
      section_6: "Team Capability & Culture",
      section_7: "Governance, Risk & Ethics",
      section_8: "Implementation Horizon & Vision",
    },

    // Tracks
    tracks: {
      TECH: "Technical / Data Lead",
      REG: "Regulatory / Compliance", 
      GEN: "General Business",
    },

    // Size breakpoints
    sizeBreakpoints: {
      micro: "micro",
      small: "small", 
      medium: "medium",
      large: "large",
      enterprise: "enterprise",
    },
  },
};