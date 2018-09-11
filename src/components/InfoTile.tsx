import * as React from 'react';

import { List, ListItem, ListItemText } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
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
            width: "100%",
          },
        cssFloat: "left",
        overflow: "visible",
    },
    Title: {
        paddingBottom: theme.spacing.unit,
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
    // We only do this when the user wants more info as we don't want to make too many requests
    public getDetails = () => {

        const URL: string = `https://api.jikan.moe/v3/anime/${this.props.result.mal_id}`

        // Alternate fetch version
        fetch(URL)
        .then((response: any) => {
            if (response.status !== 200) {
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
            fullResult: data
        })   
    }

    public handleClick = () => {
        // The first time this panel is expanded, make an API call to load the whole anime's details
        if (!this.state.expanded) {
            if (this.state.fullResult === null && this.state.fullResult !== undefined) {
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

    // Returns a list of chip elements for each genre in the current anime
    public getGenres = () => {

        const fullResult = this.state.fullResult;
        const isLoaded = fullResult !== null && fullResult !== undefined && this.state.expanded;

        if (!isLoaded) {
            return null
        }

        const genres = this.state.fullResult.genres;      
        const chips: any = []

        for (const elem of genres) {
            chips.push(<Grid item={true}><Chip label={elem.name}/></Grid>)               
        }

        return (

            <Grid container={true} spacing={16} justify="center" style={{paddingTop: 8}}>
                {chips}
            </Grid>

        )
    }

    // Should still look okay up to about 320px width
    public render() {
        
        const result = this.props.result;
        const fullResult = this.state.fullResult;

        const classes = this.props.classes;
        const isLoaded = fullResult !== null && fullResult !== undefined && this.state.expanded;
        const isLoading = fullResult === undefined;
        const dense = true;

        return ( 

            <Grid item={true} xs={11} md={8} className={classes.Grid}>
                <Paper className={classes.Paper}>            
                    <Grid container={true}>
                        <div className={classes.AvatarDiv}>
                            <Avatar
                                src={result.image_url}
                                className={classes.Avatar}
                            />
                        </div>                  
                        
                        <div className={classes.DescriptionDiv}>
                            <Typography variant="headline" className={classes.Title}>
                                {result.title}
                            </Typography>      

                            <Typography variant="body1">
                                {isLoaded ? fullResult.synopsis : result.synopsis}                
                            </Typography>     
                            
                            {this.getGenres()}

                            {isLoaded &&         
                                <Grid container={true} spacing={16} style={{paddingTop: 8, paddingLeft: 8}} justify="space-between">

                                    <List dense={dense} disablePadding={true}>
                                        <ListItem disableGutters={true}>
                                            <ListItemText
                                                primary="Episodes"
                                                secondary={fullResult.episodes}  
                                            />
                                        </ListItem>
                                    </List>
                                    <List dense={dense}>
                                        <ListItem disableGutters={true}>
                                            <ListItemText
                                                primary="Duration"
                                                secondary={fullResult.duration}
                                            />
                                        </ListItem>
                                    </List>
                                    <List dense={dense}>
                                        <ListItem disableGutters={true}>
                                            <ListItemText
                                                primary="Type"
                                                secondary={fullResult.type}
                                            />
                                        </ListItem>
                                    </List>
                                    <List dense={dense}>
                                        <ListItem disableGutters={true}>
                                            <ListItemText
                                                primary="Status"
                                                secondary={fullResult.status}
                                            />
                                        </ListItem>
                                    </List>
                                    <List dense={dense}>
                                        <ListItem disableGutters={true}>
                                            <ListItemText
                                                primary="Rating"
                                                secondary={fullResult.rating}
                                            />
                                        </ListItem>
                                    </List>

                                </Grid>          
                            } 

                        </div>
                        
                        <Grid container={true} justify="center">
                            <Button size="small" style={{justifyContent: "center"}} onClick={this.handleClick}>
                                <Typography variant="button" color="primary">
                                    {isLoaded ? "Less info" : isLoading ? <CircularProgress size={30}/> : "More info"}
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