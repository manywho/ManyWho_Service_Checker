import alt from '../alt.js';

class ActionActions {

    view(action) {
        return action;
    }

    close() {
        return null;
    }

}

export default alt.createActions(ActionActions);
