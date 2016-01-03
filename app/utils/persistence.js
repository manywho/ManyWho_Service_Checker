export function loadModel() {
    var json = localStorage.getItem('model');
    if (json) {
        return JSON.parse(json);
    }
    return null;
}

export function saveModel(model) {
    localStorage.setItem('model', JSON.stringify(model));
}

export function loadState() {
    var json = localStorage.getItem('state');
    if (json) {
        return JSON.parse(json);
    }
    return null;
}

export function saveState(state) {
    localStorage.setItem('state', JSON.stringify(state));
}
