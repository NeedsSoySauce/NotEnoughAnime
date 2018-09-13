import * as qs from 'query-string';
import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { withRouter } from 'react-router-dom';

import { Grid, IconButton } from '@material-ui/core';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import LastPageIcon from '@material-ui/icons/LastPage';

interface IPageNavProps extends RouteComponentProps<PageNav> {
    pageCount: number
    history: any
    match: any
}

interface IPageNavStates {
	url: any
    qs: any // query string
    currentPage: number
}

class PageNav extends React.Component<IPageNavProps, IPageNavStates> {

    constructor(props: any) {
        super(props)

		const parsed = qs.parse(this.props.location.search)

		this.state = {
			url: this.props.match.url,
            qs: parsed,
            currentPage: parseInt(parsed.page, 10)
        }

        // console.log(this.state.url)
        // console.log(this.state.qs)

    }

	// Updates the current URL with the given search parameters
	public updatePage = (pageNumber: number) => {

		const url = this.state.url;

		const query = {
			q: this.state.qs.q,
			page: pageNumber
		}

		// Encode the query into a valid query string
		const queryString = qs.stringify(query)

        const nextPageURL: string = `${url}?${queryString}`

		this.props.history.push(nextPageURL)
	}

    // Switches to the given page number (if possible)
	public changePage = (pageNumber: number) => {
        const pageCount = this.props.pageCount;   
        // console.log("pageNumber (PageNav)", pageNumber)
        if (pageNumber >= 1 && pageNumber <= pageCount && pageNumber !== this.state.currentPage) {
            this.updatePage(pageNumber)
        }
        // console.log("currentPage:", this.props.currentPage)
	}

    public firstPage = () => {
        this.changePage(1)
    }

    public nextPage = () => {
        this.changePage(this.state.currentPage + 1)
    }

    public scrollToTop = () => {
        window.scrollTo(0, 0)
    }

    public previousPage = () => {
        this.changePage(this.state.currentPage - 1)
    }

    // myanimelist will only ever return up to 20 pages in its results, so we can't actually take
    // the user to the true last page in a single leap
    public lastPage = () => {
        this.changePage(this.props.pageCount)
    }

    public render() {

        const currentPage = this.state.currentPage;
        const pageCount = this.props.pageCount;
    
        const isFirstPage = currentPage === 1 ? true : false;

        // The api starts to return the previous page number once we're on the last page,
        // so we have to use >= to compare
        const isLastPage = currentPage >= pageCount ? true : false;

        return (

            <div>
                <Grid container={true} spacing={8} justify="center">
                    <Grid item={true}>
                        <IconButton onClick={this.firstPage} disabled={isFirstPage}>
                            <FirstPageIcon />
                        </IconButton>
                        <IconButton onClick={this.previousPage} disabled={isFirstPage ? true : false}>
                            <ChevronLeftIcon />
                        </IconButton>
                        <IconButton onClick={this.scrollToTop}>
                            <ArrowUpwardIcon />
                        </IconButton>
                        <IconButton onClick={this.nextPage} disabled={isLastPage ? true : false}>
                            <ChevronRightIcon />
                        </IconButton>
                        <IconButton onClick={this.lastPage} disabled={isLastPage}>
                            <LastPageIcon />
                        </IconButton>
                    </Grid>
                </Grid>
            </div>

        )
    }
}

export default withRouter(PageNav)