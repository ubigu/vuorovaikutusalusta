import { Page } from '@playwright/test';

export class PublishedSurveyPage {
  private _page: Page;

  constructor(page: Page) {
    this._page = page;
  }

  get page() {
    return this._page;
  }

  async goto(surveyName: string) {
    await this._page.goto(`http://localhost:8080/${surveyName}`);
  }

  async startSurvey() {
    await this._page
      .getByRole('button', { name: 'Aloita kysely tästä' })
      .click();
  }
}
