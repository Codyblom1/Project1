import { LinkContainer } from 'react-router-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { UserContext } from "../../context/UserContext";
import { useContext } from "react";
import Logo from '../../images/BBlogo-remove.png'
import { FavoritesContext } from "../../context/FavoritesContext";
import React, {useState} from 'react';



const Header = () => {
    const userContext = useContext(UserContext);
    const currentUser = userContext.currentUser;
	const favoritesContext = useContext(FavoritesContext);
  	const currentListOfFavorites = favoritesContext.currentListOfFavorites;
    return (
        <>
            <header className="bannerHeader">   
                {currentUser && currentUser.isAuthenticated &&
                  <div id="loggedin">Hi, {currentUser.username}! <br/></div>
                }          
                <Nav>
                    <Navbar variant="light" expand="lg" className="custom-navbar">
                        <Container fluid>
                            <div className = "logo-container">
                            <Navbar.Brand className = "brand">
                                <img id = "logo-img"src={Logo} alt="BreweryBros"
                                width="10%"
                                height="auto"/>
                                <div className = "brand-name">BreweryBros</div>
                            </Navbar.Brand>
                            </div>
                            <Navbar.Toggle aria-controls="basic-navbar-nav" />
                            <div className = "toggle-controls">
                                <Navbar.Collapse id="basic-navbar-nav">
                                    <Nav className="ml-auto spread-out-links">
                    
                                        <LinkContainer to="/">
                                            <Nav.Link className ="nav-words">Home</Nav.Link>
                                        </LinkContainer>
                                        <LinkContainer to="/Search">
                                            <Nav.Link className ="nav-words">Search</Nav.Link>
                                        </LinkContainer>
                                        {(currentUser && currentUser.isAuthenticated)?
                                            <LinkContainer to="/Login">
                                                <Nav.Link className ="nav-words"><button id="landbutton2">Logout</button></Nav.Link>
                                            </LinkContainer> 
                                            :
                                            <LinkContainer to="/Login">
                                                <Nav.Link className ="nav-words"><button id="landbutton2">Login</button></Nav.Link>
                                            </LinkContainer>
                                        }
                                        
                                        {/* <LinkContainer to="/Register">
                                            <Nav.Link className ="nav-words">Register</Nav.Link>
                                        </LinkContainer> */}
                                        { 
                                            <NavDropdown className = "nav-words" title="More" id="basic-nav-dropdown">
												{((currentUser) && currentUser.isAuthenticated && currentListOfFavorites !== null && currentListOfFavorites !== undefined && currentListOfFavorites.length !== 0)?
                                                	<LinkContainer to="/ViewFavorites">
                                                	    <NavDropdown.Item>View Favorites</NavDropdown.Item>
                                                	</LinkContainer>
													:""
												}
                                                <LinkContainer to="/Option2">
                                                    <NavDropdown.Item>Check Out Reviews!</NavDropdown.Item>
                                                </LinkContainer>
                                            </NavDropdown>
                                        }
                                    </Nav>
                                </Navbar.Collapse>
                            </div>
                        </Container>
                    </Navbar>
                </Nav>
            </header>
        </>
    );
};
export default Header;