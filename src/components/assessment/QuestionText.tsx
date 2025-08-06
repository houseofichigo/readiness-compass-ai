import React from 'react';
import { useTranslation } from 'react-i18next';
import { Question } from '@/types/assessment';
import { getLocalizedQuestion } from '@/utils/assessmentUtils';

interface QuestionTextProps {
  question: Question;
  className?: string;
}

export function QuestionText({ question, className = "" }: QuestionTextProps) {
  const { i18n } = useTranslation();
  const localizedQuestion = getLocalizedQuestion(question, i18n.language);

  return (
    <div className={className}>
      <h3 className="text-lg font-semibold mb-2">
        {localizedQuestion.text}
      </h3>
      {localizedQuestion.helper && (
        <p className="text-sm text-muted-foreground mb-4">
          {localizedQuestion.helper}
        </p>
      )}
    </div>
  );
}