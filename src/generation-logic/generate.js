import { chooseLanguage, shuffleArray } from '../utils'
import { useIntl } from 'react-intl'

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

function getQuarantineDecision(intl) {
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

function getBusSeatsNumber(percentage) {
    return Math.floor(60 * Number(percentage) / 100);
}

function getRestaurantState(intl, value1, value2) {
    // if (value1.includes("zamknięte")) {
    const closedStr = intl.formatMessage({id: "dynamicRestaurant1"});
    if (value1.includes(closedStr)) {
        return "";
    }
    // return `, pod warunkiem ${value2}`;
    return intl.formatMessage({id: "dynamicRestaurant2"}, { condition: value2 });
}

function getSchoolGradeRange() {
    const min = 1;
    const max = 8;
    const lo = min + Math.floor(Math.random() * (max - min));
    const hi = lo + 1 + Math.floor(Math.random() * (max - lo));
    return `${lo}-${hi}`;
}

export default function generate(intl) {
    let dict = {};
    [dict[0], dict[1], dict[2], dict[3]] = getRandomRange(0, 3, data);
    dict[4] = getRandom(4, data);
    dict[5] = getRandom(5, data);
    dict[6] = getQuarantineDecision(intl);
    dict[7] = getRandom(7, data);
    [dict[8], dict[9], dict[10], dict[11]] = getRandomRange(8, 11, data);
    [dict[12], dict[13], dict[14], dict[15], dict[16]] = getRandomRange(12, 16, data);
    dict[17] = getRandom(17, data);
    dict[18] = getRandom(18, data);
    dict[19] = getRestaurantState(intl, dict[18], getRandom(19, data));
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