import * as React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import App from './App'

export const AppRouter: React.StatelessComponent<{}> = () => {

    return (

        <BrowserRouter>
            <div>
                <main>
                    <Switch>
                        <Route exact={true} path="/" component={App} />
                        <Redirect from='*' to='/' />
                    </Switch>
                </main>
            </div>
        </BrowserRouter>

    );
}