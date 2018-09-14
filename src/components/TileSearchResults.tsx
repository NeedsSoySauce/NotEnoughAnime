import * as qs from 'query-string';
import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { withRouter } from 'react-router-dom';
import { isString } from 'util';

import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import PageNav from './PageNav';
import SearchInfoTile from './SearchInfoTile';

interface ITileSearchResultsProps extends RouteComponentProps<TileSearchResults> {
	match: any
	key: any
}

interface ITileSearchResultsStates {
	status: any
	response: any // data returned by the API
	params: any
	qs: any // query string
}

const CenterDiv = {
	display: "flex", 
	justifyContent: "center", 
	alignItems: "center", 
	marginTop: "33vh",
}


export class TileSearchResults extends React.Component<ITileSearchResultsProps, ITileSearchResultsStates> {

	// Used to abort an ongoing fetch request
	// source: https://stackoverflow.com/questions/31061838/how-do-i-cancel-an-http-fetch-request
	private controller = new AbortController();
	private abortSignal = this.controller.signal

	constructor(props: ITileSearchResultsProps) {
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
		
		const validSearchCategories = ["anime", "manga"]

		const params = this.state.params;
		const query = this.state.qs;
		
		if (validSearchCategories.indexOf(params.searchCategory) > -1) {

			// We can immediately submit a request to the API if we have the necessary query values, otherwise we can only perform a
			// partial searach
			
			if (isString(query.q) && this.checkInput()) {
				return true
			}

			this.setState({
				status: "no_query"
			})

			return false

		}

		this.setState({
			status: "invalid_url"
		})

		// Take the user back to the homepage
		this.props.history.replace("")

		return false
	}

	// When this component mounts that means the URL has changed to /search/:searchParams
	public componentDidMount = () => {		
		if (this.checkURL()) {
			this.submitRequest()	
		} 	
	}



	// If we're waiting on a fetch request and this component has unmounted, we need to cancel that request
	public componentWillUnmount = () => {
		// console.log("Aborting fetch request")
		this.controller.abort()
	}

	// Submits a request to the jikan API based on the currently selected search options and text input (from the url)
	public submitRequest = () => {

		if (!this.checkInput()) {
			return
		}

		const searchCategory = this.state.params.searchCategory;

		const query = {
			q: this.state.qs.q,
			page: this.state.qs.page || 1,
		}

		document.title = "Search: " + query.q

		// Encode the query into a valid query string
		const queryString = qs.stringify(query)

		// console.log(queryString)

		const URL: string = `https://api.jikan.moe/v3/search/${searchCategory}?${queryString}`
		// console.log("URL", URL)

		fetch(URL, {signal: this.abortSignal})
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
        .catch(err => {
            if (err.name === "AbortError") {
                console.log("Aborted Fetch (this is not an error)")
            } else{
                console.error("Unexpected Error:", err)
            }
        });
	}

	public requestComplete = (data: any) => {
		console.log("Data:", data)
		this.setState({
			status: "fetched_results",
			response: data
		}) 
	}

	public createTiles = () => {

		const tiles: any = [];

		this.state.response.results.forEach((element: any) => {

			// myanimelist also lists more adult-oriented content using the rating "rx". I don't want this stuff to show up.
			if (element.rated === "Rx") {
				return
			}

			tiles.push(
				<SearchInfoTile key={element.mal_id} result={element}/>
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
					<Typography variant="display3" align="center">	
						No results found
					</Typography>
				</div>
						
				
			)

		// By default, we render a circular progress until a result has been found
		} else if (this.state.status === "no_query") {
			return (
				<div style={CenterDiv}>				
					<Typography variant="display3" align="center">	
						Enter a query into the search bar
					</Typography>
				</div>
			)

		} else if (this.state.status === "invalid_url") {
			return (
				<div style={CenterDiv}>			
					<Typography variant="display3" align="center">	
						Invalid URL
					</Typography>
				</div>
			)

		} else {
			return (
				<div style={CenterDiv}>
					<CircularProgress />
				</div>
					
			)
		}
	}
}

export default withRouter(TileSearchResults)