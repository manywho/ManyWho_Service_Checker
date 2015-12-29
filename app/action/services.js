import alt from '../alt.js';

class ServicesActions {

    new() {
        return null;
    }

    delete(id) {
        return id;
    }

    select(id) {
        return id;
    }

    edit(service) {
        return service;
    }

    load() {
        return null;
    }

    save() {
        return null;
    }

}

export default alt.createActions(ServicesActions);
