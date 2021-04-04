import { ThemeProvider } from '@material-ui/core/styles';
import React from 'react';
import MainRouter from './MainRouter';
import { BrowserRouter } from 'react-router-dom';
import theme from './theme';
import { hot } from 'react-hot-loader';

const App = () => {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <MainRouter />
      </ThemeProvider>
    </BrowserRouter>
  );
};

// Marking the App component below as hot enables live reloading of react components during development.
export default hot(module)(App);
