import './css/stylesheet.css';

import * as React from 'react';

import { AppBar } from '@material-ui/core/';
import CssBaseline from '@material-ui/core/CssBaseline';

import Searchbar from './components/Searchbar';
import SearchContext from './components/SearchContext';
import TileResults from './components/TileResults';

export default class App extends React.Component {

	public state: any = {
		APIResponse: [],
		APIStatus: "no_call",
	}

	// Callback to update APIResponse
	public updateResponse = (response: any) => {
		this.setState({
			APIResponse: response
		})
		// console.log("APIResponse: ", this.state.APIResponse)
	}

	// Callback to update APIStatus
	public updateStatus = (status: any) => {
		this.setState({
			APIStatus: status
		})
		// console.log("APIStatus: ", this.state.APIStatus)
	}

	public render() {
		return (      
			<div className="App">
				<SearchContext.Provider value={{greeting: "Hello World!", page: 7}}>

						<CssBaseline />
						<AppBar position="sticky">
                            <Searchbar setAppState={this.updateResponse} setAPIStatus={this.updateStatus}/>
						</AppBar>

						<TileResults results={this.state.APIResponse} status={this.state.APIStatus}/>

                </SearchContext.Provider>
			</div>
		);
	}
}
