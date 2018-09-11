import * as React from 'react';

import { Grid, IconButton, Paper, TextField, withWidth } from '@material-ui/core/';
import { withStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';

interface ISearchBarProps {
    setAppState: any
    setAPIStatus: any
    classes: any
    width: any
}

interface ISearchBarState {
    genre: 0,           
    page: 1,
    query: "",
    rated: "",  
    status: "",
    type: "",
}

const styles = (theme: any) => ({
    SearchbarDiv: {
        padding: theme.spacing.unit,
    }, 
    IconButton: {
        height: "1.4em"
    },
    Paper: {
        cssflexDirection: "row",
    },

})

class Searchbar extends React.Component<ISearchBarProps, ISearchBarState> {

    public state: any = {
        genre: 0,           
        page: 1,
        query: "",
        rated: "",  
        status: "",
        type: "",
    }

    constructor(props: ISearchBarProps) {
        super(props)
    }

    // Searches to myanimelist via the jikan API must be at least 3 characters long, so this just returns true or false
    // depending on whether the text input is long enough 
    public checkInput = () => {
        if (this.state.query.length >= 3) {
            return true
        }
        return false 
    }

    // Submits a request to the jikan API based on the currently selected search options and text input
    public submitRequest = () => {

        if (!this.checkInput()) {
            return
        }

        // Encode the query into a valid url component
        const query: string = encodeURIComponent(this.state.query)

        // Set app status to fetching so we know when to display a progress indicator
        this.props.setAPIStatus("fetching")

        // Make an API call and set the API status to the appropriate value based on the API's response
        // so that we can stop displaying a progress indicator
        fetch(`https://api.jikan.moe/search/anime/${query}/1`)
            .then(
                (response: any) => { 
                    if (response.status !== 200) {
                        if (response.status === 500) {
                            this.props.setAPIStatus("fetched_no_results")
                            return
                        }
                        console.log('statusCode', response.status)
                        return
                    }
                    
                    response.json()
                        .then(
                            (data: any) => {
                                this.props.setAppState(data.result)
                                this.props.setAPIStatus("fetched_results")
                        });
            });
    }

    public handleKeyDown = (event: any) => {
        // Only trigger if the user presses enter
        if (event.keyCode === 13) {
            this.submitRequest();
        }    
    }

    public handleChange = (event: any) => {
        this.setState({ 
            query: event.target.value 
        });
    }

    public handleClick = () => {
        this.submitRequest();
    }

    public render() {

        const classes = this.props.classes;

        return (

            <div className={classes.SearchbarDiv}>   
                <Grid container={true} justify="center">
                    <Paper className={classes.Paper}>
                        <Grid container={true} alignItems="flex-end">
                            
                            <Grid item={true}>
                                <IconButton onClick={this.handleClick} className={classes.IconButton}>
                                    <SearchIcon />
                                </IconButton>
                            </Grid>
                            
                            <Grid item={true}>                     
                                <TextField
                                    InputProps={{
                                        disableUnderline: true
                                    }}
                                    autoFocus={true} 
                                    placeholder="Search"
                                    value={this.state.query}
                                    onKeyDown={this.handleKeyDown}
                                    onChange={this.handleChange}
                                    className={classes.TextField}
                                />   
                            
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
            </div>
        );
    }
}

export default withStyles(styles)(withWidth()(Searchbar))