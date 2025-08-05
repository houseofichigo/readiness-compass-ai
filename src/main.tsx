import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n/config';

const container = document.getElementById('root');
if (!container) {
  throw new Error('Root element not found');
}

createRoot(container).render(
  <I18nextProvider i18n={i18n}>
    <App />
  </I18nextProvider>
);
