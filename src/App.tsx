import './css/stylesheet.css';

import * as React from 'react';

import { Route } from 'react-router-dom';

import { AppBar } from '@material-ui/core/';
import CssBaseline from '@material-ui/core/CssBaseline';

import Searchbar from './components/Searchbar';

export default class App extends React.Component {

	public render() {
		return (      
			<div>
				<CssBaseline />
				<AppBar position="sticky">
					<Route>
						<Searchbar/>
					</Route>				
				</AppBar>
			</div>
		);
	}
}