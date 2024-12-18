import { render } from '@testing-library/react';
import TranslationProvider from '@src/stores/TranslationContext';
import React from 'react';

describe('ApplicationLogic', function () {
  test('should render without crashing', async function () {
    render(
      <TranslationProvider>
        <p>children</p>
      </TranslationProvider>,
    );
  });
});
