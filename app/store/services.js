import ServicesActions from '../action/services.js';
import ServiceActions from '../action/service.js';
import Immutable from 'immutable';
import alt from '../alt.js';
import { guid } from '../utils/model.js';

class ServicesStore {

    constructor() {
        this.bindListeners({
            new: ServicesActions.new,
            delete: ServicesActions.delete,
            select: ServicesActions.select,
            edit: ServicesActions.edit,
            metadata: ServiceActions.metadata,
            load: ServicesActions.load,
            save: ServicesActions.save
        });

        this.services = Immutable.Map();
        this.selected = null;
    }

    new() {
        const service = { id: guid(), name: 'New Service', uri: 'https://flow.manywho.com/plugins/manywho/api/run/1', configurationValues: Immutable.Map(), types: Immutable.Map(), actions: Immutable.Map() };
        this.services = this.services.set(service.id, service);
        this.selected = service;
    }

    edit(service) {
        this.services = this.services.set(service.id, service);
    }

    delete(id) {
        this.services = this.services.delete(id);
        this.selected = null;
    }

    select(id) {
        this.selected = this.services.get(id);
    }

    metadata(response) {
        const service = this.selected;

        service.providesDatabase = response.providesDatabase;
        service.providesFiles = response.providesFiles;
        service.providesIdentity = response.providesIdentity;
        service.providesLogic = response.providesLogic;
        service.providesSocial = response.providesSocial;
        service.providesViews = response.providesViews;

        if (response.configurationValues) {
            service.configurationValues = Immutable.Map(response.configurationValues.map((value) => [ value.developerName, value ]));
        }

        if (response.actions) {
            service.actions = Immutable.Map(response.actions.map((action) => [ action.developerName, action ]));
        }

        if (response.install && response.install.typeElements) {
            service.types = Immutable.Map(response.install.typeElements.map((type) => [ type.developerName, type ]));
        }

        this.selected = service;
    }

    load() {
        const json = localStorage.getItem('services');
        if (json) {
            const services = JSON.parse(json);
            this.services = Immutable.Map();

            for (const key in services) {
                const service = services[key];
                this.services = this.services.set(service.id,
                    {
                        id: service.id,
                        name: service.name,
                        uri: service.uri,
                        providesDatabase: service.providesDatabase,
                        providesFiles: service.providesFiles,
                        providesIdentity: service.providesIdentity,
                        providesLogic: service.providesLogic,
                        providesSocial: service.providesSocial,
                        providesViews: service.providesViews,
                        configurationValues: Immutable.Map(service.configurationValues),
                        actions: Immutable.Map(service.actions),
                        types: Immutable.Map(service.types)
                    }
                );
            }

            this.selected = null;
        }
    }

    save() {
        const services = this.services.toJS();
        if (services) {
            localStorage.setItem('services', JSON.stringify(services));
        }
    }

}

export default alt.createStore(ServicesStore);
