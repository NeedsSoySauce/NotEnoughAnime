import * as React from 'react';

import { Grid, IconButton, Paper, TextField, withWidth } from '@material-ui/core/';
import { withStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';

import SearchContext from './SearchContext';

interface ISearchBarProps {
	setAppState: any
	setAPIStatus: any
	classes: any
	width: any
}

interface ISearchBarState {
	genre: 0,           
	page: 1,
	query: "",
	rated: "",  
	status: "",
	type: "",
}

const styles = (theme: any) => ({
	SearchbarDiv: {
		padding: theme.spacing.unit,
	}, 
	IconButton: {
		height: "1.4em"
	},
	Paper: {
		cssflexDirection: "row",
	},

})

class Searchbar extends React.Component<ISearchBarProps, ISearchBarState> {

	constructor(props: ISearchBarProps) {
		super(props)

		this.state = {
			genre: 0,
			page: 1,
			query: "",
			rated: "",
			status: "",
			type: "",

		}
	}

	// Searches to myanimelist via the jikan API must be at least 3 characters long, so this just returns true or false
	// depending on whether the text input is long enough 
	public checkInput = () => {
		if (this.state.query.length >= 3) {
			return true
		}
		return false 
	}

	// Submits a request to the jikan API based on the currently selected search options and text input
	public submitRequest = () => {

		if (!this.checkInput()) {
			return
		}

		// Encode the query into a valid url component
		const query: string = encodeURIComponent(this.state.query)
		const page: number = this.state.page
		
		const URL: string = `https://api.jikan.moe/v3/search/anime?q=${query}&page=${page}`

		// Set app status to fetching so we know when to display a progress indicator
		this.props.setAPIStatus("fetching")

		// Alternate fetch version
		fetch(URL)
		.then((response: any) => {
			if (response.status !== 200) {
				this.props.setAPIStatus("fetched_no_results")
				return
			}
			response.json()
			.then((data: any) => this.requestComplete(data))
		})      
		.catch(err => console.log("Error:", err));
	}

	public requestComplete = (data: any) => {
		// console.log("Data:", data)
		this.props.setAppState(data)
		this.props.setAPIStatus("fetched_results")      
	}

	public handleKeyDown = (event: any) => {
		// Only trigger if the user presses enter
		if (event.keyCode === 13) {
			this.submitRequest();
		}    
	}

	public handleChange = (event: any) => {
		this.setState({ 
			query: event.target.value 
		});
	}

	public handleClick = () => {
		this.submitRequest();
	}

	public render() {

		const classes = this.props.classes;

		return (

			<div className={classes.SearchbarDiv}>   
				<Grid container={true} justify="center">
					<Paper className={classes.Paper}>
						<Grid container={true} alignItems="flex-end">
							
							<Grid item={true}>
								<IconButton onClick={this.handleClick} className={classes.IconButton}>
									<SearchIcon />
								</IconButton>
							</Grid>
							
							<Grid item={true}>                     
								<TextField
									InputProps={{
										disableUnderline: true
									}}
									autoFocus={true} 
									placeholder="Search"
									value={this.state.query}
									onKeyDown={this.handleKeyDown}
									onChange={this.handleChange}
									className={classes.TextField}
								/>   
							
							</Grid>					
						</Grid>
					</Paper>
					<SearchContext.Consumer>
						{(value: any) => 
							value.page === 7 ? "True!" : "False!"
						}
					</SearchContext.Consumer>
				</Grid>
			</div>
		);
	}
}

export default withStyles(styles)(withWidth()(Searchbar))