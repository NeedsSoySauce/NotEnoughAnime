import * as React from 'react';

import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';

import InfoTile from './InfoTile';
import PageNav from './PageNav';

interface ITileResultsProps {
	data: any
	status: any
}

const CenterDiv = {
	display: "flex", 
	justifyContent: "center", 
	alignItems: "center", 
	marginTop: "33vh"
}

export default class TileResults extends React.Component<ITileResultsProps> {

	constructor(props: ITileResultsProps) {
		super(props)
	}

	public createTiles = () => {
		
		const tiles: any = [];

		this.props.data.results.forEach((element: any) => {
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
		
		if (this.props.status === "fetched_results") {
			return (
				<div>
					{this.createTiles()}
			   		<PageNav initialPage={1} pageCount={this.props.data.last_page}/>
				</div>
			   
			)

		} else if (this.props.status === "fetching") {
			return (
				<div style={CenterDiv}>
					<CircularProgress />
				</div>
					
			)
			
		} else if (this.props.status === "fetched_no_results") {
			return (
				<div style={CenterDiv}>
					No results found
				</div>
			)
		} else {
			return (
				<div style={CenterDiv}>
					Enter a query into the search box
				</div>
			)
		}

	}
}