import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import {ContextsProvider} from './store/Provider';
import App from './App';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);


root.render(
  <StrictMode>
    <ContextsProvider>
      <App />
    </ContextsProvider>
  </StrictMode>
);
