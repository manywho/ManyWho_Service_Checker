import State from './state.js';
import { guid } from './utils/model.js';
import { CheckStatus, Parse } from './utils/ajax.js';

State.on('services:new', () => {
    const state = State.get();
    const service = { id: guid(), name: 'ManyWho Runtime Service', uri: 'https://flow.manywho.com/plugins/manywho/api/run/1', configurationValues: {}, types: {}, actions: {} };

    state.set({
        services: state.services.push(service),
        service: service
    });
});

State.on('services:select', (id) => {
    const state = State.get();
    state.set('service', state.services.filter((service) => service.id === id)[0]);
});

State.on('services:delete', () => {
    const state = State.get();
    state.set({
        service: null,
        services: state.services.filter((service) => service.id !== state.service.id)
    });
});

State.on('service:refresh', (service, useConfigurationValues) => {
    fetch(service.uri + '/metadata', { method: 'POST' })
        .then(CheckStatus)
        .then(Parse)
        .then((response) => {
            service.set({
                providesDatabase: response.providesDatabase,
                providesFiles: response.providesFiles,
                providesIdentity: response.providesIdentity,
                providesLogic: response.providesLogic,
                providesSocial: response.providesSocial,
                providesViews: response.providesViews,
                configurationValues: response.configurationValues,
                actions: response.actions,
                types: response.install && response.install.typeElements
            });
        });
});
