import styled from 'styled-components'
import React, { useState } from 'react';
import generate from './generation-logic/generate'
import { Media } from 'react-breakpoints';
import breakpoints from './breakpoints.js';


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

const TopBar = styled.div`
  background-color: rgb(255, 198, 5);
  width: 100vw;
  min-height: 30px;
  display: flex;
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
  position: relative;
  display: flex;
  flex-direction: column;
  // justify-content: center;
  align-items: center;
  height: 150px;
  @media (min-width: ${breakpoints.md}px) {
    height: 200px;
  }
  @media (min-width: ${breakpoints.xl}px) {
    height: 230px;
  }
  @media (min-width: ${breakpoints.xxl}px) {
    height: 300px;
  }
  @media (min-width: ${breakpoints.xxxl}px) {
    height: 400px;
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
  font-size: 10px;
  font-style: italic;
  border-top: solid rgb(213, 35, 63) .1875rem;
  clear: both;
  text-align: center;
  width: 100vw;
  flex-shrink: 0;
`

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

function App(props) {
  /*
   * Format:
   *  sentences[n]          - value for sentence `n`
   *  sentences['meta'][n]  - additional data for sentence `n`
   */
  const [sentences, setSentences] = useState(null)
  const [buttonText, setButtonText] = useState("GENERUJ")

  const optionalSentences = [
    (sentences => (<Sentence>Wszystkie osoby przybywające do Polski z {sentences[4]} {sentences[5]} są {sentences[6]}.</Sentence>)),
    (sentences => (<Sentence>Restauracje i bary są {sentences[18]}{sentences[19]}</Sentence>)),
    (sentences => (<Sentence>Żłobki i przedszkola są {sentences[25]}.</Sentence>)),
    (sentences => (<Sentence>W godzinach {sentences[29]} zakupy mogą robić tylko osoby {sentences[30]}.</Sentence>)),
    (sentences => (<Sentence>W autobusach może być zajęte max. {sentences[32]} miejsc siedzących (lub {sentences[31]}% wszystkich miejsc).</Sentence>))
  ]

  const obligatorySentences = [
    (sentences => (<Sentence>Hotele dostępne są tylko dla {sentences[0]}, {sentences[1]}, {sentences[2]} oraz {sentences[3]}.</Sentence>)),
    (sentences => (<Sentence>W zgromadzeniach {sentences['meta'][7][0]} uczestniczyć maksymalnie {sentences[7]} {sentences['meta'][7][1]} (nie dotyczy {sentences[8]} oraz {sentences[9]}).</Sentence>)),
    (sentences => (<Sentence>Obowiązuje zakaz organizacji {sentences[10]} oraz {sentences[11]}.</Sentence>)),
    (sentences => (<Sentence>W {sentences[26]} i {sentences[27]} może przebywać maksymalnie jedna osoba na {sentences[28]} m kw. pomieszczenia.</Sentence>)),
    (sentences => (<Sentence>Nauka zdalna w klasach {sentences[20]} szkół podstawowych, {sentences[21]}, oraz {sentences[22]}, za wyjątkiem {sentences[23]} (chyba, że {sentences[24]}).</Sentence>)),
    (sentences => (<Sentence>Zamknięte są {sentences[12]}, {sentences[13]} i {sentences[14]}. Otwarte zostaną {sentences[15]} oraz {sentences[16]}, ale wyłącznie w {sentences[17]}.</Sentence>))
  ]

  const buttonAction = () => {
    setSentences(generate())
    setButtonText("GENERUJ NOWE")
    document.getElementById('topBar').scrollIntoView();
  }

  const dateOpts = {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  };

  const date = (new Date()).toLocaleDateString('pl-PL', dateOpts);

  const shuffledOptionalSentences = shuffle(optionalSentences);
  const finalSentences = [
    ...obligatorySentences,
    shuffledOptionalSentences[0],
    shuffledOptionalSentences[1]
  ];

  const { breakpoints, currentBreakpoint } = props;

  return (
      <Container>
        <TopBar id="topBar">
          <TopBarText>Koronawirus: ważne informacje</TopBarText>
        </TopBar>
        <LogoContainer>
          <Logo src="logo.jpg" />
          <Header>
            <HeaderTitle>Generator obostrzeń COVID-19</HeaderTitle>
            <Media>
              {({ breakpoints, currentBreakpoint }) => {
                console.log(breakpoints[currentBreakpoint])
                return breakpoints[currentBreakpoint] >= breakpoints.sm ? (
                  <HeaderSub>Sprawdź, co dzisiaj wolno, a czego nie</HeaderSub>
                ) : (
                  <></>
                )
              }}
            </Media>
          </Header>
        </LogoContainer>
        <SentencesContainer>
          <SentenceHeader>
            Kancelaria Prezesa Rady Ministrów informuje, że od {date} roku:
          </SentenceHeader>
          {sentences && (
            <SentenceList>
            {shuffle(finalSentences).map(it => it(sentences))}
            </SentenceList>
          )}
          <StyledButton onClick={buttonAction}>{buttonText}</StyledButton>
        </SentencesContainer>
        <Footer>
          Ta strona to <b>żart</b>. Po prawdziwe informacje na temat obostrzeń udaj się <a href="https://www.gov.pl/web/koronawirus">tutaj</a>.
          Ikony dzięki <a href="https://www.freepik.com" title="Freepik">Freepik</a> przez <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a>
        </Footer>
      </Container>
  );
}

export default App;
