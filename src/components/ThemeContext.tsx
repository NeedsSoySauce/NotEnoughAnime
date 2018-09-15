import * as React from 'react';

import { createMuiTheme } from '@material-ui/core';

// Not in use as I couldn't get this to work...

const muiDarkTheme = createMuiTheme({
		palette: {
			primary: {
				main: '#2196f3' // Blue color from material ui demo page
			},
		type: 'dark'
	},
});



// Setup a context to track our search filters, current page, etc
const ThemeContext = React.createContext({theme: muiDarkTheme, updateTheme: Function()});

export default ThemeContext;