import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import brace from 'brace';
import AceEditor from 'react-ace';

import 'brace/mode/json';
import 'brace/theme/github';

class JsonEditor extends React.Component {

    static propTypes = {
        onSave: React.PropTypes.func,
        name: React.PropTypes.any,
        value: React.PropTypes.any,
    }

    constructor(props) {
        super(props);
        this.state = { isOpen: false };
        this.onChange = this.onChange.bind(this);
        this.onEdit = this.onEdit.bind(this);
        this.onClose = this.onClose.bind(this);
        this.onSave = this.onSave.bind(this);
    }

    onChange(value) {
        this.setState({ value: value });
    }

    onEdit() {
        this.setState({ isOpen: true, value: this.props.value });
    }

    onClose() {
        this.setState({ isOpen: false });
    }

    onSave() {
        this.setState({ isOpen: false });
        this.props.onSave(this.state.value);
    }

    render() {
        return (<div>
                    <Button bsStyle="info" bsSize="small" onClick={this.onEdit}>Edit</Button>
                    <Modal show={this.state.isOpen} onHide={this.onClose} bsSize="large">
                        <Modal.Header closeButton>
                            <Modal.Title>{this.props.name}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <AceEditor mode="json" theme="github" value={this.state.value} onChange={this.onChange} name={this.props.name + '_editor'} />,
                        </Modal.Body>
                        <Modal.Footer>
                            <Button bsStyle="danger" onClick={this.onClose}>Close</Button>
                            <Button bsStyle="success" onClick={this.onSave}>Save</Button>
                        </Modal.Footer>
                    </Modal>
                </div>);
    }
}

export default JsonEditor;
