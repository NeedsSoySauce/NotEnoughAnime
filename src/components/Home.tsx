import * as React from 'react';

import { AppBar, Tab, Tabs, Typography, withWidth } from '@material-ui/core';

import TileScheduleResults from './TileScheduleResults';

interface IHomeProps {
    width: any
}

// The home page renders results that shows anime that are currently airing
class Home extends React.Component<IHomeProps> {

    public state = {
        value: 0
    }

	public handleChange = (event: any, value: any) => {
		this.setState({
			value
		})
	}

    public render() {

        const value = this.state.value;

        return (
            <div>
                <Typography variant="display2" align="center" style={{paddingTop: 16}}>
                    Hi! Here's this weeks anime schedule.
                </Typography>
                <AppBar position="static" style={{marginTop: 16}}>
                    <Tabs 
                        value={value} 
                        onChange={this.handleChange} 
                        // centered={true} 
                        fullWidth={true}
                        scrollable={true}
                        scrollButtons="on"
                    >
                        <Tab label="Mon"/>
                        <Tab label="Tue"/>
                        <Tab label="Wed"/>
                        <Tab label="Thu"/>
                        <Tab label="Fri"/>
                        <Tab label="Sat"/>
                        <Tab label="Sun"/>
                    </Tabs>
                </AppBar>
                {value === 0 && <TileScheduleResults day="monday" key={window.location.href} />}
                {value === 1 && <TileScheduleResults day="tuesday" key={window.location.href} />}
                {value === 2 && <TileScheduleResults day="wednesday" key={window.location.href} />}
                {value === 3 && <TileScheduleResults day="thursday" key={window.location.href} />}
                {value === 4 && <TileScheduleResults day="friday" key={window.location.href} />}
                {value === 5 && <TileScheduleResults day="saturday" key={window.location.href} />}
                {value === 6 && <TileScheduleResults day="sunday" key={window.location.href} />}
                
            </div>
        ) 
    }
}

export default withWidth()(Home)