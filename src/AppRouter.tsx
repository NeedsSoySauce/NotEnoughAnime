import * as React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';

import App from './App';
import Home from './components/Home';
import TileResults from './components/TileResults';

// Using a key to force TileResults to remount when the URL changes
const Result = () => {
    return (
        <TileResults key={window.location.href} />
    )
}

export const AppRouter: React.StatelessComponent<{}> = () => {

    return (

        <BrowserRouter>
            <main>     
                <App />      
                <Switch>
                    <Route exact={true} path='/' component={Home} />                    
                    <Route path='/search/:searchCategory' render={Result}/>
                    <Redirect from="*" to='/' />                  
                </Switch>
            </main>
        </BrowserRouter>

    );
}

export default AppRouter