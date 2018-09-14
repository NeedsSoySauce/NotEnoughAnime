import * as React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';

import { createMuiTheme } from '@material-ui/core/styles';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';

import App from './App';
import Home from './components/Home';
import TileSearchResults from './components/TileSearchResults';

const muiTheme = createMuiTheme({
			palette: {
				primary: {
					main: '#2196f3' // Blue color from material ui demo page
				},
			type: 'dark'
		},
	});

// console.log(muiTheme)

// Using a key to force TileResults to remount when the URL changes
const Result = () => {
	return (
		<TileSearchResults key={window.location.href} />
	)
}

export const AppRouter: React.StatelessComponent<{}> = () => {

	return (

		<MuiThemeProvider theme={muiTheme} >
			<BrowserRouter>
				<main>     
					<App />      
					<Switch>              
						<Route exact={true} path="/" component={Home}/> 
						<Route path='/search/:searchCategory' render={Result}/>
						<Redirect to='/'/>                  
					</Switch>
				</main>
			</BrowserRouter>
		</MuiThemeProvider>


	);
}

export default AppRouter