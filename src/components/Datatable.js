import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination, Paper, useTheme, TableFooter
} from '@material-ui/core';


//TODO: titles must return from the parent component as prop, not hard coded
const titles = [
    { id: 1, title: 'Log ID', align: 'left' },
    { id: 2, title: 'Application Type', align: 'left' },
    { id: 3, title: 'Application ID', align: 'left' },
    { id: 4, title: 'Action', align: 'left' },
    { id: 5, title: 'Action Details', align: 'left' },
    { id: 6, title: 'Date: Time', align: 'left' }
]

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
    },
    table: {
        minWidth: 650,
    },
    title: {
        flex: '0 1 70%',
    },
    search: {
        width: '30%'
    },
    tableTitle: {
        padding: theme.spacing(5, 2, 3)
    },
    head: {
        paddingBlock: theme.spacing(3, 1.5),
        width: 200
    },
    status: {
        fontSize: '0.8rem',
        fontWeight: 'bold',
        color: 'white',
        backgroundColor: 'gray',
        borderRadius: theme.spacing(0.75),
        padding: theme.spacing(0.75, 1.5),
        display: 'inline-block'
    },
    inputFocused: {
        borderColor: '#80bdff',
        boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
        backgroundColor: "#00FF00",
    },
    tableHeader: {
        cursor: 'pointer'
    }
}));


function Datatable({ data, onSort }) {

    const [rrows, setRRows] = React.useState(data);

    const classes = useStyles();
    const theme = useTheme();

    const [original, setOriginal] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };




    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleSort = (sortBy) => {
        onSort(sortBy)
    }

    return (
        rrows.length ? (
            <Paper className={classes.root}>
                <TableContainer component={Paper} elevation={0}>
                    <Table className={classes.table} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                {titles.map(title => (
                                    <TableCell onClick={e => handleSort(title.id)} key={title.id} component="th" align={title.align} className="tableHeader">{title.title}</TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rrows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => (
                                <TableRow key={row.logId}>
                                    <TableCell>{row.logId}</TableCell>
                                    <TableCell>{row.applicationType}</TableCell>
                                    <TableCell>{row.applicationId}</TableCell>
                                    <TableCell>{row.actionType}</TableCell>
                                    <TableCell>{row.actionDetails}</TableCell>
                                    <TableCell>{row.creationTimestamp}</TableCell>
                                </TableRow>
                            ))}

                        </TableBody>
                        <TableFooter>
                            <TablePagination
                                rowsPerPageOptions={[5, 10, 15]}
                                // component="div"
                                count={rrows.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                            />
                        </TableFooter>
                    </Table>
                </TableContainer>
            </Paper>
        ) : null

    )
}

export default Datatable;
