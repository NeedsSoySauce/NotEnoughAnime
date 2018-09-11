import * as React from 'react';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import withWidth from '@material-ui/core/withWidth';

interface IInfoTileProps {
    key: any
    result: any
    width: any
    classes: any
}

interface IInfoTileStates {
    expanded: boolean
    fullResult: any
}

const styles = (theme: any) => console.log(theme) || ({
    Grid: {
        width: "100%",
    },
    Paper: {
        padding: theme.spacing.unit * 2,
    },
    Avatar: {
        width: 90,
        height: 126,
        borderRadius: 10,
    },
    AvatarDiv: {
        width: 90,
        height: 126,
        cssFloat: "left",
        marginRight: theme.spacing.unit * 2,
    },
    DescriptionDiv: {
        [theme.breakpoints.up('sm')]: {
            width: "80%",
          },
        [theme.breakpoints.down('xs')]: {
            width: "60%",
          },
        cssFloat: "left",
        overflow: "visible",
    },
})


// InfoTile formats the information returned from the Jikan API into a short 
// summary card which the user can click to expand and view more details
class InfoTile extends React.Component<IInfoTileProps, IInfoTileStates> {

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

        const classes = this.props.classes;

        return ( 

        <Grid item={true} xs={11} md={8} className={classes.Grid}>
            <Paper className={classes.Paper}>
                
                <Grid container={true}>
    
                        <div className={classes.AvatarDiv}>
                            <Avatar
                                src={this.props.result.image_url}
                                className={classes.Avatar}
                            />
                        </div>                  
                        
                        <div className={classes.DescriptionDiv}>
                            <Typography variant="headline">
                                {this.props.result.title}
                            </Typography>       
                            <Typography variant="body1">
                                {this.props.result.description}
                            </Typography>     

                             
                        </div>
                        {/* I can't figure out how to center this at the bottom of each Paper... */}
                        <Grid container={true} justify="center">
                            <Button size="small" style={{justifyContent: "center"}}>
                                <Typography variant="button" color="primary">
                                    More info
                                </Typography>                      
                            </Button>                                
                        </Grid>  

                      
                </Grid>

            </Paper>
        </Grid>              
        )
    }
}

export default withStyles(styles)(withWidth()(InfoTile))