import React from 'react';
import { Input, Modal, Button } from 'react-bootstrap';
import brace from 'brace';
import AceEditor from 'react-ace';

import 'brace/mode/json';
import 'brace/theme/github';

class TypeSave extends React.Component {

    static propTypes = {
        type: React.PropTypes.object,
        container: React.PropTypes.any,
        onClose: React.PropTypes.func
    }

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        const objectData = [{}];
        this.setState({ json: JSON.stringify(objectData) });
    }

    shouldComponentUpdate(nextProps) {
        return nextProps.type !== this.props.type;
    }

    render() {
        return (<Modal show onHide={this.props.onClose} container={this.props.container} bsSize="large">
                    <Modal.Header closeButton>
                        <Modal.Title>{'Save By Type: ' + this.props.type.developerName}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <AceEditor mode="json" theme="github" value={this.state.json} name={this.props.type.developerName + '_editor'} />
                        <Button>Save</Button>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button bsStyle="danger" onClick={this.props.onClose}>Close</Button>
                    </Modal.Footer>
                </Modal>);
    }
}

export default TypeSave;
