import { makeStyles } from '@material-ui/styles';

export default makeStyles((theme) => ({
    container: {
    display: 'flex',
    marginTop: '50px',
    marginLeft: '300px'
    },
    card: {
        display: 'flex',
        flexDirection: 'column',
        marginLeft: '25%' ,
        marginTop: '5px',
        height: '350px',
        width: "30ch",
        margin: theme.spacing(1),
        boxShadow: '0 0 3px',
        
    },
    input: {
        width: '98%',
        marginTop: '5px',
        marginLeft: '3px',
        

    },
    title:{
        display: 'flex',
        justifyContent: 'center',
        color: '#696a62',
        marginTop: '5px'
     
        
    },
    button: {
        width: '100%',
        
    },
    button2: {
        
    },
    link:{
        display: 'flex',
        justifyContent: 'center',
        textDecoration: 'none'
    },
    
    
}))