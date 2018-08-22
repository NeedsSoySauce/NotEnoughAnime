import * as React from 'react';
import Search from './components/Search';
import './css/stylesheet.css';

// This renders a text field allowing the user to enter a league of legends in-game username, 
// as well as a droptown to select that users region
export default class App extends React.Component {
  public render() {
    return (
      <div className="App">
          <h1 className="App-title">Home page</h1>
          <Search />
      </div>
    );
  }
}
