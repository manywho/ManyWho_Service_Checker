import Freezer from 'freezer-js';
import { loadState } from './utils/persistence.js';

const state = loadState() || {
    service: null,
    editor: {}
};

export default new Freezer(state);
