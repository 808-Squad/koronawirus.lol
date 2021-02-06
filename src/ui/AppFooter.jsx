import React from 'react'
import breakpoints from './breakpoints'
import styled from 'styled-components'

const Footer = styled.div`
  display: flex;
  margin-top: 1rem;
  padding: 0.3rem;
  background-color: white;
  padding-left: 1rem;
  padding-right: 1rem;
  border-top: solid rgb(213, 35, 63) .1875rem;
  clear: both;
  width: 100vw;
  flex-shrink: 0;
  flex-direction: column;
  align-items: center;
`

const FooterText = styled.footer`
  width: 95vw;
  font-size: 11px;
  font-style: italic;
  a {
    color: rgb(15, 55, 100);
  }
  a:visited {
    color: rgb(213, 35, 63);
  }

  @media (min-width: ${breakpoints.md}px) {
    font-size: 11px;
    width: 600px;
  }
  @media (min-width: ${breakpoints.lg}px) {
    width: 750px;
  }
  @media (min-width: ${breakpoints.xxl}px) {
    width: 900px;
    font-size: 14px;
  }
  @media (min-width: ${breakpoints.xxxl}px) {
    width: 1400px;
    font-size: 20px;
  }
`

const GithubIcon = styled.span`
  display: inline-block;
  width: 15px;
  height: 1em;
  background-image: url('github.svg');
  background-position: center;
  background-repeat: no-repeat;
`

const StarIcon = styled.span`
  display: inline-block;
  width: 15px;
  height: 1em;
  background-image: url('star.svg');
  background-position: center;
  background-repeat: no-repeat;
`

const AppFooter = ({ }) => (
  <>
    <Footer>
      <FooterText>
        <b>Ta strona to żart</b>. Po prawdziwe informacje na temat obostrzeń udaj się <a href="https://www.gov.pl/web/koronawirus">tutaj</a>.
        <br />
        Zagwiazdkuj <StarIcon/> to na <GithubIcon/> <a href="https://github.com/808-Squad/koronawirus.lol">GitHubie</a>.
        <br />
        Ikony dzięki <a href="https://www.freepik.com" title="Freepik">Freepik</a> przez <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a>
      </FooterText>
    </Footer>
  </>
)

export default AppFooter
