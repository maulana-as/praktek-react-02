import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles(theme => ({ 
    title: { 
        textAlign: 'center', 
        marginBottom: theme.spacing(2)
    },
    button: {
        textAlign:'center',
        marginTop: theme.spacing(3)
    },
    goToLogin: { 
        textAlign: "right",
        marginTop: theme.spacing(2)        
    },
    paper: { 
        marginTop: theme.spacing(3),
        padding: theme.spacing(4)
    }
}))

export default useStyles