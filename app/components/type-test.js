import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import brace from 'brace';
import AceEditor from 'react-ace';

import 'brace/mode/json';
import 'brace/theme/github';

class TypeTest extends React.Component {

    static propTypes = {
        type: React.PropTypes.object,
        container: React.PropTypes.any,
        onClose: React.PropTypes.func
    }

    constructor(props) {
        super(props);
    }

    shouldComponentUpdate(nextProps) {
        return nextProps.type !== this.props.type;
    }

    render() {
        return (<Modal show onHide={this.props.onClose} container={this.props.container} bsSize="large">
                    <Modal.Header closeButton>
                        <Modal.Title>{this.props.type && this.props.type.developerName}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <AceEditor mode="json" theme="github" name={this.props.type.developerName + '_editor'} />
                        <Button>Save</Button>
                        <Button>Load</Button>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button bsStyle="danger" onClick={this.props.onClose}>Close</Button>
                    </Modal.Footer>
                </Modal>);
    }
}

export default TypeTest;
