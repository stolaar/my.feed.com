import React from 'react'
import MaterialPagination from '@material-ui/lab/Pagination'
import {makeStyles} from "@material-ui/core";
import PaginationItem from '@material-ui/lab/PaginationItem';

const useStyles = makeStyles(theme => ({
    root: {
        color: theme.palette.common.white
    },
    selected: {
        backgroundColor: 'transparent',
    },
    item: {
    color: theme.palette.common.white,
        '&:hover': {
            backgroundColor: theme.palette.primary.light
        }
    }
}))

function Pagination({page,count, onChange}) {
    const classes = useStyles()

    return <MaterialPagination className={classes.root}
                               page={page}
                               count={count}
                               color="default"
                               onChange={onChange}
                               renderItem={(item)=> <PaginationItem {...item}
                               className={classes.item}
                               classes={{selected:classes.selected}} />} />
}

export default Pagination
