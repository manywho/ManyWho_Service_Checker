import Freezer from 'freezer-js';
import { load } from './utils/persistence.js';

const state = load() || {
    services: [],
    service: null,
    action: null,
    type: null
};

export default new Freezer(state);
