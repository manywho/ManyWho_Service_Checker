import ActionActions from '../action/action.js';
import alt from '../alt.js';

class ActionStore {

    constructor() {
        this.bindListeners({
            view: ActionActions.view,
            close: ActionActions.close
        });

        this.selected = null;
    }

    view(action) {
        this.selected = action;
    }

    close() {
        this.selected = null;
    }

}

export default alt.createStore(ActionStore);
