function getLocalItem(key) {
    return localStorage.getItem(key)
}

function setLocalItem(key, value) {
    localStorage.setItem(key, value)
}

module.exports = {
    "getLocalItem": getLocalItem,
    "setLocalItem": setLocalItem
}