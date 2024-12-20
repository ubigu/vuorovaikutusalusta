import React from 'react';
import { RedocStandalone } from 'redoc';
import { AdminAppBar } from '../AdminAppBar';
import { Box } from '@mui/material';
import { useTranslations } from '@src/stores/TranslationContext';

export function ApiInstructions() {
  const { tr } = useTranslations();
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <AdminAppBar labels={[tr.SurveyList.title.frontPage]} />
      <RedocStandalone specUrl="http://localhost:8080/api/openapi" />
    </Box>
  );
}
