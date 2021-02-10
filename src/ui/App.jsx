import styled from 'styled-components'
import React, { useEffect, useState } from 'react'
import generate from '../generation-logic/generate'
import breakpoints from './breakpoints'
import ShareButtons from './ShareButtons'
import AppHeader from './AppHeader'
import AppFooter from './AppFooter'
import { collectEvent, collectVisit, shuffleArray } from '../utils'
import { useIntl, FormattedMessage } from 'react-intl'

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



function App(props) {
  const intl = useIntl()

  /*
   * Format:
   *  sentences[n]          - value for sentence `n`
   *  sentences['meta'][locale][n]  - additional data for sentence `n` in `locale`
   */
  const [sentences, setSentences] = useState(null)
  const [buttonLabelId, setButtonLabelId] = useState("button")

  useEffect(() => {
    collectVisit()
  }, [])

  const getValues = (sentences, indexes) => indexes.reduce((obj, index) => ({
    ...obj,
    [index]: sentences[index]
  }), {})

  const optionalSentences = [
    (sentences => (<Sentence key="2"><FormattedMessage id="sentence2" values={getValues(sentences, [4, 5, 6])} /></Sentence>)),
    (sentences => (<Sentence key="6"><FormattedMessage id="sentence6" values={getValues(sentences, [18, 19])} /></Sentence>)),
    (sentences => (<Sentence key="8"><FormattedMessage id="sentence8" values={getValues(sentences, [25])} /></Sentence>)),
    (sentences => (<Sentence key="10"><FormattedMessage id="sentence10" values={getValues(sentences, [29, 30])} /></Sentence>)),
    (sentences => (<Sentence key="11"><FormattedMessage id="sentence11" values={{
      ...getValues(sentences, [31, 32]),
      meta_pl_32_0: sentences['meta']['pl'][32][0],
      meta_pl_32_1: sentences['meta']['pl'][32][1]
    }} /></Sentence>))
  ]

  const obligatorySentences = [
    (sentences => (<Sentence key="1"><FormattedMessage id="sentence1" values={getValues(sentences, [0, 1, 2, 3])}/></Sentence>)),
    (sentences => (<Sentence key="3"><FormattedMessage id="sentence3" values={{
      ...getValues(sentences, [7, 8, 9]),
      meta_pl_7_0: sentences['meta']['pl'][7][0],
      meta_pl_7_1: sentences['meta']['pl'][7][1]
    }} /></Sentence>)),
    (sentences => (<Sentence key="4"><FormattedMessage id="sentence4" values={getValues(sentences, [10, 11])} /></Sentence>)),
    (sentences => (<Sentence key="9"><FormattedMessage id="sentence9" values={getValues(sentences, [26, 27, 28])} /></Sentence>)),
    (sentences => (<Sentence key="7"><FormattedMessage id="sentence7" values={getValues(sentences, [20, 21, 22, 23, 24])} /></Sentence>)),
    (sentences => (<Sentence key="5"><FormattedMessage id="sentence5" values={getValues(sentences, [12, 13, 14, 15, 16, 17])} /></Sentence>))
  ]

  const buttonAction = () => {
    setSentences(generate(intl))
    setButtonLabelId("buttonGenerateNew")
    document.getElementById('topBar').scrollIntoView()
    collectEvent()
  }

  const dateOpts = {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  };

  const date = intl.formatDate(new Date(), dateOpts);

  shuffleArray(optionalSentences)
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
          <FormattedMessage id="infoMessage" values={{ date }} />
        </SentenceHeader>
        {sentences && (
          <SentenceList>
          {finalSentences.map(it => it(sentences))}
          </SentenceList>
        )}
        <StyledButton onClick={buttonAction}><FormattedMessage id={buttonLabelId} /></StyledButton>
      </SentencesContainer>
      <ShareButtons />
      <AppFooter />
    </Container>
  );
}

export default App
