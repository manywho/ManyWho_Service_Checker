import React from 'react';
import State from '../state.js';
import { ListGroup, ListGroupItem, Button } from 'react-bootstrap';
import { save } from '../utils/persistence.js';

class Services extends React.Component {

    static propTypes = {
        services: React.PropTypes.array.isRequired,
        selected: React.PropTypes.object
    }

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        State.on('update', () => this.forceUpdate());
    }

    shouldComponentUpdate(nextProps) {
		return nextProps.services !== this.props.services || nextProps.selected !== this.props.selected;
	}

    onClick(e) {
        State.trigger('services:select', e.target.id);
    }

    onNew() {
        State.trigger('services:new');
    }

    onSave() {
        save(State.get());
    }

    onDelete() {
        State.trigger('services:delete');
    }

    render() {
        const items = this.props.services.map((service) => {
            return <ListGroupItem onClick={this.onClick} id={service.id} active={this.props.selected && this.props.selected.id === service.id} key={service.id}>{service.name}</ListGroupItem>;
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
