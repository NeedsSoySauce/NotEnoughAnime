import * as React from 'react';

import { Grid, IconButton } from '@material-ui/core';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import LastPageIcon from '@material-ui/icons/LastPage';

interface IPageNavProps {
    initialPage: number
    pageCount: number
}

interface IPageNavStates {
    currentPage: number
}

class PageNav extends React.Component<IPageNavProps, IPageNavStates> {

    constructor(props: any) {
        super(props)

        this.state = {currentPage: this.props.initialPage}
    }

    // Switches to the given page number (if possible)
	public changePage = (pageNumber: number) => {
        const pageCount = this.props.pageCount;   

        if (pageNumber >= 1 && pageNumber <= pageCount) {
            this.setState({
                currentPage: pageNumber
            })
        }
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

    public lastPage = () => {
        this.changePage(this.props.pageCount)
    }

    public render() {

        return (

            <div>
                <Grid container={true} spacing={8} justify="space-evenly">
                
                    <Grid item={true}>
                        <IconButton onClick={this.firstPage}>
                            <FirstPageIcon />
                        </IconButton>
                        <IconButton onClick={this.previousPage}>
                            <ChevronLeftIcon />
                        </IconButton>
                        <IconButton onClick={this.scrollToTop}>
                            <ArrowUpwardIcon />
                        </IconButton>
                        <IconButton onClick={this.nextPage}>
                            <ChevronRightIcon />
                        </IconButton>
                        <IconButton onClick={this.lastPage}>
                            <LastPageIcon />
                        </IconButton>
                    </Grid>
                </Grid>
            </div>

        )

    }

}

export default PageNav