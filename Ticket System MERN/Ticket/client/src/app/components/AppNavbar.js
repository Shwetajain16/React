import React, { Component } from "react"
import { Collapse,Button, Nav, Navbar, NavbarToggler, NavbarText, NavItem, NavLink } from "reactstrap"
import logo from '../photos/logo.png'



import { withRouter } from "react-router-dom"

import AuthenticationService from "../services/AuthenticationService"

class AppNavbar extends Component {
	constructor(props) {
		super(props)
		this.state = { isOpen: false }
		this.toggle = this.toggle.bind(this)

		this.state = {
			showUser: false,
			showPM: false,
			showAdmin: false,
			username: undefined,
			login: false,
		}
	}

	componentDidMount() {

		const user = AuthenticationService.getCurrentUser()

		if (user) {
			const roles = []
			this.setState({
				showUser: true,
				showPM: roles.includes("ROLE_PM") || roles.includes("ROLE_ADMIN"),
				showAdmin: roles.includes("ROLE_ADMIN"),
				login: true,
				username: user.username,
			})
		}
	}

	signOut = () => {
		AuthenticationService.signOut()
		this.props.history.push("/home")
		window.location.reload()
	}

	toggle() {
		this.setState({
			isOpen: !this.state.isOpen,
		})
	}

	render() {
		return (
			<Navbar className="nav" expand="md">
				<Nav className="mr-auto">
					<NavLink href="/home"><img className="logo" src={logo} alt="Logo" /></NavLink>
					
				</Nav>
				<NavbarToggler onClick={this.toggle} />
				<Collapse isOpen={this.state.isOpen} navbar>
					{this.state.login ? (
						<Nav className="ml-auto" navbar>
							<NavItem>
								<button id="btn">
									Login As :  <a href="/profile">{this.state.username}</a>
								</button>
							</NavItem>
							<NavItem >
								<button id="btn"
								href="#" onClick={this.signOut}>
									Sign Out
								</button>
								
							</NavItem>
						</Nav>
					) : (
						<Nav className="ml-auto" navbar>
							<NavItem>
							<Button href="/signin" style={{marginRight:"10px",marginBottom:"6px"}} fullwidth  color="dark" type="submit">Login</Button>
								
							</NavItem>
							<NavItem>
							<Button href="/signup" style={{marginRight:"10px"}}  color="dark" type="submit">SignUp</Button>
								
							</NavItem>
						</Nav>
					)}
				</Collapse>
			</Navbar>
		)
	}
}

export default withRouter(AppNavbar)

