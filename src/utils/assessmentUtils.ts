import { Question, Section, QuestionOption } from '@/types/assessment';
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

export function getLocalizedOptions(
  questionId: string,
  originalOptions: QuestionOption[] | undefined,
  language: string = 'en'
): QuestionOption[] | undefined {
  if (!originalOptions || language === 'en') {
    return originalOptions;
  }
  
  if (language === 'fr') {
    const translation = frenchTranslations[questionId];
    if (translation && translation.options) {
      return translation.options as QuestionOption[];
    }
  }
  
  return originalOptions;
}

export function getLocalizedQuestion(question: Question, language: string = 'en'): Question {
  if (language === 'en') {
    return question;
  }
  
  if (language === 'fr') {
    const localizedText = getLocalizedText(question.id, 'text', language);
    const localizedHelper = getLocalizedText(question.id, 'helper', language);
    const localizedOptions = getLocalizedOptions(question.id, question.options, language);
    
    return {
      ...question,
      text: localizedText || question.text,
      helper: localizedHelper || question.helper,
      options: localizedOptions || question.options,
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