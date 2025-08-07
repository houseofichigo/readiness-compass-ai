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
      title: "Diagnostic de maturité Données et IA",
      subtitle: "Évaluez la maturité IA de votre organisation",
      tagline: "Évaluez la préparation de votre entreprise à l'IA grâce à un auto-diagnostic qui génère instantanément un rapport personnalisé présentant des cas d'usage de l'IA, des parcours d'automatisation sur mesure, des stratégies d'agents et des recommandations de formation.",
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
        complete: "Terminé",
        sectionsComplete: "Sections terminées",
        sectionsRemaining: "Sections restantes",
        questionsRemaining_plural: "Questions restantes",
        generalTrack: "Filière générale",
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
        dataProcessing: "En continuant, vous acceptez le traitement de vos données pour ce rapport de préparation et les communications associées.",
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
      basicInformation: "Informations de base",
      organizationDetails: "Détails de l'organisation",
      enterOrgName: "Saisissez le nom de votre organisation",
      enterFullName: "Saisissez votre nom complet",
      enterEmail: "votre.nom@entreprise.com",
      selectRole: "Sélectionnez votre rôle principal...",
      selectIndustry: "Sélectionnez votre secteur...",
      selectCountry: "Sélectionnez votre pays...",
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
      technical: "Filière technique",
      regulated: "Filière réglementée",
      general: "Filière affaires générales",
    },

    // Size breakpoints
    sizeBreakpoints: {
      micro: "micro",
      small: "petite",
      medium: "moyenne",
      large: "grande",
      enterprise: "entreprise",
    },

    // Thank You page
    thankYou: {
      title: "Évaluation terminée",
      subtitle: "8 domaines clés évalués avec analyse détaillée",
      thankMessage: "Merci, équipe {{company}}, d'avoir complété notre évaluation complète de préparation à l'IA",
      status: {
        complete: {
          title: "Évaluation terminée",
          description: "8 domaines clés évalués avec analyse détaillée"
        },
        report: {
          title: "Rapport disponible bientôt",
          description: "Nous vous enverrons votre rapport personnalisé dans les 3 jours ouvrables"
        },
        action: {
          title: "Passer à l'action", 
          description: "Mettre en œuvre les recommandations pour faire progresser votre parcours IA"
        }
      },
      overview: {
        title: "Aperçu de l'évaluation",
        questionsAnswered: "Questions répondues",
        keyAreas: "Domaines clés évalués",
        reportNotice: "Nous vous enverrons votre rapport détaillé de préparation à l'IA dans les 3 jours ouvrables",
        emailCheck: "Veuillez vérifier votre boîte de réception (et dossier spam) pour recevoir vos résultats d'évaluation personnalisés"
      },
      resources: {
        implementation: {
          title: "Guides de mise en œuvre",
          description: "Guides étape par étape pour implémenter les solutions IA"
        },
        bestPractices: {
          title: "Bibliothèque de meilleures pratiques",
          description: "Meilleures pratiques de l'industrie et études de cas"
        },
        consultation: {
          title: "Consultation d'experts",
          description: "Sessions individuelles avec des experts IA"
        },
        training: {
          title: "Ressources de formation", 
          description: "Programmes de formation complets pour votre équipe"
        },
        community: {
          title: "Accès communauté",
          description: "Connectez-vous avec d'autres organisations orientées IA"
        },
        calculator: {
          title: "Calculateur de ROI",
          description: "Calculez le retour potentiel sur les investissements IA"
        }
      },
      reportIncludes: {
        title: "Votre rapport inclut",
        maturityScore: {
          title: "Score de maturité IA",
          description: "Évaluation globale des 8 domaines clés"
        },
        analysis: {
          title: "Analyse détaillée par section",
          description: "Identification des forces et des domaines d'amélioration"
        },
        recommendations: {
          title: "Recommandations opérationnelles",
          description: "Étapes concrètes pour faire progresser votre parcours IA"
        },
        roadmap: {
          title: "Feuille de route de mise en œuvre",
          description: "Calendrier priorisé pour l'adoption de l'IA"
        }
      },
      actions: {
        retake: "Refaire l'évaluation",
        website: "Visiter notre site web"
      },
      footer: {
        thankYou: "Merci de votre participation",
        privacy: "Vos données nous aident à améliorer notre évaluation et à fournir des informations plus pertinentes sur la préparation à l'IA. Nous nous engageons à protéger votre vie privée et n'utiliserons vos informations que pour vous fournir les résultats d'évaluation demandés et les ressources connexes.",
        dataProtected: "Confidentialité des données protégée",
        contact: "Contact : support@houseofichigo.com"
      },
      comingSoon: {
        title: "Bientôt disponible !",
        description: "{{feature}} sera disponible prochainement. Nous vous préviendrons quand ce sera prêt."
      }
    }
  },
};
