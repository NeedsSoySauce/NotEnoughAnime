import * as React from 'react';

// Not in use as I couldn't get this to work...

// Setup a context to track our search filters, current page, etc
const SearchContext = React.createContext({data: [], status: [], currentPage: 1});

export default SearchContext;