import * as React from 'react';

import { Grid, IconButton } from '@material-ui/core';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import LastPageIcon from '@material-ui/icons/LastPage';

interface IPageNavProps {
    pageCount: number
    updatePage: any
    currentPage: number
}

class PageNav extends React.Component<IPageNavProps> {

    constructor(props: any) {
        super(props)
    }

    // Switches to the given page number (if possible)
	public changePage = (pageNumber: number) => {
        const pageCount = this.props.pageCount;   
        // console.log("pageNumber (PageNav)", pageNumber)
        if (pageNumber >= 1 && pageNumber <= pageCount && pageNumber !== this.props.currentPage) {
            this.props.updatePage(pageNumber)
        }
        // console.log("currentPage:", this.props.currentPage)
	}

    public firstPage = () => {
        this.changePage(1)
    }

    public nextPage = () => {
        this.changePage(this.props.currentPage + 1)
    }

    public scrollToTop = () => {
        window.scrollTo(0, 0)
    }

    public previousPage = () => {
        this.changePage(this.props.currentPage - 1)
    }

    // myanimelist will only ever return up to 20 pages in its results, so we can't actually take
    // the user to the true last page in a single leap
    public lastPage = () => {
        this.changePage(this.props.pageCount)
    }

    public render() {

        const currentPage = this.props.currentPage;
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

export default PageNav