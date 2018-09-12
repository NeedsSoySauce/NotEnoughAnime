import * as React from 'react';
import { BrowserRouter } from 'react-router-dom';
import App from './App'

export const AppRouter: React.StatelessComponent<{}> = () => {

    return (

        <BrowserRouter>
            <App />
        </BrowserRouter>

    );
}

export default AppRouter