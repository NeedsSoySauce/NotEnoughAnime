import '../css/stylesheet.css';

import * as React from 'react';

import { AppBar } from '@material-ui/core/';

export default class Header extends React.Component {

    public render() {
        return (
            <AppBar position="sticky">
                "Hello World!"
            </AppBar>
        )
    }


}
