import { Button, TextField } from '@material-ui/core/';
import SearchIcon from '@material-ui/icons/Search';
import * as React from 'react';

export default class Search extends React.Component<{}> {

    public state: any = {
        query: "",
        rated: "",
        type: "",

        page: 1,
        status: "",

        genre: 0,

    }

    // Searches to myanimelist via the jikan API must be at least 3 characters long, so this just returns true or false
    // depending on whether the text input is long enough 
    public CheckInput = () => {
        if (this.state.query.length >= 3) {
            return true
        }
        return false 
    }

    // Submits a request to the jikan API based on the currently selected search options and text input
    public SubmitRequest = () => {

        if (!this.CheckInput()) {
            console.log("Query < 3")
            return
        }

        // Encode the query into a valid url component
        const query: string = encodeURIComponent(this.state.query)

        fetch(`https://api.jikan.moe/search/anime/${query}/1`)
            .then(
                (response: any) => { 
                    if (response.status !== 200) {
                        if (response.status === 500) {
                            console.log('No results found')
                            return
                        }
                        console.log('statusCode', response.status)
                        return
                    }
                    
                    response.json()
                        .then(
                            (data: any) => {
                                console.log('data:', data)
                        });
            });
    }

    public handleKeyDown = (event: any) => {
        if (event.keyCode === 13) {
            this.SubmitRequest();
        }    
    }

    public handleChange = (event: any) => {
        this.setState({ 
            query: event.target.value 
        });
    }

    public handleClick = () => {
        this.SubmitRequest();
    }

    public render() {
        return (
            
            <div>
                <TextField 
                    autoFocus={true} 
                    label="Label" 
                    helperText="helperText"
                    value={this.state.query}
                    onKeyDown={this.handleKeyDown}
                    onChange={this.handleChange}
                />
                <Button onClick={this.handleClick}>
                    Search
                    <SearchIcon/>
                </Button>
            </div>

        );
    }
}