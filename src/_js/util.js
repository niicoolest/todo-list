const id = () => {
    return Math.floor(Math.random() * Math.floor(Math.random() * Date.now()));
}

const datenow = () => {
    return new Date().toLocaleString().split(/\D/).slice(0,3).map(num=>num.padStart(2,"0")).join("/");
}

export {id, datenow}