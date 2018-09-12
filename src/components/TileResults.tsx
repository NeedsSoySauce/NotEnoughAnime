import * as React from 'react';

import { RouteComponentProps } from 'react-router';
import { withRouter } from 'react-router-dom';

import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';

import InfoTile from './InfoTile';
import PageNav from './PageNav';
import SearchContext from './SearchContext';

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

		const queryString = require('query-string');
		const parsed = queryString.parse(this.props.location.search)

		this.state = {
			status: "fetching", 
			response: undefined, 
			params: this.props.match.params,
			qs: parsed
		}
	}

	// Searches to myanimelist via the jikan API must be at least 3 characters long, so this just returns true or false
	// depending on whether the text input is long enough 
	public checkInput = () => {
		console.log("Query", this.props.location.search)		
		console.log("Query parsed", this.state.qs)
		console.log("Params", this.state.params)
		if (this.state.qs.q.length >= 3) {
			return true
		}
		return false 
	}

	public componentDidMount = () => {
		console.log("TileResults mounted!")
		this.submitRequest()		
	}

	// Submits a request to the jikan API based on the currently selected search options and text input (from the url)
	public submitRequest = () => {

		if (!this.checkInput()) {
			return
		}

		// Encode the query into a valid url component
		const query: string = encodeURIComponent(this.state.qs.q)
		const page: number = this.state.qs.page

		const URL: string = `https://api.jikan.moe/v3/search/anime?q=${query}&page=${page}`
		console.log("URL", URL)

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
		console.log("Data:", data)
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
		
		// By default, we render a circular progress until a result has been found
		if (this.state.status === "fetched_results") {
			return (
				<div>
					{this.createTiles()}
					<SearchContext.Consumer>
						{
							(context: any) => {
								return <PageNav pageCount={context.data.last_page} 
										updatePage={context.updatePage} currentPage={context.currentPage}/>
							}
						}						
					</SearchContext.Consumer>			   		
				</div>			   
			)

		} else if (this.state.status === "fetched_no_results") {
			return (
				<div style={CenterDiv}>
					No results found
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

export default withRouter(TileResults)