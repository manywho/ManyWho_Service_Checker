import React from 'react';
import State from '../state.js';
import Model from '../model.js';
import { ListGroup, ListGroupItem, Button } from 'react-bootstrap';
import { saveModel, saveState } from '../utils/persistence.js';

class Services extends React.Component {

    static propTypes = {
        services: React.PropTypes.array.isRequired,
        selected: React.PropTypes.string
    }

    constructor(props) {
        super(props);
    }

    shouldComponentUpdate(nextProps) {
		return nextProps.services !== this.props.services || nextProps.selected !== this.props.selected;
	}

    onClick(e) {
        State.set({ service: e.target.id });
    }

    onNew() {
        Model.trigger('services:new');
    }

    onDelete() {
        Model.trigger('services:delete');
    }

    onSave() {
        saveModel(Model.get());
        saveState(State.get());
    }

    render() {
        const items = this.props.services.map((service) => {
            return <ListGroupItem onClick={this.onClick} id={service.id} active={this.props.selected && this.props.selected === service.id} key={service.id}>{service.name}</ListGroupItem>;
        });

        return (<div className="services">
                    <div>
                        <Button bsStyle="primary" onClick={this.onNew}>New</Button>
                        <Button bsStyle="success" onClick={this.onSave}>Save</Button>
                        <Button bsStyle="danger" onClick={this.onDelete}>Delete</Button>
                    </div>
                    <ListGroup>{items}</ListGroup>
                </div>);
    }
}

export default Services;
