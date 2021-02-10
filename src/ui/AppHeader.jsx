import React from 'react'
import breakpoints from './breakpoints'
import styled from 'styled-components'
import { Media } from 'react-breakpoints'
import { FormattedMessage } from 'react-intl'


const TopBar = styled.div`
  display: flex;
  background-color: rgb(255, 198, 5);
  width: 100vw;
  min-height: 30px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media (min-width: ${breakpoints.md}px) {
    min-height: 30px;
  }
  @media (min-width: ${breakpoints.lg}px) {
    min-height: 30px;
  }
  @media (min-width: ${breakpoints.xxl}px) {
    min-height: 40px;
  }
  @media (min-width: ${breakpoints.xxxl}px) {
    min-height: 60px;
  }
`

const TopBarText = styled.div`
  font-weight: bold;
  font-size: 14px;
  width: 95vw;
  @media (min-width: ${breakpoints.md}px) {
    width: 600px;
  }
  @media (min-width: ${breakpoints.lg}px) {
    width: 750px;
  }
  @media (min-width: ${breakpoints.xxl}px) {
    width: 900px;
    font-size: 22px;
  }
  @media (min-width: ${breakpoints.xxxl}px) {
    width: 1400px;
    font-size: 32px;
  }
`

const LogoContainer = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: center;
  height: 150px;
  min-height: 150px;
  @media (min-width: ${breakpoints.md}px) {
    height: 200px;
    min-height: 200px;
  }
  @media (min-width: ${breakpoints.xl}px) {
    height: 230px;
    min-height: 230px;
  }
  @media (min-width: ${breakpoints.xxl}px) {
    height: 300px;
    min-height: 300px;
  }
  @media (min-width: ${breakpoints.xxxl}px) {
    height: 400px;
    min-height: 400px;
  }
`

const Logo = styled.img`
  height: 100%;
`

const Header = styled.div`
  position: absolute;
  color: white;
  font-weight: bold;
  max-width: 100vw;
  width: 100vw;
  text-align: center;
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: center;
  align-items: center;
`

const HeaderTitle = styled.div`
  margin: 6px;
  font-size: 24px;
  max-width: 300px;
  @media (min-width: ${breakpoints.md}px) {
    max-width: 90vw;
    font-size: 36px;
  }
  @media (min-width: ${breakpoints.xl}px) {
    font-size: 42px;
  }
  @media (min-width: ${breakpoints.xxl}px) {
    font-size: 56px;
  }
  @media (min-width: ${breakpoints.xxxl}px) {
    font-size: 72px;
  }
`

const HeaderSub = styled.p`
  margin: 6px;
  font-size: 16px;
  @media (min-width: ${breakpoints.md}px) {
    font-size: 20px;
  }
  @media (min-width: ${breakpoints.xxl}px) {
    font-size: 28px;
  }
  @media (min-width: ${breakpoints.xxxl}px) {
    font-size: 40px;
  }
`

const AppHeader = ({ }) => (
  <>
    <TopBar id="topBar">
      <TopBarText><FormattedMessage id="topBar" /></TopBarText>
    </TopBar>
    <LogoContainer>
      <Logo src="/logo.jpg" />
      <Header>
        <HeaderTitle><FormattedMessage id="header"/></HeaderTitle>
        <Media>
          {
            ({ breakpoints, currentBreakpoint }) => {
              return breakpoints[currentBreakpoint] >= breakpoints.sm ? (
                <HeaderSub><FormattedMessage id="subHeader"/></HeaderSub>
              ) : (
                <></>
              )
            }
          }
        </Media>
      </Header>
    </LogoContainer>
  </>
)

export default AppHeader
