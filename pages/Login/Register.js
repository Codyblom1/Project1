import { useState } from 'react';
import { Button, ButtonGroup } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import Layout from "../../components/ui/Layout";
import { useNavigate } from "react-router-dom";
import {registerUser} from "../../api/RegisterApi"

const Register = ({ children }) => {
    const navigate = useNavigate();        
      
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [role, setRole] = useState('ROLE_USER');

    const doSetUsername = (event) => {
        setUsername(event.target.value);
    };
    const doSetPassword = (event) => {
        setPassword(event.target.value);
    };
    const doSetConfirmPassword = (event) => {
        setConfirmPassword(event.target.value);
    };


    const handleCancel = () => {
        setPassword('');
    };

    const hasError = () => {
        let error = false;
        if(password !== confirmPassword){
            error = true;
        }

        return error;
    };

    const handleRegister = (event) => {
        if (event !== undefined) event.preventDefault();

        if(hasError()){
            return;
        }

        const registerCurrentUser = async () => {
            const userToCreate = { 'username': username, 'password': password, 'confirmPassword':confirmPassword, 'role': role };
            const newUser = await registerUser(userToCreate);
            console.log(newUser);
            navigate("/");
        };
        registerCurrentUser();
    };

    const onOptionChange = e => {
        setRole(e.target.value)
    };
    
    return (
        <Layout>
            
                <Form onSubmit={handleRegister}>
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
                            <Form.Group className="mb-3" controlId="formBasicPassword">
                            <div className= "form-group is invalid pt-2">
                                <Form.Label>Confirm Password</Form.Label>
                                <Form.Control type="password" placeholder="Confirm Password" className="form-control is-invalid"
                                    value={confirmPassword} onChange={doSetConfirmPassword} required />
                                </div>
                            </Form.Group>
                    </form>
                    <Form.Group>
                            <div className = "radio-group">
                            <Form.Label><input type="radio" name="myRadio" value="ROLE_USER" 
                            checked = {role === "ROLE_USER"} onChange = {onOptionChange}/>Beer Lover</Form.Label>
                            </div>
                            
                            <div className = "radio-group">
                            <Form.Label><input type="radio" name="myRadio" value="ROLE_ADMIN" 
                                checked = {role === "ROLE_ADMIN"} onChange = {onOptionChange} />Brewer</Form.Label>
                            </div>
                    </Form.Group>                    
                    <ButtonGroup>
                        <Button variant="primary" type="submit">
                            Register
                        </Button>
                        <Button variant="secondary" onClick={handleCancel}>
                            Cancel
                        </Button>
                    </ButtonGroup>
                </Form>   
         
            {children}
        </Layout>
    );
}
export default Register;