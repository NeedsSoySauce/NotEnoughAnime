import * as React from 'react';

import { RouteComponentProps } from 'react-router';
import { withRouter } from 'react-router-dom';

import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';

import InfoTile from './InfoTile';
import PageNav from './PageNav';

import * as qs from 'query-string';

interface ITileResultsProps extends RouteComponentProps<TileResults> {
	match: any
}

interface ITileResultsStates {
	status: any
	response: any // data returned by the API
	params: any
	qs: any // query string
}

const CenterDiv = {
	display: "flex", 
	justifyContent: "center", 
	alignItems: "center", 
	marginTop: "33vh"
}

export class TileResults extends React.Component<ITileResultsProps, ITileResultsStates> {

	constructor(props: ITileResultsProps) {
		super(props)

		const parsed = qs.parse(this.props.location.search)

		this.state = {
			status: "fetching", 
			response: undefined, 
			params: this.props.match.params,
			qs: parsed // query string
		}
	}

	// Searches to myanimelist via the jikan API must be at least 3 characters long, so this just returns true or false
	// depending on whether the text input is long enough 
	public checkInput = () => {
		// console.log("Query", this.props.location.search)		
		// console.log("Query parsed", this.state.qs)
		// console.log("Params", this.state.params)
		// console.log("Location", window.location.href)
		if (this.state.qs.q.length >= 3) {
			return true
		}
		return false 
	}

	// Check the URL to verify that it's valid
	// A valid URL should contain:
	// - the page type of results we want (only "search" at the moment) as the first param
	// - the category of results we want (only "anime" at the moment) as the second param
	// - the search string as "q" in the query string
	// - the page number of the results we want as "page" in the query string
	public checkURL = () => {
		
		const params = this.state.params;
		// const queryString = this.state.qs;

		console.log("searchCategory:", params.searchCategory)

		return true
	}

	// When this component mounts that means the URL has changed to 
	public componentDidMount = () => {
		this.checkURL()
		if (this.checkURL) {
			this.submitRequest()	
		} else {
			this.setState({
				status: "invalid_url"
			})
		}		
	}

	// Submits a request to the jikan API based on the currently selected search options and text input (from the url)
	public submitRequest = () => {

		if (!this.checkInput()) {
			return
		}

		const searchCategory = this.state.params.searchCategory;

		const query = {
			q: this.state.qs.q,
			page: this.state.qs.page
		}

		// Encode the query into a valid query string
		const queryString = qs.stringify(query)

		const URL: string = `https://api.jikan.moe/v3/search/${searchCategory}?${queryString}`
		// console.log("URL", URL)

		fetch(URL)
		.then((response: any) => {
			if (response.status !== 200) {
				this.setState({
					status: "fetched_no_results"
				})
				return				
			}
			response.json()
			.then((data: any) => this.requestComplete(data))
		})      
		.catch(err => console.log("Error:", err));
	}

	public requestComplete = (data: any) => {
		// console.log("Data:", data)
		this.setState({
			status: "fetched_results",
			response: data
		}) 
	}

	public createTiles = () => {

		const tiles: any = [];

		this.state.response.results.forEach((element: any) => {
			tiles.push(
				<InfoTile key={element.mal_id} result={element}/>
			)
		});

		return (
			<Grid container={true} 
				spacing={16} 
				direction="column" 
				justify="center" 
				alignItems="center" 
				style={{paddingTop: 16}}
			>               
				{tiles}
			</Grid>         
		)
	}

	public render() {
		
		const response = this.state.response;
		
		// If any results are found, we display them as vertical tiles
		if (this.state.status === "fetched_results") {
			return (
				<div>
					{this.createTiles()}
					<PageNav 
						pageCount={response.last_page} 
					/>		   		
				</div>			   
			)

		} else if (this.state.status === "fetched_no_results") {
			return (
				<div style={CenterDiv}>
					No results found
				</div>
			)

		// By default, we render a circular progress until a result has been found
		} else {
			return (
				<div style={CenterDiv}>
					<CircularProgress />
				</div>
					
			)
		}
	}
}

export default withRouter(TileResults)