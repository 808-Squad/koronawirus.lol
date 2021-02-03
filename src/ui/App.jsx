import styled from 'styled-components'
import React, { useEffect, useState } from 'react';
import generate from '../generation-logic/generate'
import breakpoints from './breakpoints';
import ShareButtons from './ShareButtons';
import AppHeader from './AppHeader'
import { collectEvent, collectStats, collectVisit, shuffleArray } from '../utils'

const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: "Open Sans", sans-serif;
  overflow-x: hidden;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
`

const SentencesContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1 0 auto;
  width: 90vw;
  @media (min-width: ${breakpoints.md}px) {
    width: 600px;
  }
  @media (min-width: ${breakpoints.lg}px) {
    width: 750px;
  }
  @media (min-width: ${breakpoints.xxl}px) {
    width: 900px;
  }
  @media (min-width: ${breakpoints.xxxl}px) {
    width: 1400px;
  }
`

const SentenceHeader = styled.h2`
  font-size: 18px;
  width: 100%;
  margin-top: 20px;
  @media (min-width: ${breakpoints.md}px) {
    margin-top: 30px;
    margin-bottom: 15px;
  }
  @media (min-width: ${breakpoints.xxl}px) {
    margin-top: 45px;
    font-size: 24px;
  }
  @media (min-width: ${breakpoints.xxxl}px) {
    margin-top: 60px;
    font-size: 36px;
  }
`
const SentenceList = styled.ul`
  list-style-position: inside;
  padding-left: 0;
  margin: 0;
  @media (min-width: ${breakpoints.md}px) {
    padding-left: 1.5em;
    list-style-position: outside;
  }
  @media (min-width: ${breakpoints.xxl}px) {
    font-size: 20px;
  }
  @media (min-width: ${breakpoints.xxxl}px) {
    font-size: 30px;
  }
`

const Sentence = styled.li`
  margin: 10px 0;
  @media (min-width: ${breakpoints.lg}px) {
    margin: 16px 0;
  }
  @media (min-width: ${breakpoints.xxl}px) {
    margin: 20px 0;
  }
  @media (min-width: ${breakpoints.xxxl}px) {
    margin: 28px 0;
  }
`

const StyledButton = styled.button`
  background-color: white;
  color: rgb(213, 35, 63);
  border: 3px solid;
  border-radius: 5px;
  border-color: rgb(213, 35, 63);
  font-size: 16px;
  font-weight: bold;
  padding: 0 1em;
  min-height: 30px;
  margin: 10px;
  cursor: pointer;
  outline: none;
  &:hover {
    background-color: rgb(213, 35, 63);
    color: white;
    // border-radius: 10px;
  }
  @media (min-width: ${breakpoints.md}px) {
    padding: 0 2em;
  }
  @media (min-width: ${breakpoints.xxl}px) {
    font-size: 20px;
    min-height: 40px;
  }
  @media (min-width: ${breakpoints.xxxl}px) {
    font-size: 30px;
    min-height: 60px;
  }
`

const Footer = styled.div`
  margin-top: 1rem;
  padding: 0.3rem;
  background-color: white;
  padding-left: 1rem;
  padding-right: 1rem;
  border-top: solid rgb(213, 35, 63) .1875rem;
  clear: both;
  width: 100vw;
  flex-shrink: 0;
  display: flex;
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

function App(props) {
  /*
   * Format:
   *  sentences[n]          - value for sentence `n`
   *  sentences['meta'][n]  - additional data for sentence `n`
   */
  const [sentences, setSentences] = useState(null)
  const [buttonText, setButtonText] = useState("GENERUJ")

  useEffect(() => {
    collectVisit();
  }, [])

  const optionalSentences = [
    (sentences => (<Sentence>Wszystkie osoby przybywające do Polski z {sentences[4]} {sentences[5]} są {sentences[6]}.</Sentence>)),
    (sentences => (<Sentence>Restauracje i bary są {sentences[18]}{sentences[19]}.</Sentence>)),
    (sentences => (<Sentence>Żłobki i przedszkola są {sentences[25]}.</Sentence>)),
    (sentences => (<Sentence>W godzinach {sentences[29]} zakupy mogą robić tylko osoby {sentences[30]}.</Sentence>)),
    (sentences => (<Sentence>W autobusach {sentences['meta'][32][0]} być zajęte maks. {sentences[32]} {sentences['meta'][32][1]} (lub {sentences[31]}% wszystkich miejsc).</Sentence>))
  ]

  const obligatorySentences = [
    (sentences => (<Sentence>Hotele dostępne są tylko dla {sentences[0]}, {sentences[1]}, {sentences[2]} oraz {sentences[3]}.</Sentence>)),
    (sentences => (<Sentence>W zgromadzeniach {sentences['meta'][7][0]} uczestniczyć maks. {sentences[7]} {sentences['meta'][7][1]} (nie dotyczy {sentences[8]} oraz {sentences[9]}).</Sentence>)),
    (sentences => (<Sentence>Obowiązuje zakaz organizacji {sentences[10]} oraz {sentences[11]}.</Sentence>)),
    (sentences => (<Sentence>W {sentences[26]} i {sentences[27]} może przebywać maks. jedna osoba na {sentences[28]} m kw. pomieszczenia.</Sentence>)),
    (sentences => (<Sentence>Nauka zdalna w klasach {sentences[20]} szkół podstawowych, {sentences[21]} oraz {sentences[22]}, za wyjątkiem {sentences[23]} (chyba, że {sentences[24]}).</Sentence>)),
    (sentences => (<Sentence>Zamknięte są {sentences[12]}, {sentences[13]} oraz {sentences[14]}. Otwarte zostaną {sentences[15]} oraz {sentences[16]}, ale wyłącznie w {sentences[17]}.</Sentence>))
  ]

  const buttonAction = () => {
    setSentences(generate())
    setButtonText("GENERUJ NOWE")
    document.getElementById('topBar').scrollIntoView();
    collectEvent();
  }

  const dateOpts = {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  };

  const date = (new Date()).toLocaleDateString('pl-PL', dateOpts);

  shuffleArray(optionalSentences);
  const finalSentences = [
    ...obligatorySentences,
    optionalSentences[0],
    optionalSentences[1]
  ];

  shuffleArray(finalSentences)

  return (
      <Container>
        <AppHeader />
        <SentencesContainer>
          <SentenceHeader>
            Kancelaria Prezesa Rady Ministrów informuje, że od {date} roku:
          </SentenceHeader>
          {sentences && (
            <SentenceList>
            {finalSentences.map(it => it(sentences))}
            </SentenceList>
          )}
          <StyledButton onClick={buttonAction}>{buttonText}</StyledButton>
        </SentencesContainer>
        <ShareButtons />
        <Footer>
          <FooterText>
            <b>Ta strona to żart</b>. Po prawdziwe informacje na temat obostrzeń udaj się <a href="https://www.gov.pl/web/koronawirus">tutaj</a>.
            <br />
            Zagwiazdkuj <StarIcon/> to na <GithubIcon/> <a href="https://github.com/808-Squad/koronawirus.lol">GitHubie</a>.
            <br />
            Ikony dzięki <a href="https://www.freepik.com" title="Freepik">Freepik</a> przez <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a>
          </FooterText>
        </Footer>
      </Container>
  );
}

export default App;
