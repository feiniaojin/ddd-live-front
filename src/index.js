import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import store from '@/store'
import { Provider } from 'react-redux'
import './index.module.scss'
import ErrorBoundary from "@/components/ErrorBoundary";

console.log('process.env.REACT_APP_ENV', process.env.REACT_APP_ENV)
if (process.env.REACT_APP_ENV=== 'development') {
  require('@/mock/index')
}
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
     <Provider store={store}>
     <ErrorBoundary>

    <App />
  </ErrorBoundary>
    </Provider>
);

reportWebVitals(root);
