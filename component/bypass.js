import React, { useState, useEffect } from 'react';
import { Button, Grid, Container, Card, Typography } from '@material-ui/core';
import Cookies from 'universal-cookie';
import { useRouter } from 'next/router'

export function ByPass(props) {

    return (
        <div>
            <Grid container direction="column" alignItems="center" justify="center">
                <h2 className="text-center text-accent-1 mb-16">{props.message}</h2>
            </Grid>
        </div>
    )
}

export default ByPass;