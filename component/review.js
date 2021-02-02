import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';

const products = [
    { name: 'Product 1', desc: 'A nice thing', price: '$9.99' },
    { name: 'Product 2', desc: 'Another thing', price: '$3.45' },
    { name: 'Product 3', desc: 'Something else', price: '$6.51' },
    { name: 'Product 4', desc: 'Best thing of all', price: '$14.11' },
];

const useStyles = makeStyles((theme) => ({
    total: {
        fontWeight: 700,
    },
    title: {
        marginTop: theme.spacing(2),
    },
}));

export default function Review() {
    const classes = useStyles();

    return (
        <React.Fragment>

            <List disablePadding>
                {products.map((product) => (
                    <ListItem className={classes.listItem} key={product.name}>
                        <ListItemText>
                            <img alt="Google" height="40" id="hplogo" src="https://static.wixstatic.com/media/f40ca5_b80059f52d6e4192a4f7fcd8d6614e92~mv2.png/v1/fill/w_255,h_86,al_c,q_85,usm_0.66_1.00_0.01/QUTMS_Logo_White.webp" />
                        </ListItemText>
                        <ListItemText inset={true} primary='SHUT THE FOOK UP U LIL RAT WEASEL' />
                        <ListItemText inset={true}>Location</ListItemText>
                        <ListItemText inset={true} variant="body2">Quantity</ListItemText>

                    </ListItem>
                ))}
            </List>

        </React.Fragment>
    );
}
