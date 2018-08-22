import * as React from 'react';

import {TextField} from '@material-ui/core/';

export default class Search extends React.Component<{}, {value: string}> {

    public handleKeyDown(event: any) {
        // Search for username with riot api
        console.log(event.key)
    }

    public handleChange = (event: any) => {
        this.setState({
            value: event.value,
        });
        console.log(this.state.value)
    }

    public render() {
        return (
            
            <div>
                <TextField 
                    autoFocus={true} 
                    label="Summoner Name" 
                    helperText="Enter a username"
                    onKeyDown={this.handleKeyDown}
                    onChange={this.handleChange}
                />
            </div>

        );
    }
}