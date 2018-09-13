import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { withRouter } from 'react-router-dom';

import { Grid, IconButton, Paper, TextField } from '@material-ui/core/';
import { withStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';

import * as qs from 'query-string';
import { isString } from 'util';

// import SearchContext from './SearchContext';

interface ISearchBarProps extends RouteComponentProps<Searchbar>{
	classes: any
}

interface ISearchBarState {         
	query: "",
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

		const parsed = qs.parse(this.props.location.search)

		if (isString(parsed.q)) {
			this.state = {
				query: parsed.q,
			}
		} else {
			this.state = {
				query: "",
			}
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

	// Updates the current URL with the given search parameters
	public updateURL = () => {

		if (!this.checkInput()) {
			console.log("Search query length < 3 characters")
			return
		}

		const type: string = "anime"

		const query = {
			q: this.state.query,
			page: 1
		}

		// Encode the query into a valid query string
		const queryString = qs.stringify(query)

		const URL: string = `/search/${type}/?${queryString}`

		this.props.history.push(URL)
	}

	// Triggers any time the user presses a key down in the searchbar
	public handleKeyDown = (event: any) => {
		// Only trigger if the user presses enter
		if (event.keyCode === 13) {
			this.updateURL();
		}    
	}

	// Updates searchbar value as the user types
	public handleChange = (event: any) => {
		this.setState({ 
			query: event.target.value 
		});
	}

	// Triggered when user clicks the search icon in the searchbar
	public handleClick = () => {
		this.updateURL();
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
