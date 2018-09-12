import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { withRouter } from 'react-router-dom';

import { Grid, IconButton, Paper, TextField } from '@material-ui/core/';
import { withStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';

// import SearchContext from './SearchContext';

interface ISearchBarProps extends RouteComponentProps<Searchbar>{
	setAppState: any
	setAPIStatus: any
	setPage: any
	classes: any
	page: number
}

interface ISearchBarState {         
	query: "",
	prevQuery: "",
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
			query: "",
			prevQuery: ""
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
	public submitRequest = (newQuery = true) => {

		if (!this.checkInput()) {
			console.log("Search query length < 3 characters")
			return
		}

		// Encode the query into a valid url component
		const query: string = encodeURIComponent(this.state.query)

		const type: string = "anime"
		let page: number = this.props.page

		// If we want to perform a new search rather than get the next page of the current search
		if (newQuery) {
			page = 1
			this.props.setPage(1)
		}
		
		const URL: string = `/search/${type}/?q=${query}&page=${page}`

		this.props.history.push(URL)
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

	// If the page number has changed, we need to fetch the next page of results
	public componentDidUpdate = (prevProps: any, prevState: any, snapshot: any) => {
		if (prevProps.page !== this.props.page) {
			console.log("Searchbar page changed")
			this.submitRequest(false)		
		}		
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
				</Grid>
			</div>
		);
	}
}

export default withRouter(withStyles(styles)((Searchbar)))
