import React from 'react';
import { Button, DataGrid } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import Cookies from 'universal-cookie';
import { useRouter } from 'next/router'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

export function Item(props) {
    // Cookies for checking studentID and router to change pages
    const cookies = new Cookies();
    const router = useRouter();

    // Array to store the response's array
    const search_result = props.data;
    const classes = useStyles();

    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell align="center">Photo</TableCell>
                        <TableCell align="right">Name&nbsp;</TableCell>
                        <TableCell align="right">Quantity</TableCell>
                        <TableCell align="right">Location&nbsp;</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {search_result.map((item) => (
                        <TableRow key={item.component_name}>
                            <TableCell component="th" scope="row" align="center">
                                <img alt="Google" height="92" id="hplogo" src="https://static.wixstatic.com/media/f40ca5_b80059f52d6e4192a4f7fcd8d6614e92~mv2.png/v1/fill/w_255,h_86,al_c,q_85,usm_0.66_1.00_0.01/QUTMS_Logo_White.webp" />
                            </TableCell>
                            <TableCell align="right">{item.component_name}</TableCell>
                            <TableCell align="right">{item.quantity}</TableCell>
                            <TableCell align="right">{item.location}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )

}

export default Item;