export function load() {
    var json = localStorage.getItem('services');
    if (json) {
        return JSON.parse(json);
    }
    return null;
}

export function save(services) {
    localStorage.setItem('services', JSON.stringify(services));
}
