import * as React from 'react';

// The home page is just a larger search box. Nothing special.
import Searchbar from './Searchbar';

class Home extends React.Component<{}> {

    public render() {
        return (
            <Searchbar key={window.location.href}/>
        )
    }
}

export default Home