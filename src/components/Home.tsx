import * as React from 'react';
import TileScheduleResults from './TileScheduleResults';

// The home page renders results that shows anime that are currently airing
class Home extends React.Component<{}> {

    public render() {
        return (
            <div>
                <TileScheduleResults day="monday" key={window.location.href} />
            </div>
        ) 
    }
}

export default Home