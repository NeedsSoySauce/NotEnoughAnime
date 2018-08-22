import { TextField } from '@material-ui/core/';
import * as React from 'react';

export default class Search extends React.Component<{}, {value: string}> {

    public state: any = {
        value: ""
    }

    public handleKeyDown = (event: any) => {
        // If the user presses enter and all conditions to submit an api request are met, submit one
        console.log(event.keyCode)
        if (event.keyCode === 13) {
            console.log(this.state.value)
        }    
    }

    public handleChange = (event: any) => {
        this.setState({ 
            value: event.target.value 
        });
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
                    onChange={(this.handleChange)}
                />
            </div>

        );
    }
}