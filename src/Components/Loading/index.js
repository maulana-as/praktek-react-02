import React from 'react';
import { Container, LinearProgress, Typography } from '@material-ui/core';
import useStyles from './style';

function Loading() { 
    const classes = useStyles()

    return (
        <Container maxWidth="xs" className={classes.loadingBox}>
            <div>
                <Typography
                    variant="h6"
                    component="h2"
                    className={classes.title}
                >
                    Loading...
                </Typography>
                <LinearProgress value={100} />
            </div>
        </Container>
    )
}

export default Loading