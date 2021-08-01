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
    goToSignUp: { 
        textAlign: "right",
        marginTop: theme.spacing(2)        
    },
    goToForgotPass: { 
        textAlign: "right",
        marginTop: theme.spacing(2)        
    },
    paper: { 
        marginTop: theme.spacing(8),
        padding: theme.spacing(4)
    }
}))

export default useStyles