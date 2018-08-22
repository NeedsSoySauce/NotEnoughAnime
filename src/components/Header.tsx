import * as React from 'react';

import { Link } from 'react-router-dom';

import MenuIcon from '@material-ui/icons/Menu';

import {AppBar, IconButton, Toolbar, Typography} from '@material-ui/core/';

export const Header: React.StatelessComponent<{}> = () => {
    return (
            <AppBar position="static">
                <Toolbar>
                    <IconButton  aria-label="Menu" color="inherit">
                        <MenuIcon aria-haspopup="true"/>
                    </IconButton>
                    <Typography variant="display2" color="inherit">
                        <Link to="/"> LoL-Stats </Link>
                        <Link to="/Stats"> Page 1 </Link>
                    </Typography>
                </Toolbar>
            </AppBar>
    );
}