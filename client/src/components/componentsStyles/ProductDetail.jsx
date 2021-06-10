import { green } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/styles';

 const useStyles = makeStyles((theme) => ({
    root: {
      maxWidth: 500,
      boxShadow: "0 0 3px",
      marginLeft: "500px",
      background: "#f3f6f7",
      marginTop: '30px'
    },
    media: {
      height: 0,
      paddingTop: "56.25%", // 16:9
    },
    expand: {
      transform: "rotate(0deg)",
      marginLeft: "auto",
      transition: theme.transitions.create("transform", {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: "rotate(180deg)",
    },
    avatar: {
      backgroundColor: green[500]
    },
  }));

  export default useStyles