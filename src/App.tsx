import './css/stylesheet.css';

import * as React from 'react';
import { Route, Switch } from 'react-router-dom';

import CssBaseline from '@material-ui/core/CssBaseline';

import Header from './components/Header';
// import Home from './components/Home';

export default class App extends React.Component {

	public render() {
		return (      
			<div>
				<CssBaseline />
				<Switch>
					<Route component={Header}/>
				</Switch>
			</div>
		);
	}
}