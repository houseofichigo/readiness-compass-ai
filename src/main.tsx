import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';
import './i18n';

// Import test sync function in development
if (import.meta.env.DEV) {
  import("./utils/testSync");
  import("./utils/verifyStructure");
}

const container = document.getElementById('root');
if (!container) {
  throw new Error('Root element not found');
}

createRoot(container).render(<App />);