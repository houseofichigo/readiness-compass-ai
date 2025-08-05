import { Track } from "@/types/assessment";

interface AssessmentTranslation {
  trackLabels: Record<Track, string>;
  progress: {
    sectionsComplete: string;
    sectionsRemaining: string;
    questionsRemaining: string;
    completeProfileFirst: string;
    selectRoleToSeeCount: string;
    current: string;
    complete: string;
    pending: string;
    completeProfileToSeeCount: string;
    selectRoleToSeeRemaining: string;
  };
}

const translations: Record<string, AssessmentTranslation> = {
  en: {
    trackLabels: {
      TECH: "Technical Track",
      REG: "Regulated Track",
      GEN: "General Business Track",
    },
    progress: {
      sectionsComplete: "Sections Complete",
      sectionsRemaining: "Sections Remaining",
      questionsRemaining: "Questions Remaining",
      completeProfileFirst: "Complete Profile First",
      selectRoleToSeeCount: "Select Role to See Count",
      current: "Current",
      complete: "Complete",
      pending: "Pending",
      completeProfileToSeeCount: "Complete your profile to see personalized question count",
      selectRoleToSeeRemaining: "Select your role to see remaining questions",
    },
  },
  fr: {
    trackLabels: {
      TECH: "Parcours technique",
      REG: "Parcours réglementé",
      GEN: "Parcours général",
    },
    progress: {
      sectionsComplete: "Sections terminées",
      sectionsRemaining: "Sections restantes",
      questionsRemaining: "Questions restantes",
      completeProfileFirst: "Complétez d'abord votre profil",
      selectRoleToSeeCount: "Sélectionnez un rôle pour voir le nombre",
      current: "En cours",
      complete: "Terminé",
      pending: "En attente",
      completeProfileToSeeCount: "Complétez votre profil pour voir le nombre de questions",
      selectRoleToSeeRemaining: "Sélectionnez votre rôle pour voir les questions restantes",
    },
  },
};

export const getAssessmentTranslations = (language: string): AssessmentTranslation => {
  return language.startsWith("fr") ? translations.fr : translations.en;
};

