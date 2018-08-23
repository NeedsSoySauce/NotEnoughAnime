import { Button, TextField } from '@material-ui/core/';
import SearchIcon from '@material-ui/icons/Search';
import * as React from 'react';

/* function SearchButton(props: any) {
    return (
        <Button onClick={props.handleClick}>
            Search
            <SearchIcon/>
        </Button>
    )
} */

export default class Search extends React.Component<{}, {value: string}> {

    public state: any = {
        value: ""
    }

    public SubmitRequest = () => {
        fetch(`https://api.jikan.moe/search/anime/${this.state.value}/1`)
        .then(
            (response: any) => { 
                if (response.status !== 200) {
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
            value: event.target.value 
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
                    value={this.state.value}
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