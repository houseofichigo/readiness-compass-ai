import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      welcome: 'Welcome',
      assessment: {
        results: {
          heading: 'AI Readiness Assessment Results',
          track: {
            TECH: 'Technical Track',
            REG: 'Regulated Track',
            GEN: 'General Business Track',
          },
          readinessLevel: {
            advanced: 'Advanced',
            advancedDesc: 'Excellent AI readiness',
            intermediate: 'Intermediate',
            intermediateDesc: 'Good foundation with room for growth',
            developing: 'Developing',
            developingDesc: 'Basic readiness, needs improvement',
            beginner: 'Beginner',
            beginnerDesc: 'Significant development needed',
          },
          keyRecommendations: 'Key Recommendations',
          strengths: 'Strengths',
          areasForImprovement: 'Areas for Improvement',
          strengthsList: {
            leadership: 'Leadership alignment on AI initiatives',
            technical: 'Strong technical foundation for AI implementation',
            data: 'Good data management practices',
          },
          improvementList: {
            governance: 'Develop comprehensive AI governance framework',
            automation: 'Increase automation maturity across processes',
            training: 'Enhance team AI capabilities and training',
          },
          actions: {
            download: 'Download Report',
            share: 'Share Results',
            restart: 'Take Assessment Again',
          },
        },
      },
    },
  },
  fr: {
    translation: {
      welcome: 'Bienvenue',
      assessment: {
        results: {
          heading: "Résultats de l'évaluation de préparation à l'IA",
          track: {
            TECH: 'Parcours technique',
            REG: 'Parcours réglementé',
            GEN: 'Parcours général pour les entreprises',
          },
          readinessLevel: {
            advanced: 'Avancé',
            advancedDesc: 'Excellente préparation à l’IA',
            intermediate: 'Intermédiaire',
            intermediateDesc: 'Bonne base avec un potentiel de progression',
            developing: 'En développement',
            developingDesc: 'Préparation de base, nécessite des améliorations',
            beginner: 'Débutant',
            beginnerDesc: 'Développement important requis',
          },
          keyRecommendations: 'Recommandations clés',
          strengths: 'Points forts',
          areasForImprovement: "Axes d'amélioration",
          strengthsList: {
            leadership: 'Alignement de la direction sur les initiatives d’IA',
            technical: "Base technique solide pour l'implémentation de l'IA",
            data: 'Bonnes pratiques de gestion des données',
          },
          improvementList: {
            governance: "Développer un cadre de gouvernance de l'IA complet",
            automation: "Augmenter la maturité de l'automatisation des processus",
            training: "Renforcer les compétences et la formation de l'équipe en IA",
          },
          actions: {
            download: 'Télécharger le rapport',
            share: 'Partager les résultats',
            restart: "Reprendre l'évaluation",
          },
        },
      },
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'en',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
