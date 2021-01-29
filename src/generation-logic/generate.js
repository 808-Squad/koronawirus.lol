import data_path from '../data.tsv';

const QUARANTINE_MIN = 7;
const QUARANTINE_MAX = 14;

let data = null;

let xhr = new XMLHttpRequest();
xhr.open("GET", data_path, true);
xhr.onload = () => {
    if (xhr.readyState === 4) {
        if (xhr.status === 200) {
            data = xhr.responseText.replace(/[\r]+/g, '').split('\n').filter(e => e);
            for (let i = 0; i < data.length; i++) {
                data[i] = data[i].replace("\"", "").split('\t').filter(e => e);
            }
        } else {
            console.error(xhr.statusText);
        }
    }
};
xhr.send(null);

// Durstenfeld Shuffle from https://stackoverflow.com/a/12646864/6417161
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

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

function quarantine_decision() {
    let rnd = Math.random();
    if (rnd <= 0.25) {
        return "zwolnione z kwarantanny";
    }
    else {
        rnd = Math.random();
        const quarantine_days = QUARANTINE_MIN + Math.floor(rnd * (QUARANTINE_MAX - QUARANTINE_MIN));
        return "zobowiązane do odbycia kwarantanny przez " + quarantine_days + " dni";
    }
}

function bus_seats(percentage) {
    return Math.floor(60 * Number(percentage) / 100);
}

function getRestaurantState(value1, value2) {
    if (value1.includes("zamknięte")) {
        return ".";
    }
    return `, pod warunkiem ${value2}.`;
}

export default function generate() {
    let arr = [];
    [arr[0], arr[1], arr[2], arr[3]] = getRandomRange(0, 3, data);
    arr[4] = getRandom(4, data);
    arr[5] = getRandom(5, data);
    arr[6] = quarantine_decision();
    arr[7] = getRandom(7, data);
    [arr[8], arr[9], arr[10], arr[11]] = getRandomRange(8, 11, data);
    [arr[12], arr[13], arr[14], arr[15], arr[16]] = getRandomRange(12, 16, data);
    arr[17] = getRandom(17, data);
    arr[18] = getRandom(18, data);
    arr[19] = getRestaurantState(arr[18], getRandom(19, data));
    arr[20] = getRandom(20, data);
    arr[21] = getRandom(21, data);
    arr[22] = getRandom(22, data);
    arr[23] = getRandom(23, data);
    arr[24] = getRandom(24, data);
    arr[25] = getRandom(25, data);
    [arr[26], arr[27]] = getRandomRange(26, 27, data);
    arr[28] = getRandom(28, data);
    arr[29] = getRandom(29, data);
    arr[30] = getRandom(30, data);
    arr[31] = getRandom(31, data);
    arr[32] = bus_seats(arr[31]);
    return arr;
}