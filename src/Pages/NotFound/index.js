import React from 'react'
import { Paper, Container, Typography } from '@material-ui/core'
import { Link } from 'react-router-dom'
import useStyles from './style'

const NotFound = () => { 
    const classes = useStyles()
    return (
        <Container maxWidth="xs">
            <Paper className={classes.paper}>
                <Typography
                    variant="subtitle"
                >
                    Page Not Found
                </Typography>
                <Typography variant="h4" style={{paddingTop: '20px', paddingBottom: '20px'}}>404</Typography>
                <Typography component={Link} to="/">Back</Typography>
            </Paper>
        </Container>
    )
}
export default NotFound