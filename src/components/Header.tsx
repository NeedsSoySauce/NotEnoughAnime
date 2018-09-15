import '../css/stylesheet.css';

import * as React from 'react';
import { Route } from 'react-router-dom';

import { AppBar, IconButton, Toolbar } from '@material-ui/core/';
import { withTheme } from '@material-ui/core/styles';
import HomeIcon from '@material-ui/icons/Home';

import Searchbar from './Searchbar';

interface IHeaderProps {
    theme: any
    history: any
}

export class Header extends React.Component<IHeaderProps> {

    private ContentOffset = parseFloat(this.props.theme.typography.body1.fontSize.slice(0, -3)) * this.props.theme.typography.fontSize 
                            + this.props.theme.spacing.unit * 5.5
    
    constructor(props: any) {
        super(props)
    }

    public linkHome = () => {
        this.props.history.push("/")
    }

    public render() {

        return (
            <div>
                {/* This AppBar is just used to push pagecontent beneath the actual AppBar */}
                <AppBar position="static" style={{height: this.ContentOffset}}>
                    <React.Fragment/>
                </AppBar>
                
                <AppBar position="fixed">
                    <Toolbar>
                        <IconButton onClick={this.linkHome}>
                            <HomeIcon />
                        </IconButton>
                        
                        <Route>
                            <Searchbar key={window.location.href}/>
                        </Route>	
                    </Toolbar>			
                </AppBar>
            </div>
        )
    }
}

export default withTheme()(Header)