import * as qs from 'query-string';
import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { withRouter } from 'react-router-dom';
import { isString } from 'util';

import { Grid, IconButton, Paper, TextField } from '@material-ui/core/';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import { withStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import SearchIcon from '@material-ui/icons/Search';

// import SearchContext from './SearchContext';

interface ISearchBarProps extends RouteComponentProps<Searchbar>{
	classes: any
}

interface ISearchBarState {         
	query: "",
	open: boolean,
}

const styles = (theme: any) => ({
	SearchbarDiv: {
		padding: theme.spacing.unit,
	}, 
	IconButton: {
		width: theme.typography.body1.lineHeight,
		height: theme.typography.body1.lineHeight
	},
	Paper: {
		cssflexDirection: "row",
	}, 
	Tooltip: {
		marginTop: theme.spacing.unit,
	}

})

class Searchbar extends React.Component<ISearchBarProps, ISearchBarState> {

	constructor(props: ISearchBarProps) {
		super(props)

		const parsed = qs.parse(this.props.location.search)

		if (isString(parsed.q)) {
			this.state = {
				query: parsed.q,
				open: false,
			}
		} else {
			this.state = {
				query: "",
				open: false
			}
		}
	}

	// Searches to myanimelist via the jikan API must be at least 3 characters long, so this just returns true or false
	// depending on whether the text input is long enough 
	public checkInput = () => {
		if (this.state.query.trim().length >= 3) {
			return true
		}
		this.openTooltip()
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
			q: this.state.query.trim(),
			page: 1
		}

		// Encode the query into a valid query string
		const queryString = qs.stringify(query)

		const URL: string = `/search/${type}/?${queryString}`

		this.props.history.push(URL)
	}

	public openTooltip = () => {
		this.setState({
			open: true
		})
	}

	public closeTooltip = () => {
		this.setState({
			open: false
		})
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

						<ClickAwayListener onClickAway={this.closeTooltip}>
							<div>
								<Tooltip
								PopperProps={{
									disablePortal: true,
								}}
								onClose={this.closeTooltip}
								open={this.state.open}
								disableFocusListener={true}
								disableHoverListener={true}
								disableTouchListener={true}
								title="Searches must contain at least 3 characters (not including leading and trailing whitespace)"
								classes={{tooltip: classes.Tooltip}}
								>

								<Grid container={true} alignItems="flex-end">
									
									<Grid item={true}>
										<IconButton onClick={this.handleClick} className={classes.IconButton}>
											<SearchIcon />
										</IconButton>
									</Grid>
									
									<Grid item={true}>     
										<div>           
											<TextField
												InputProps={{
													disableUnderline: true
												}}
												autoFocus={true} 
												placeholder="Search for anime"
												value={this.state.query}
												onKeyDown={this.handleKeyDown}
												onChange={this.handleChange}
												className={classes.TextField}
											/>   	
										</div>     				
									</Grid>					
								</Grid>

								</Tooltip>
							</div>
						</ClickAwayListener>	
						
					</Paper>
				</Grid>
			</div>
		);
	}
}

export default withRouter(withStyles(styles)((Searchbar)))
