import * as React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';

import App from './App';
import TileResults from './components/TileResults';

export const AppRouter: React.StatelessComponent<{}> = () => {

    return (

        <BrowserRouter>
            <main>     
                <Route component={App} />      
                <Switch>                    
                    <Route path='/:category/:type?' component={TileResults} />
                    <Redirect to='/' />
                </Switch>
            </main>
        </BrowserRouter>

    );
}

export default AppRouter