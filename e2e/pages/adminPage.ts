import { expect, Page } from '@playwright/test';

export class SurveyAdminPage {
  private _page: Page;

  constructor(page: Page) {
    this._page = page;
  }

  get page() {
    return this._page;
  }

  async goto() {
    await this._page.goto(`http://localhost:8080/admin/`);
  }

  async getSurveyList() {
    return this._page.getByTestId('survey-admin-list').all();
  }

  async publishSurvey(surveyName: string) {
    await this._page
      .getByRole('listitem')
      .filter({ hasText: surveyName })
      .getByText('julkaise')
      .click();

    await this._page.getByRole('button', { name: 'Kyllä' }).click();
    await expect(this._page.getByText('Kysely julkaistu')).toBeVisible();
  }
}
