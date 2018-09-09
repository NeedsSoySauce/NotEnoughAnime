import * as React from 'react';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

interface IInfoTileProps {
    key: any
    result: any
}

interface IInfoTileStates {
    expanded: boolean
    fullResult: any
}

const ButtonStyle = {
    display: "flex", 
    justifyContent: "center", 
    alignItems: "flex-end", 
}

// InfoTile formats the information returned from the Jikan API into a short 
// summary card which the user can click to expand and view more details
export default class InfoTile extends React.Component<IInfoTileProps, IInfoTileStates> {

    constructor(props: IInfoTileProps) {
        super(props)
        this.state = {expanded: false, fullResult: null}
    }

    // Submits a request to the jikan API to get detailed information about the selected anime
    public getDetails = () => {
        // Make an API call to get the full image from myanimelist for this anime
        fetch(`https://api.jikan.moe/anime/${this.props.result.mal_id}`)
            .then(
                (response: any) => { 
                    if (response.status !== 200) {
                        if (response.status === 500) {
                            return
                        }
                        return

                    } else {
                        response.json()
                            .then(
                                (data: any) => {
                                    this.setState({
                                        fullResult: data
                                    })
                            });
                    }
            });
        }

    public handleChange = () => {
        if (this.state.expanded) {
            console.log("close")         

        // The first time this panel is expanded, make an API call to load the whole anime's details
        } else if (!this.state.expanded) {
            console.log("open")
            if (this.state.fullResult === null) {
                this.setState({
                    fullResult: this.getDetails()                 
                })       
            }
        }
        console.log(this.state.fullResult)
        this.setState({
            expanded: !this.state.expanded
        });
    }

    // Returns a progress indicator overlayed over the containing div and dims the containing div
    // if that component is waiting for an API response
    public ProgressIndicator = () => {
         if (this.state.fullResult === undefined) {
            return (
                <CircularProgress />
            )
         } else {
             return
         }
    }

    public render() {

        return ( 
            <Grid item={true} xs={8} style={{width: "100%"}}>
                <Paper style={{padding: 16, borderRadius: 10}}>
                    <Grid container={true}>

                        <Grid item={true} xs={1}>
                            <Avatar
                            alt={this.props.result.title} 
                            src={this.props.result.image_url} 
                            style={{borderRadius: 10, width: 90, height: 126}}
                            />
                        </Grid>
                        
                        <Grid item={true} xs={6}>
                            <Grid container={true} direction="column">
                            
                                <Grid item={true}>
                                    <Typography variant="headline">
                                        {this.props.result.title}                                
                                        <Typography variant="body1">
                                            {this.props.result.description}
                                        </Typography>  
                                    </Typography>
                                </Grid>

                                <Grid item={true}>
                                    <div style={ButtonStyle}>
                                        <Button size="small" color="primary">
                                            <Typography variant="button" color="inherit">
                                                More info
                                            </Typography>
                                        </Button>
                                    </div> 
                                </Grid>

                            </Grid>    
                        </Grid>      

                        <Grid container={true} xs={1} direction="column">
                            <Typography variant="body2">
                                Episodes: {this.props.result.episodes}                                    
                            </Typography>  
                            <Typography variant="body2">
                                Type: {this.props.result.type}                                    
                            </Typography>                               
                        </Grid>      

                    </Grid>                                                  
                </Paper>
            </Grid>
        )
    }
}