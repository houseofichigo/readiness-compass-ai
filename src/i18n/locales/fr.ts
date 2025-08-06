export const frResources = {
  translation: {
    // Navigation & Common UI
    navigation: {
      home: "Accueil",
      assessment: "Évaluation",
      admin: "Admin",
      login: "Connexion",
      logout: "Déconnexion",
    },
    
    // Common actions
    common: {
      next: "Suivant",
      previous: "Précédent",
      submit: "Soumettre",
      cancel: "Annuler",
      save: "Enregistrer",
      edit: "Modifier",
      delete: "Supprimer",
      confirm: "Confirmer",
      back: "Retour",
      continue: "Continuer",
      complete: "Terminer",
      loading: "Chargement...",
      submitting: "Soumission...",
      completeAssessment: "Terminer l'évaluation",
      startAssessment: "Commencer l'évaluation",
      viewResults: "Voir les résultats",
      downloadReport: "Télécharger le rapport",
    },

    // Language selector
    language: {
      selectLanguage: "Choisir la langue",
      english: "English",
      french: "Français",
      switchTo: "Passer à {{language}}",
    },

    // Assessment flow
    assessment: {
      title: "Évaluation de maturité IA v2.0",
      subtitle: "Évaluez la maturité IA de votre organisation",
      welcome: {
        title: "Bienvenue dans l'évaluation de maturité IA",
        description: "Cette évaluation complète analysera la préparation de votre organisation pour l'implémentation de l'IA à travers 8 dimensions clés.",
        estimatedTime: "Durée estimée : 15-20 minutes",
        getStarted: "Commencer",
      },
      progress: {
        sectionOf: "Section {{current}} sur {{total}}",
        questionsRemaining: "{{count}} questions restantes",
        track: "Filière : {{track}}",
        trackInfo: "En fonction de votre rôle et secteur, nous avons personnalisé les questions pour votre filière",
      },
      validation: {
        required: "Ce champ est requis",
        email: "Veuillez saisir une adresse e-mail valide",
        completeMissing: "Veuillez compléter toutes les questions requises",
        someQuestionsNeed: "Certaines questions nécessitent encore votre attention.",
      },
      consent: {
        accept: "J'accepte les conditions de traitement des données",
        required: "Vous devez accepter pour continuer",
      },
      additionalQuestions: "Questions supplémentaires",
      thankYou: {
        title: "Évaluation terminée !",
        message: "Merci d'avoir complété l'évaluation de maturité IA. Vos résultats sont en cours de traitement.",
        nextSteps: "Prochaines étapes ?",
        reportReady: "Votre rapport personnalisé sera prêt sous peu",
        emailSent: "Nous vous enverrons une copie par e-mail",
        dashboard: "Accédez à votre tableau de bord admin pour des insights détaillés",
      },
    },

    // Form labels and placeholders
    form: {
      organizationName: "Nom de l'organisation",
      fullName: "Nom complet",
      email: "Adresse e-mail",
      role: "Votre rôle",
      industry: "Secteur d'activité",
      country: "Pays",
      size: "Taille de l'organisation",
      revenue: "Chiffre d'affaires annuel",
      pleaseSelect: "Veuillez sélectionner...",
      enterText: "Saisir le texte...",
      other: "Autre",
      specifyOther: "Veuillez préciser",
      preferNotToSay: "Préfère ne pas dire",
    },

    // Notifications and messages
    notifications: {
      success: "Succès !",
      error: "Erreur",
      warning: "Avertissement",
      info: "Information",
      assessmentSaved: "Progression de l'évaluation sauvegardée",
      assessmentCompleted: "Évaluation terminée avec succès",
      errorSaving: "Erreur lors de la sauvegarde de l'évaluation",
      errorCompleting: "Erreur lors de la finalisation de l'évaluation. Veuillez réessayer ou contacter le support.",
      tryAgain: "Veuillez réessayer",
      contactSupport: "ou contacter le support",
    },

    // Admin dashboard
    admin: {
      dashboard: "Tableau de bord Admin",
      overview: "Vue d'ensemble",
      submissions: "Soumissions",
      analytics: "Analytique",
      executive: "Tableau de bord exécutif",
      totalSubmissions: "Total des soumissions",
      averageScore: "Score moyen",
      completionRate: "Taux de completion",
      topIndustries: "Principaux secteurs",
      recentSubmissions: "Soumissions récentes",
      exportData: "Exporter les données",
      viewDetails: "Voir les détails",
      filters: "Filtres",
      dateRange: "Plage de dates",
      searchSubmissions: "Rechercher des soumissions...",
    },

    // Error messages
    errors: {
      pageNotFound: "Page non trouvée",
      goHome: "Retour à l'accueil",
      somethingWrong: "Quelque chose s'est mal passé",
      tryRefresh: "Essayez de rafraîchir la page",
      loginRequired: "Connexion requise",
      accessDenied: "Accès refusé",
    },

    // Assessment sections
    sections: {
      section_0: "Profil de l'organisation",
      section_1: "Stratégie et maturité des cas d'usage",
      section_2: "Budget, trésorerie et conformité",
      section_3: "Fondation des données et sécurité",
      section_4: "Stack d'outils et intégration",
      section_5: "Automatisation et agents IA",
      section_6: "Capacités de l'équipe et culture",
      section_7: "Gouvernance, risque et éthique",
      section_8: "Horizon d'implémentation et vision",
    },

    // Tracks
    tracks: {
      TECH: "Technique / Responsable données",
      REG: "Réglementaire / Conformité",
      GEN: "Affaires générales",
    },

    // Size breakpoints
    sizeBreakpoints: {
      micro: "micro",
      small: "petite",
      medium: "moyenne",
      large: "grande",
      enterprise: "entreprise",
    },
  },
};