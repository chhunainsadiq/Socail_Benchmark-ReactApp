import React from 'react'
import CustomNavLink from '../CustomNavLink'
import { connect } from 'react-redux'
import { logoutUser } from '../../actions/AuthActions'
import { HeaderLogoURL } from '../../config/urls'
import {
  HeaderImage,
  NavListItem,
  LogoutText,
  LogoutDiv,
  TopNav,
  NavLogoContainer,
  NavListContainer,
  NavList
} from './styled'
import { navList } from './helper'

const Header = ({ logoutUser }) => {
  const handleLogoutBtnClick = () => logoutUser()
  const renderNavItem = () => {
    return navList.map(link => {
      return (
        <NavListItem key={link.key}>
          <CustomNavLink to={link.linkPath} text={link.linkText} />
        </NavListItem>
      )
    })
  }
  return (
    <TopNav expand='lg'>
      <NavLogoContainer>
        <HeaderImage src={HeaderLogoURL} />
      </NavLogoContainer>
      <NavListContainer>
        <NavList>{renderNavItem()}</NavList>
      </NavListContainer>
      <LogoutDiv>
        <LogoutText onClick={handleLogoutBtnClick}>Logout</LogoutText>
      </LogoutDiv>
    </TopNav>
  )
}

export default connect(
  null,
  { logoutUser }
)(Header)
