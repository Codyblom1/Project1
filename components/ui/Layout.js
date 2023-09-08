import React from 'react';
import Header from './Header';
import {Container} from 'react-bootstrap';

const Layout = ({ children }) => {
	return (
		<>
			<Header />
			<Container className="body-margin">
				{ children }
			</Container>
		</>
	);
};

export default Layout;
