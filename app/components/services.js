import React from 'react';
import ServicesActions from '../action/services.js';
import { ListGroup, ListGroupItem, ButtonGroup, Button } from 'react-bootstrap';

class Services extends React.Component {

    static propTypes = {
        onSelect: React.PropTypes.func,
        onNew: React.PropTypes.func,
        onDelete: React.PropTypes.func,
        services: React.PropTypes.any,
        selected: React.PropTypes.any
    }

    constructor(props) {
        super(props);

        this.onClick = this.onClick.bind(this);
    }

    onClick(e) {
        this.props.onSelect(e.target.id);
    }

    componentDidMount() {
        requestAnimationFrame(() => ServicesActions.load());
    }

    render() {
        const items = this.props.services.toArray().map((service) => {
            return <ListGroupItem onClick={this.onClick} id={service.id} active={this.props.selected === service} key={service.id}>{service.name}</ListGroupItem>;
        });

        return (<div className="services">
                    <div>
                        <Button bsStyle="primary" onClick={this.props.onNew}>New</Button>
                        <Button bsStyle="success" onClick={this.props.onSave}>Save</Button>
                        <Button bsStyle="danger" onClick={this.props.onDelete}>Delete</Button>
                    </div>
                    <ListGroup>{items}</ListGroup>
                </div>);
    }
}

export default Services;
