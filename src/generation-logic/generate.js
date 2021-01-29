import data_path from '../data.csv';

const QUARANTINE_MIN = 5;
const QUARANTINE_MAX = 31;

let data = null;

let xhr = new XMLHttpRequest();
xhr.open("GET", data_path, true);
xhr.onload = () => {
    if (xhr.readyState === 4) {
        if (xhr.status === 200) {
            data = xhr.responseText.replace(/[\r]+/g, '').split('\n').filter(e => e);
        } else {
            console.error(xhr.statusText);
        }
    }
};
xhr.send(null);

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

export default function generate() {
    let arr = data.map(arr => {
        arr = arr.split(',').filter(e => e);
        console.log(arr);
        const len = arr.length;
        let rnd_index = Math.floor(Math.random() * len);
        return arr[rnd_index].replace("\"", "");
    });
    arr[6] = quarantine_decision();
    arr[32] = bus_seats(arr[31]);
    return arr;
    // return [
    //     'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    //     'Lorem Ipsum has been the industrys standard dummy text ever since the 1500s',
    //     'Contrary to popular belief, Lorem Ipsum is not simply random text.',
    //     'It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.',
    //     'Lorem Ipsum has been the industrys standard dummy text ever since the 1500s',
    //     'Contrary to popular belief, Lorem Ipsum is not simply random text.',
    //     'It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.',
    //     'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form'
    // ]
}