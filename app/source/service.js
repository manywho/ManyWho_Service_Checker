import { CheckStatus, Parse } from '../utils/ajax.js';

export default {

    metadata(uri) {
        return fetch(uri + '/metadata', { method: 'POST' })
                .then(CheckStatus)
                .then(Parse);
    },

    load() {

    },

    save() {

    },

    invoke() {

    }

};
