import Freezer from 'freezer-js';
import { loadModel } from './utils/persistence.js';

const model = loadModel() || {
    services: []
};

export default new Freezer(model);
