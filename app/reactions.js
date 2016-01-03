import State from './state.js';
import Model from './model.js';
import { guid } from './utils/model.js';
import { CheckStatus, Parse } from './utils/ajax.js';

Model.on('services:new', () => {
    const model = Model.get();
    const state = State.get();
    const service = { id: guid(), name: 'ManyWho Runtime Service', uri: 'https://flow.manywho.com/plugins/manywho/api/run/1', configurationValues: {}, types: {}, actions: {} };

    model.set({ services: model.services.push(service) });
    state.set({ service: service.id });
});

Model.on('services:delete', () => {
    const model = Model.get();
    const state = State.get();

    model.set({ services: model.services.filter((service) => service.id !== state.service) });
    state.set({ service: null });
});

Model.on('service:refresh', (service, useConfigurationValues) => {
    let body = null;
    if (useConfigurationValues && service.configurationValues) {
        body = {
            configurationValues: service.configurationValues
        };
    }

    fetch(service.uri + '/metadata',
        {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: body && JSON.stringify(body)
        })
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
