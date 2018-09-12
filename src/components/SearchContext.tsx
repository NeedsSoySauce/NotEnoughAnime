import * as React from 'react';

// Setup a context to track our search filters, current page, etc
const SearchContext = React.createContext({data: [], status: [], currentPage: 1});

export default SearchContext;