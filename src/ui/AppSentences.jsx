import styled from 'styled-components'
import React, { useEffect, useState } from 'react'
import breakpoints from './breakpoints'
import { collectEvent, shuffleArray, chooseLanguage } from '../utils'
import { useIntl, FormattedMessage } from 'react-intl'


const QUARANTINE_MIN = 7;
const QUARANTINE_MAX = 14;

let data = null;

const dataPath = `lolcontent/${chooseLanguage()}.tsv`

let xhr = new XMLHttpRequest();
xhr.open("GET", dataPath, true);
xhr.onload = () => {
    if (xhr.readyState === 4) {
        if (xhr.status === 200) {
            data = xhr.responseText.replace(/[\r]+/g, '').split('\n').filter(e => e);
            for (let i = 0; i < data.length; i++) {
                data[i] = data[i].split('\t').filter(e => e);
            }
        } else {
            console.error(xhr.statusText);
        }
    }
};
xhr.send(null);

Number.prototype.between = function(a, b) {
  return a <= this && this <= b;
};

function getRandomRange(first, last, data) {
    last += 1;  // Last index in slices etc. is usually 1 higher than what you need
    const delta = last - first;

    let arr = [];
    for (let i = first; i < last; i++) {
        arr = arr.concat(data[i]);
    }
    shuffleArray(arr);

    const result = [];
    for (let i = 0; i < delta; i++) {
        const idx = Math.floor(Math.random() * (arr.length - 1));
        result.push(arr.splice(idx, 1));
    }
    return result;
}

function getRandom(n, data) {
    const arr = data[n];
    const len = arr.length;
    shuffleArray(arr);
    const idx = Math.floor(Math.random() * (len - 1));
    return arr[idx];
}

function getBusSeatsNumber(percentage) {
    return Math.floor(60 * Number(percentage) / 100);
}

function getSchoolGradeRange() {
    const min = 1;
    const max = 8;
    const lo = min + Math.floor(Math.random() * (max - min));
    const hi = lo + 1 + Math.floor(Math.random() * (max - lo));
    return `${lo}-${hi}`;
}


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


function AppSentences(props) {
    /*
     * Format:
     *  sentences[n]          - value for sentence `n`
     *  sentences['meta'][locale][n]  - additional data for sentence `n` in `locale`
     */
    const [sentences, setSentences] = useState(null)
    const [buttonLabelId, setButtonLabelId] = useState("button")
    const intl = useIntl()

    function getQuarantineDecision() {
        let rnd = Math.random();
        if (rnd <= 0.25) {
            // return "zwolnione z kwarantanny";
            return intl.formatMessage({id: "dynamicQuarantine1"});
        }
        else {
            rnd = Math.random();
            const quarantine_days = QUARANTINE_MIN + Math.floor(rnd * (QUARANTINE_MAX - QUARANTINE_MIN));
            // return "zobowiązane do odbycia kwarantanny przez " + quarantine_days + " dni";
            return intl.formatMessage({id: "dynamicQuarantine2"}, { days: quarantine_days });
        }
    }

    function getRestaurantState(value1, value2) {
        // if (value1.includes("zamknięte")) {
        const closedStr = intl.formatMessage({id: "dynamicRestaurant1"});
        if (value1.includes(closedStr)) {
            return "";
        }
        // return `, pod warunkiem ${value2}`;
        return intl.formatMessage({id: "dynamicRestaurant2", values: { condition: value2 }});
    }

    function generate() {
        let dict = {};
        [dict[0], dict[1], dict[2], dict[3]] = getRandomRange(0, 3, data);
        dict[4] = getRandom(4, data);
        dict[5] = getRandom(5, data);
        dict[6] = getQuarantineDecision();
        dict[7] = getRandom(7, data);
        [dict[8], dict[9], dict[10], dict[11]] = getRandomRange(8, 11, data);
        [dict[12], dict[13], dict[14], dict[15], dict[16]] = getRandomRange(12, 16, data);
        dict[17] = getRandom(17, data);
        dict[18] = getRandom(18, data);
        dict[19] = getRestaurantState(dict[18], getRandom(19, data));
        dict[20] = getSchoolGradeRange();
        dict[21] = getRandom(21, data);
        dict[22] = getRandom(22, data);
        dict[23] = getRandom(23, data);
        dict[24] = getRandom(24, data);
        dict[25] = getRandom(25, data);
        [dict[26], dict[27]] = getRandomRange(26, 27, data);
        dict[28] = getRandom(28, data);
        dict[29] = getRandom(29, data);
        dict[30] = getRandom(30, data);
        dict[31] = getRandom(31, data);
        dict[32] = getBusSeatsNumber(dict[31]);
        dict['meta'] = {};
        dict['meta']['pl'] = {};
        dict['meta']['pl'][7] = (() => {
            const n = Number(dict[7]);
            if ((n % 10).between(2, 4) && !(n % 100).between(12, 14)) {
                return ['mogą', 'osoby'];
            }
            else {
                return ['może', 'osób'];
            }
        })();
        dict['meta']['pl'][32] = (() => {
            const n = Number(dict[32]);
            if ((n % 10).between(2, 4) && !(n % 100).between(12, 14)) {
                return ['mogą', 'miejsca siedzące'];
            }
            else {
                return ['może', 'miejsc siedzących'];
            }
        })();
        return dict;
    }

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
        (sentences => (<Sentence key="4"><FormattedMessage id="sentence4" values={getValues(sentences, [10, 11])} />.</Sentence>)),
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
    )
}

export default AppSentences