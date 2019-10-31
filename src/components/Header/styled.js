import styled from 'styled-components'
import { Navbar, Nav, Image } from 'react-bootstrap'

const HeaderImage = styled(Image)`
  margin-right: 7rem;
  margin-bottom: 0.5rem;
  width: 2.2em;
  height: 2.2em;
`

const NavListItem = styled.li`
  margin-left: 4rem;
  padding-bottom: 0.5em;
`

const LogoutText = styled.h5`
  color: white;
  cursor: pointer;
  justify-content: flex-end;
  padding-right: 1rem;
  &:hover {
    color: ${props => props.theme.activeLinkColor};
  }
`

const LogoutDiv = styled.div`
  display: flex;
  flex-direction: row;
`

const TopNav = styled(Navbar)`
  padding-bottom: 0.1em;
  background-color: ${props => props.theme.dark};
`

const NavLogoContainer = styled(Navbar.Brand)``
const NavListContainer = styled(Navbar.Collapse)``
const NavList = styled(Nav)``

export {
  HeaderImage,
  NavListItem,
  LogoutText,
  LogoutDiv,
  TopNav,
  NavLogoContainer,
  NavListContainer,
  NavList
}
