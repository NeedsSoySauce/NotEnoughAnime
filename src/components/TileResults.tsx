import * as React from 'react';
import InfoTile from './InfoTile';

import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid'

interface ITileResultsProps {
    results: any
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

        this.props.results.forEach((element: any) => {
            tiles.push(
                <InfoTile key={element.mal_id} result={element}/>
            )
        });

        return (
            <Grid
                container={true}
                justify="center"
                direction="column"
                alignItems="center"
                spacing={16}
                style={{paddingTop: 16}}
            >               
                {tiles}
            </Grid>         
        )

    }

    public render() {
        if (this.props.status === "fetched_results") {
            return (
               this.createTiles()      
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