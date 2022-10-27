export const wait = async function(seconds) {
    return new Promise(resolve => setTimeout(() => resolve(), seconds * 1000));
}

export const random = function(min, max) {
    return Math.floor((Math.random() * (max - min + 1)) + min);
}
