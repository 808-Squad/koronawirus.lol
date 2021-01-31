// Durstenfeld Shuffle from https://stackoverflow.com/a/12646864/6417161
export function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

export function collectVisit() {
    let req = new XMLHttpRequest();
    let cidPart = String(Math.floor(Math.random() * 1e10));

    req.open("GET", `https://www.google-analytics.com/collect?v=1&_v=j87&aip=1&t=pageview&_s=1&dl=https%3A%2F%2Fkoronawirus.lol%2F&ul=pl-pl&de=UTF-8&sd=24-bit&je=0&_u=YEAAAAAB~&cid=683021380.${cidPart}&tid=UA-188506897-1&_gid=479092168.${cidPart}`);
    req.send();
}

export function collectEvent() {
    let req = new XMLHttpRequest();
    let cidPart = String(Math.floor(Math.random() * 1e10));

    req.open("GET", `https://www.google-analytics.com/collect?v=1&_v=j87&aip=1&t=event&ec=generation&ea=generate&_s=1&dl=https%3A%2F%2Fkoronawirus.lol%2F&ul=pl-pl&de=UTF-8&sd=24-bit&je=0&_u=YEAAAAAB~&cid=683021380.${cidPart}&tid=UA-188506897-1&_gid=479092168.${cidPart}`);
    req.send();
}