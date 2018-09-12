import './css/stylesheet.css';

import * as React from 'react';

import { Route } from 'react-router-dom';

import { AppBar } from '@material-ui/core/';
import CssBaseline from '@material-ui/core/CssBaseline';

import Searchbar from './components/Searchbar';
import SearchContext from './components/SearchContext';

export default class App extends React.Component {

	public state: any = {
		APIResponse: [],
		APIStatus: "no_call",
		pageNumber: 1,
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

	public updatePage = (page: number) => {
		this.setState({
			pageNumber: page
		},
		// () => console.log("pageNumber: ", this.state.pageNumber)
		)
		
	}

	public render() {

		const contextValues = {
			data: this.state.APIResponse, 
			status: this.state.APIStatus, 
			currentPage: this.state.pageNumber,
			updatePage: this.updatePage,
		}

		return (      
				<SearchContext.Provider value={contextValues}>
						<CssBaseline />
						<AppBar position="sticky">
							<Route>
								<Searchbar setAppState={this.updateResponse} setAPIStatus={this.updateStatus} page={this.state.pageNumber} setPage={this.updatePage}/>
							</Route>
                            
						</AppBar>
                </SearchContext.Provider>
		);
	}
}

// Different approach, we have the searchbar in the header and TileResults renders whatever results we've found