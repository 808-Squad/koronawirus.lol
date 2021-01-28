import styled from 'styled-components'
import React, { useState } from 'react';
import generate from './generation-logic/generate'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-x: hidden;
  overflow-y: scroll;
  font-family: "Open Sans", sans-serif;
  height: 100%;
`

const Header = styled.div`
  color: white;
  min-height: 15vh;
  padding: 10px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  text-align: center;
  position: absolute;
  top: 50px;
  max-width: 50vh;
  @media (max-width: 768px) {
    top: 30px;
  }
`

const SubHeader = styled.p`
   display: block;
   @media (max-width: 768px) {
     display: none;
   }
`

const TopBar = styled.div`
    background-color: rgb(255, 198, 5);
    min-height: 20px;
    width: 100vw;
`

const StyledButton = styled.button`
   background-color: white;
   border: 3px solid;
   color: rgb(4, 59, 116);
   font-size: 20px;
   max-width: 200px;
   border-radius: 4px;
   min-width: 200px;
   margin: 20px;
   min-height: 40px;
   font-weight: bold;
   cursor: pointer;
   &:hover {
     background-color: rgb(4, 59, 116);
     color: white;
     border-radius: 10px;
   }
`

const SentencesContainer = styled.div`
  height: 150vh;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 1000px;
  // padding: 20px !important;
  @media (max-width: 1100px) {
    width: 700px;
  }
  @media (max-width: 768px) {
    width: 90%;
  }
`

const SentenceHeader = styled.h2`

`

const Sentence = styled.li`
  margin: 15px;
  font-size: 22px;
  @media (max-width: 768px) {
    font-size: 16px;
  }
`

const Footer = styled.div`
    margin-top: 1rem;
    padding: 0.3rem;
    background-color: white;
    padding-left: 1rem;
    padding-right: 1rem;
    font-size: 11px;
    font-style: italic;
    border-top: 1px solid;
    border-color: red;
    clear: both;
    position: relative;
    height: 20px;
    text-align: center;
    max-width: 80vh;
    margin: 10px;
`

const LogoContainer = styled.div`
   // max-height: 300px;
   position: relative;
   display: flex;
   justify-content: center;
   @media (max-width: 768px) {
    max-width: 65vh;
    max-height: 200px;
  }
`

const Logo = styled.img`

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

function App() {
  const [sentences, setSentences] = useState(null)

  const sentenceItems = [
    (sentences => (<Sentence>Hotele są dostępne tylko dla {sentences[0]}, {sentences[1]}, {sentences[2]} oraz {sentences[3]}.</Sentence>)),
    (sentences => (<Sentence>Wszystkie osoby przybywające do Polski z {sentences[4]} {sentences[5]} są {sentences[6]}.</Sentence>)),
    (sentences => (<Sentence>W zgromadzeniach może uczestniczyć maksymalnie {sentences[7]} osób (nie dotyczy {sentences[8]} oraz {sentences[9]}).</Sentence>)),
    (sentences => (<Sentence>Zakaz organizacji {sentences[10]} oraz {sentences[11]}.</Sentence>)),
    (sentences => (<Sentence>Zamknięte są {sentences[12]}, {sentences[13]} i {sentences[14]}, za to otwarte są {sentences[15]} oraz {sentences[16]}, ale tylko w {sentences[17]}.</Sentence>)),
    (sentences => (<Sentence>Restauracje i bary są {sentences[18]}, pod warunkiem {sentences[19]}.</Sentence>)),
    (sentences => (<Sentence>Nauka zdalna w klasach {sentences[20]} szkół podstawowych, {sentences[21]}, oraz {sentences[22]}, za wyjątkiem {sentences[23]} (chyba, że {sentences[24]}).</Sentence>)),
    (sentences => (<Sentence>Żłobki i przedszkola są {sentences[25]}.</Sentence>)),
    (sentences => (<Sentence>W {sentences[26]} i {sentences[27]} może przebywać maksymalnie jedna osoba na {sentences[28]} m kw. pomieszczenia.</Sentence>)),
    (sentences => (<Sentence>W godzinach {sentences[29]} zakupy mogą robić tylko osoby {sentences[30]}.</Sentence>)),
    (sentences => (<Sentence>W autobusach może być zajęte max. {Math.floor(60 * Number(sentences[31]) / 100)} miejsc siedzących (lub {sentences[31]}% wszystkich miejsc).</Sentence>))
  ]

  const dateOpts = {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  };
  const date = (new Date()).toLocaleDateString('pl-PL', dateOpts);

  return (
      <Container>
        <TopBar />
        <LogoContainer>
        <Logo src="logo.png" />
        <Header>
          <h1>Generator obostrzeń COVID-19</h1>
          <SubHeader>Sprawdź, co dzisiaj wolno, a czego nie</SubHeader>
          </Header>
        </LogoContainer>
        <StyledButton onClick={() => setSentences(generate())}>GENERUJ</StyledButton>
        <SentencesContainer>
        <SentenceHeader>
          Kancelaria Prezesa Rady Ministrów informuje, że od {date} roku:
        </SentenceHeader>
        {sentences && (
          <>
          {shuffle(sentenceItems).map(it => it(sentences))}
          <Footer>Ta strona to żart. Po prawdziwe informacje na temat obostrzeń udaj się <a href="https://www.gov.pl/web/koronawirus">tutaj</a></Footer>
          </>
        )}
        </SentencesContainer>
      </Container>
  );
}

export default App;
