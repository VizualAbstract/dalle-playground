import React from 'react';
import ReactDOM from 'react-dom';
import { QueryClient, QueryClientProvider } from 'react-query';

import App from './App';
import { MyFormProvider } from './contexts/FormHandling';
const queryClient = new QueryClient();

<<<<<<< Updated upstream
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
=======
ReactDOM.render(
>>>>>>> Stashed changes
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <MyFormProvider>
        <App />
      </MyFormProvider>
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
