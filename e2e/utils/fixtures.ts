import { test as base } from '@playwright/test';
import { SurveyEditPage } from '../pages/surveyEditPage';
import { SurveyAdminPage } from '../pages/adminPage';
import { PublishedSurveyPage } from '../pages/publishedSurveyPage';

interface PageFixtures {
  surveyEditPage: SurveyEditPage;
  surveyAdminPage: SurveyAdminPage;
  surveyPage: PublishedSurveyPage;
}

export const test = base.extend<PageFixtures>({
  surveyEditPage: async ({ page }, use) => {
    await use(new SurveyEditPage(page));
  },
  surveyAdminPage: async ({ page }, use) => {
    await use(new SurveyAdminPage(page));
  },
  surveyPage: async ({ page }, use) => {
    await use(new PublishedSurveyPage(page));
  },
});
