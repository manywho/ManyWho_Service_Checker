import alt from '../alt.js';

class TypeActions {

    view(type) {
        return type;
    }

    close() {
        return null;
    }

}

export default alt.createActions(TypeActions);
