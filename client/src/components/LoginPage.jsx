import { Button, Card, Container, TextField} from '@material-ui/core';
import React, {useEffect} from 'react';
import makeStyles from './componentsStyles/LoginPageStyles'
import {useDispatch, useSelector} from 'react-redux'
import {googleLoginAction, logOutAction} from '../redux/actions/userActions'
import {Link, useHistory} from 'react-router-dom'

const LoginPage = () => {
const classes = makeStyles()
const dispatch = useDispatch()
const fetching = useSelector(store => store.user.fetching)
const loggedIn = useSelector(store => store.user.loggedIn)
//const userDataInLocal = useSelector(store => store.users.user )
//console.log('user dataaa',userDataInLocal)
const history = useHistory()



function doLogin() {
  dispatch(googleLoginAction())
  history.push('/products')
}

function logOut() {
    dispatch(logOutAction())
}
if(fetching){return <h2>espere un momento que lo estamos autenticando</h2>}
    return (
<Container className={classes.container}>
    <Card className={classes.card}>
     {!loggedIn ? 
      <form >
        <section>
            <label>Email</label>
            <TextField className={classes.input} 
              
              type="email"
              placeholder="ej: tunombre@email.com"
              name="email"
              />
          </section>
          <section> 
              <label/>Contraseña <br/>
            <TextField className={classes.input}
              
              type="password"
              placeholder="*******"
              name="password"
              onChange
             />

             <Link className={classes.link}>olvide mi contraseña</Link>
          </section> <br/>
        <div className={classes.button2}>
          <Button variant='contained' color= 'secondary' type="submit" className={classes.button}>iniciar sesion</Button> <br/>

          <Button onClick={doLogin} variant='contained' color= 'primary' className={classes.button}>iniciar con google</Button>
         <Link to='/user/add' > <Button variant='contained' color= 'secondary' className={classes.button}>registrarse</Button> </Link>
        </div>
        </form>
          : <Button variant='outlined' color='secondary' onClick={logOut}>CERRAR SESION</Button> }
    </Card>
</Container>
  );

}


export default LoginPage;



{/* <section>
    <input
    value
    type="password"
    placeholder="Clave de administrador"
    name="isAdmin"
    onChange
    />
</section> */}