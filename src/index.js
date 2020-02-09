import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import theme from './theme';
import { ThemeProvider } from '@material-ui/styles';
import {BrowserRouter} from 'react-router-dom'


ReactDOM.render(
    <BrowserRouter>
    <ThemeProvider theme={theme}>
    <App />
    </ThemeProvider>
    </BrowserRouter>,
     document.getElementById('root'));