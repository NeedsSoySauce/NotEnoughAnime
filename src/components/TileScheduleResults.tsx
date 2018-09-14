import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { withRouter } from 'react-router-dom';

import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';

import ScheduleInfoTile from './ScheduleInfoTile';

interface ITileScheduleResultsProps extends RouteComponentProps<TileScheduleResults> {
	match: any
	key: any
	day: any // The day to get the schedule off, if not specified the schedule for the whole week will be returned
}

interface ITileScheduleResultsStates {
	status: any
	response: any // data returned by the API
	params: any
}

const CenterDiv = {
	display: "flex", 
	justifyContent: "center", 
	alignItems: "center", 
	marginTop: "33vh"
}

export class TileScheduleResults extends React.Component<ITileScheduleResultsProps, ITileScheduleResultsStates> {

	// Used to abort an ongoing fetch request
	// source: https://stackoverflow.com/questions/31061838/how-do-i-cancel-an-http-fetch-request
	private controller = new AbortController();
	private abortSignal = this.controller.signal

	private days = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"]

	constructor(props: ITileScheduleResultsProps) {
		super(props)

		this.state = {
			status: "fetching", 
			response: undefined, 
			params: this.props.match.params,
		}
	}

	// When this component mounts that means the URL has changed to /search/:searchParams
	public componentDidMount = () => {		
		this.submitRequest()	
	}



	// If we're waiting on a fetch request and this component has unmounted, we need to cancel that request
	public componentWillUnmount = () => {
		// console.log("Aborting fetch request")
		this.controller.abort()
	}

	// Submits a request to the jikan API based on the currently selected search options and text input (from the url)
	public submitRequest = () => {

		let URL: string = `https://api.jikan.moe/v3/schedule`
		
		if (this.state.params.day !== undefined) {
			URL = `https://api.jikan.moe/v3/schedule/${this.state.params.day}`
		}

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
		// console.log("Data:", data)
		this.setState({
			status: "fetched_results",
			response: data
		}) 
	}

	// public createTiles = () => {

	// 	// console.log("Data", this.state.response)

	// 	const tiles: any = [];

	// 	this.days.forEach((day: any) => {
	// 		console.log(day, this.state.response[day])

	// 		this.state.response[day].forEach((element: any) => {

	// 			// Filter out results tagged as "adult"
	// 			if (element.r18) {
	// 				return;
	// 			}

	// 			tiles.push(
	// 				<ScheduleInfoTile key={element.mal_id} result={element}/>
	// 			)
	// 		});
	// 	});

	// 	return (
	// 		<Grid container={true} 
	// 			spacing={16} 
	// 			direction="column" 
	// 			justify="center" 
	// 			alignItems="center" 
	// 			style={{paddingTop: 16}}
	// 		>               
	// 			{tiles}
	// 		</Grid>         
	// 	)
	// }

	public createTiles = () => {

		// console.log("Data", this.state.response)

		const tiles: any = [];
		let days = this.days;

		if (this.props.day !== undefined) {
			days = [this.props.day];
		}

		days.forEach((day: any) => {
			// console.log(day, this.state.response[day])

			this.state.response[day].forEach((element: any) => {

				// Filter out results tagged as "adult"
				if (element.r18) {
					return;
				}

				tiles.push(
					<ScheduleInfoTile key={element.mal_id} result={element}/>
				)
			});
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
		
		// If any results are found, we display them as vertical tiles
		if (this.state.status === "fetched_results") {
			return (
				<div>
					{this.createTiles()}  		
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

export default withRouter(TileScheduleResults)