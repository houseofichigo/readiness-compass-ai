import { Question, Section, QuestionChoice } from '@/types/assessment';
import { frenchTranslations } from '@/i18n/translations/completeFrenchTranslations';

export function getLocalizedText(
  id: string, 
  field: 'text' | 'helper' | 'purpose', 
  language: string = 'en'
): string {
  if (language === 'en') {
    return ''; // Will fall back to original text from YAML
  }
  
  if (language === 'fr') {
    const translation = frenchTranslations[id];
    if (translation && translation[field]) {
      return translation[field] as string;
    }
  }
  
  return ''; // Fall back to original
}

export function getLocalizedChoices(
  questionId: string,
  originalChoices: QuestionChoice[] | undefined,
  language: string = 'en'
): QuestionChoice[] | undefined {
  if (!originalChoices || language === 'en') {
    return originalChoices;
  }
  
  if (language === 'fr') {
    const translation = frenchTranslations[questionId];
    if (translation && translation.choices) {
      return translation.choices as QuestionChoice[];
    }
  }
  
  return originalChoices;
}

export function getLocalizedQuestion(question: Question, language: string = 'en'): Question {
  if (language === 'en') {
    return question;
  }
  
  if (language === 'fr') {
    const localizedText = getLocalizedText(question.id, 'text', language);
    const localizedHelper = getLocalizedText(question.id, 'helper', language);
    const localizedChoices = getLocalizedChoices(question.id, question.choices, language);
    
    return {
      ...question,
      text: localizedText || question.text,
      helper: localizedHelper || question.helper,
      choices: localizedChoices || question.choices,
    };
  }
  
  return question;
}

export function getLocalizedSection(section: Section, language: string = 'en'): Section {
  if (language === 'en') {
    return section;
  }
  
  const localizedPurpose = getLocalizedText(section.id, 'purpose', language);
  
  return {
    ...section,
    purpose: localizedPurpose || section.purpose,
    questions: section.questions.map(q => getLocalizedQuestion(q, language)),
  };
}