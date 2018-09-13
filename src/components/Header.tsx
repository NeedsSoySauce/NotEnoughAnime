import '../css/stylesheet.css';

import * as React from 'react';
import { Route } from 'react-router-dom';

import { AppBar } from '@material-ui/core/';

import Searchbar from './Searchbar';

export default class Header extends React.Component {

    public render() {
        return (
            <AppBar position="sticky">
                <Route>
                    <Searchbar key={window.location.href}/>
                </Route>				
            </AppBar>
        )
    }
}
