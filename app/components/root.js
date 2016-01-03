import React from 'react';
import Services from './services.js';
import Service from './service.js';
import Model from '../model.js';
import State from '../state.js';

class Root extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        Model.on('update', () => this.forceUpdate());
        State.on('update', () => this.forceUpdate());
    }

    render() {
        const state = State.get();
        const model = Model.get();

        const service = state.service && model.services && model.services.filter((item) => item.id === state.service)[0];

        return (<div className="root">
            <Services services={model.services} selected={state.service} />
            <Service service={service} editor={state.editor} />
        </div>);
    }

}

export default Root;
