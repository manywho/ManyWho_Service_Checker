import React from 'react';
import Services from './services.js';
import Service from './service.js';
import ServicesStore from '../store/services.js';
import ServicesActions from '../action/services.js';
import TypeStore from '../store/type.js';
import TypeActions from '../action/type.js';
import ActionStore from '../store/action.js';
import ActionActions from '../action/action.js';
import Type from './type.js';
import Action from './action.js';
import { connect } from 'alt-react';

class Container extends React.Component {

    static propTypes = {
        service: React.PropTypes.any,
        type: React.PropTypes.any,
        action: React.PropTypes.any
    }

    constructor(props) {
        super(props);
        this.onNew = this.onNew.bind(this);
        this.onDelete = this.onDelete.bind(this);
        this.onSelect = this.onSelect.bind(this);
        this.onEdit = this.onEdit.bind(this);
    }

    onNew() {
        ServicesActions.new();
    }

    onSave() {
        ServicesActions.save();
    }

    onDelete() {
        ServicesActions.delete(this.props.service.selected.id);
    }

    onSelect(id) {
        ServicesActions.select(id);
    }

    onEdit(service) {
        ServicesActions.edit(service);
    }

    render() {
        return (<div className="root">
            <Services services={this.props.service.services} selected={this.props.service.selected} onNew={this.onNew} onSave={this.onSave} onDelete={this.onDelete} onSelect={this.onSelect}/>
            <Service service={this.props.service.selected} onEdit={this.onEdit}/>
            <Type isVisible={this.props.type.selected !== null} type={this.props.type.selected} onClose={TypeActions.close} />
            <Action isVisible={this.props.action.selected !== null} action={this.props.action.selected} onClose={ActionActions.close} />
        </div>);
    }
}

export default connect(Container, {
    listenTo() {
        return [ServicesStore, TypeStore, ActionStore];
    },

    getProps() {
        return {
            service: ServicesStore.getState(),
            type: TypeStore.getState(),
            action: ActionStore.getState()
        }
    },
});
