import React from 'react'
import { Route, NavLink, withRouter } from 'react-router-dom'
import { theme } from '../config/theme'
import styled from 'styled-components'

const NavItem = styled(NavLink)`
  cursor: pointer;
  color: ${props => props.theme.white};
  &:hover {
    text-decoration: none;
    color: ${props => props.theme.activeLinkColor};
  }
`
const CustomNavLink = ({ to, location, text }) => {
  return (
    <Route
      path={to}
      children={() => (
        <NavItem
          replace={to === location.pathname}
          to={to}
          activeStyle={activeStyles}
        >
          {text}
        </NavItem>
      )}
    />
  )
}

const activeStyles = {
  fontWeight: 'bold',
  color: theme.activeLinkColor
}

export default withRouter(CustomNavLink)
