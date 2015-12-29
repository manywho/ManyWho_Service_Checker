import TypeActions from '../action/type.js';
import alt from '../alt.js';

class TypeStore {

    constructor() {
        this.bindListeners({
            view: TypeActions.view,
            close: TypeActions.close
        });

        this.selected = null;
    }

    view(type) {
        this.selected = type;
    }

    close() {
        this.selected = null;
    }

}

export default alt.createStore(TypeStore);
