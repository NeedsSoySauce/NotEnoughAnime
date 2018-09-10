import * as React from 'react';

import Avatar from '@material-ui/core/Avatar';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

interface IInfoTileProps {
    key: any
    result: any
}

interface IInfoTileStates {
    expanded: boolean
    fullResult: any
}

const styles = {
    Grid: {
        width: "100%",
    },
    Paper: {
        padding: 16,
        height: 158,
    },
    Avatar: {
        width: 90,
        height: 126,
        borderRadius: 10,
    }
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

        <Grid item={true} xs={11} sm={8} style={styles.Grid}>
            <Paper style={styles.Paper}>
                
                <Grid container={true}>
    
                        <div style={{display: "inline-block"}}>
                            <Avatar
                                src={this.props.result.image_url}
                                style={styles.Avatar}
                            />
                        </div>                  
                        
                        <div style={{display: "inline-block", backgroundColor: "red"}}>
                            {this.props.result.description}
                        </div> 
                      
                </Grid>

            </Paper>
        </Grid>              
        )
    }
}