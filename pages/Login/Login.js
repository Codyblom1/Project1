import { useState,useContext } from 'react';
import { Button, ButtonGroup } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import Layout from "../../components/ui/Layout";
import { UserContext } from "../../context/UserContext";
import { FavoritesContext } from "../../context/FavoritesContext";
import LogoutButton from '../../components/form/LogoutButton';
import { useNavigate } from "react-router-dom";
import {loginUser}    from '../../api/UserApi'
import {getAllFavorites} from "../../api/FavoriteApi";
import sadBBlogo from "../../images/BBlogoSad.png";


const Login = ({ children }) => {
    const navigate = useNavigate();        
    const { setCurrentUser } = useContext(UserContext);
    const userContext = useContext(UserContext);
    const currentUser = userContext.currentUser; 

    const { setCurrentListOfFavorites } = useContext(FavoritesContext);
    const favoritesContext = useContext(FavoritesContext);
    const currentListOfFavorites = favoritesContext.currentListOfFavorites;
  

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState(false);

    const doSetUsername = (event) => {
        setUsername(event.target.value);
    };
    const doSetPassword = (event) => {
        setPassword(event.target.value);
    };


    const handleCancel = () => {
        setPassword('');
        navigate("/");
    };

    const handleLogin = (event) => {
        if (event !== undefined) event.preventDefault();
        const loginCurrentUser = async () => {
            const userLogin = { 'username': username, 'password': password };
            const loggedInUser = await loginUser(userLogin);
            if (loggedInUser) {                  
                loggedInUser.user.isAuthenticated = true;
                localStorage.setItem('user', JSON.stringify(loggedInUser.user));
                localStorage.setItem('token', loggedInUser.token);        
                setCurrentUser(loggedInUser.user);
                updateFavsList(loggedInUser.user);
                navigate("/");
            }
            else{
                setErrorMessage(true);
                console.log("error message is now true")
            }
        };
        loginCurrentUser();
    };
    const updateFavsList = async (user) =>{
    
        //We get list of Brewery IDs from our sql database

        const listOfIds = await getAllFavorites(user.id);
        
        if(listOfIds !== undefined){
          //We set the global variable 
          setCurrentListOfFavorites(listOfIds) //
        }
    };


    return (
        <Layout>
            {(!currentUser || !currentUser.isAuthenticated) &&
                <Form onSubmit={handleLogin}>
                    <form className = "was-validated">
                        <div className= "form-group is invalid pt-2">
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Username</Form.Label>
                                <Form.Control type="text" className= "form-control is-invalid" placeholder="Enter username"
                                    value={username} onChange={doSetUsername} required />
                            </Form.Group>
                        </div>
                    </form>
                    <form className = "was-validated">
                        <div className= "form-group is invalid pt-2">
                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Password" className="form-control is-invalid"
                                    value={password} onChange={doSetPassword} required />
                                </Form.Group>
                            </div>
                    </form>
                    <ButtonGroup>
                        <Button variant="primary" onClick={handleLogin} type="submit">
                            Login
                        </Button>
                        <Button variant="secondary" onClick={handleCancel}>
                            Cancel
                        </Button>
                    </ButtonGroup>
                </Form>
                
            }
            {currentUser && currentUser.isAuthenticated &&
                <div>
                    <h2 style={{display: 'flex', justifyContent: "center", paddingTop: '5vh', font: 'Lucida Sans', fontSize: '65px'}}>Are you sure you want to log out?</h2>
                    <div style={{display: 'flex', justifyContent: "center", paddingTop: '10vh'}}><LogoutButton></LogoutButton></div>
                    <div style={{display: 'flex', justifyContent: "center", paddingTop: '10vh'}}>
                        <img src={sadBBlogo} alt='sadBBlogo'/>
                    </div>
                </div>
            }
            {!currentUser || !currentUser.isAuthenticated && errorMessage &&
                <p>Please Try Again.</p>
            }
            

            {children}
            
        </Layout>
    );
}
export default Login;