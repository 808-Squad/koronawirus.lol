import React from 'react'
import breakpoints from './breakpoints'
import styled from 'styled-components'
import { useIntl, FormattedMessage } from 'react-intl'

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

const AppFooter = ({ }) => {
  const intl = useIntl()
  return (
    <>
      <Footer>
        <FooterText>
          <b><FormattedMessage id="footer1" /></b>&nbsp;
          <FormattedMessage id="footer2" values={{
            govLink: <a href={intl.formatMessage({id: "footerGovAddress"})}><FormattedMessage id="footer3" /></a>
          }} />
          <br />
          <FormattedMessage id="footer4" values={{
            star: <StarIcon />,
            githubLogo: <GithubIcon />,
            githubLink: <a href="https://github.com/808-Squad/koronawirus.lol"><FormattedMessage id="footer5" /></a>
          }} />
          <br />
          <FormattedMessage id="footer6" values={{
            freepik: <a href="https://www.freepik.com" title="Freepik">Freepik</a>,
            flaticon: <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a>
          }}/>
          <br />
          <FormattedMessage id="footer7" /> 4.02.2021
        </FooterText>
      </Footer>
    </>
  )
}

export default AppFooter
