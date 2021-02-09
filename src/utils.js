import { v4 as uuidv4 } from 'uuid';
import getUserLocale from 'get-user-locale';

// Durstenfeld Shuffle from https://stackoverflow.com/a/12646864/6417161
export function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

const trackerId = "UA-188506897-1";
const sessionUuid = uuidv4();
let generationCounter = 0;
const commonRequestParams = [
    /*
     * Proto version: 1
     * Anonymize IP: true
     * Client ID: generated for this session
     * Tracker ID: constant
     * Document location: document.location
     */
    "v=1",
    "aip=1",
    `cid=${sessionUuid}`,
    `tid=${trackerId}`,
    `dl=${document.location}`
];

export function collectVisit(uuid) {
    const requestParams = commonRequestParams.concat([
        /*
         * Hit type: pageview
         */
        "t=pageview"
    ]);

    let req = new XMLHttpRequest();
    req.open("GET", "https://www.google-analytics.com/collect?" + requestParams.join("&"));
    req.send();
}

export function collectEvent(uuid) {
    generationCounter += 1;
    const requestParams = commonRequestParams.concat([
        /*
         * Hit type: event
         * Event category: generation
         * Event Action: generate
         */
        "t=event",
        "ec=generation",
        "ea=generate",
        `el=${generationCounter}`
    ]);

    let req = new XMLHttpRequest();
    req.open("GET", "https://www.google-analytics.com/collect?" + requestParams.join("&"));
    req.send();
}

export function chooseLanguage() {
    const address = window.location.href
    const supportedLanguages = ["pl", "en"]

    for (let language of supportedLanguages) {
        if (address.includes(`/${language}`)) {
            return language
        }
    }

    console.log('here')
    return "pl"
}