import * as React from 'react';

import Avatar from '@material-ui/core/Avatar';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

interface IInfoTileProps {
    key: any
    result: any
}

// InfoTile formats the information returned from the Jikan API into a short 
// summary card which the user can click to expand and view more details
export default class InfoTile extends React.Component<IInfoTileProps> {

    constructor(props: IInfoTileProps) {
        super(props)
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
                    console.log('statusCode', response.status)
                    return
                }
                
                response.json()
                    .then(
                        (data: any) => {
                            console.log("data: ", data)
                    });
        });
    }

    public render() {
        return (          
            <div style={{padding: 8}}>
                    <Paper>
                        <ExpansionPanel>  
                            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                                <Avatar
                                alt={this.props.result.title} 
                                src={this.props.result.image_url} 
                                style={{borderRadius: 10, width: 90, height: 126}} // Has problems...
                                />
                                <Typography variant="headline">
                                    {this.props.result.title}
                                    <Typography variant="body1">
                                        {this.props.result.description}
                                    </Typography>  
                                </Typography>                                  
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                                <Typography>
                                    {this.props.result.description}
                                </Typography>
                            </ExpansionPanelDetails>
                        </ExpansionPanel>
                    </Paper>
            </div>   
        )
    }
}