import React from 'react';
import Services from './services.js';
import Service from './service.js';
import Type from './type.js';
import Action from './action.js';
import State from '../state.js';

class Root extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        State.on('update', () => this.forceUpdate());
    }

    closeType() {
        const state = State.get();
        state.set({ type: null });
    }

    closeAction() {
        const state = State.get();
        state.set({ action: null });
    }

    render() {
        const state = State.get();
        const type = state.type && <Type type={state.type} onClose={this.closeType} />;
        const action = state.action && <Action action={state.action} onClose={this.closeAction} />;

        return (<div className="root">
            <Services services={state.services} selected={state.service} />
            <Service service={state.service} />
            {type}
            {action}
        </div>);
    }

}

export default Root;
