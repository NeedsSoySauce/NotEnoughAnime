import '../css/stylesheet.css';

import * as React from 'react';
import { Route } from 'react-router-dom';

import { AppBar } from '@material-ui/core/';

import Searchbar from './Searchbar';

import { withTheme } from '@material-ui/core/styles';

import { Fragment } from 'react'

interface IHeaderProps {
    theme: any
}



export class Header extends React.Component<IHeaderProps> {

    private ContentOffset = parseFloat(this.props.theme.typography.body1.fontSize.slice(0, -3)) * this.props.theme.typography.fontSize 
                            + this.props.theme.spacing.unit * 5
    
    constructor(props: any) {
        super(props)
    }

    public render() {

        return (
            <div>
                <AppBar position="static" style={{height: this.ContentOffset}}>
                    <Fragment/>
                </AppBar>
                
                <AppBar position="fixed">
                    <Route>
                        <Searchbar key={window.location.href}/>
                    </Route>				
                </AppBar>
            </div>


        )
    }
}

export default withTheme()(Header)