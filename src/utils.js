// Durstenfeld Shuffle from https://stackoverflow.com/a/12646864/6417161
export function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

export function collectStats() {
    var req = new XMLHttpRequest();
    req.open("GET", "https://www.google-analytics.com/collect?v=1&_v=j87&aip=1&t=pageview&_s=1&dl=https%3A%2F%2Fkoronawirus.lol%2F&ul=pl-pl&de=UTF-8&sd=24-bit&je=0&_u=YEAAAAAB~&cid=683021380.1612123071&tid=UA-188506897-1&_gid=479092168.1612123071&z=169549912");
    req.send();
}