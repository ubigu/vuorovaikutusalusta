import { MapQuestionAnswer, SurveyQuestion } from '@interfaces/survey';
import { FormControl, FormHelperText, FormLabel } from '@material-ui/core';
import { useSurveyAnswers } from '@src/stores/SurveyAnswerContext';
import { useTranslations } from '@src/stores/TranslationContext';
import React, { useMemo, useState } from 'react';
import CheckBoxQuestion from './CheckBoxQuestion';
import FreeTextQuestion from './FreeTextQuestion';
import MapQuestion from './MapQuestion';
import MatrixQuestion from './MatrixQuestion';
import NumericQuestion from './NumericQuestion';
import RadioQuestion from './RadioQuestion';
import SectionInfo from './SectionInfo';
import SliderQuestion from './SliderQuestion';
import SortingQuestion from './SortingQuestion';

interface Props {
  question: SurveyQuestion;
}

export default function SurveyQuestion({ question }: Props) {
  const { answers, updateAnswer, getValidationErrors } = useSurveyAnswers();
  const [dirty, setDirty] = useState(false);
  const { tr } = useTranslations();

  const value = useMemo(
    () => answers.find((answer) => answer.sectionId === question.id).value,
    [answers, question]
  );

  const validationErrors = useMemo(
    () => (dirty ? getValidationErrors(question) : []),
    [dirty, question, value]
  );

  return (
    <FormControl error={validationErrors.length > 0} style={{ width: '100%' }}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <FormLabel component="legend" style={{ color: 'black' }}>
          {question.title} {question.isRequired && '*'}
        </FormLabel>
        {question.info && <SectionInfo infoText={question.info} />}
      </div>

      {/* Radio question */}
      {question.type === 'radio' && (
        <RadioQuestion
          value={value as number | string}
          onChange={(value) => {
            updateAnswer({
              sectionId: question.id,
              type: question.type,
              value,
            });
          }}
          question={question}
          setDirty={setDirty}
        />
      )}
      {/* Checkbox question */}
      {question.type === 'checkbox' && (
        <CheckBoxQuestion
          value={value as (number | string)[]}
          onChange={(value) => {
            updateAnswer({
              sectionId: question.id,
              type: question.type,
              value,
            });
          }}
          question={question}
          setDirty={setDirty}
        />
      )}
      {/* Free text question */}
      {question.type === 'free-text' && (
        <FreeTextQuestion
          value={value as string}
          maxLength={question.maxLength}
          onChange={(value) => {
            updateAnswer({
              sectionId: question.id,
              type: question.type,
              value,
            });
          }}
          setDirty={setDirty}
        />
      )}
      {/* Numeric question */}
      {question.type === 'numeric' && (
        <NumericQuestion
          value={value as number}
          onChange={(value) => {
            updateAnswer({
              sectionId: question.id,
              type: question.type,
              value,
            });
          }}
          setDirty={setDirty}
        />
      )}
      {/* Map question */}
      {question.type === 'map' && (
        <MapQuestion
          value={value as MapQuestionAnswer[]}
          onChange={(value) => {
            updateAnswer({
              sectionId: question.id,
              type: question.type,
              value,
            });
          }}
          question={question}
          setDirty={setDirty}
        />
      )}
      {/* Sorting question */}
      {question.type === 'sorting' && (
        <SortingQuestion
          value={value as number[]}
          onChange={(value) => {
            updateAnswer({
              sectionId: question.id,
              type: question.type,
              value,
            });
          }}
          question={question}
          setDirty={setDirty}
        />
      )}
      {/* Slider question */}
      {question.type === 'slider' && (
        <SliderQuestion
          value={value as number}
          onChange={(value) => {
            updateAnswer({
              sectionId: question.id,
              type: question.type,
              value,
            });
          }}
          question={question}
          setDirty={setDirty}
        />
      )}
      {question.type === 'matrix' && (
        <MatrixQuestion
          value={value as string[]}
          onChange={(value) => {
            updateAnswer({
              sectionId: question.id,
              type: question.type,
              value,
            });
          }}
          question={question}
          setDirty={setDirty}
        />
      )}
      {/* Show the required error only for empty values (not when answer limits are broken in checkbox questions) */}
      {validationErrors.includes('required') && (
        <FormHelperText>
          {tr.SurveyQuestion.errorFieldIsRequired}
        </FormHelperText>
      )}
    </FormControl>
  );
}