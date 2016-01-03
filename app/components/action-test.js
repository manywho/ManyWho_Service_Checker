import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import brace from 'brace';
import AceEditor from 'react-ace';

import 'brace/mode/json';
import 'brace/theme/github';

class ActionTest extends React.Component {

    static propTypes = {
        action: React.PropTypes.object,
        container: React.PropTypes.any,
        onClose: React.PropTypes.func
    }

    constructor(props) {
        super(props);
    }

    shouldComponentUpdate(nextProps) {
        return nextProps.action !== this.props.action;
    }

    render() {
        return (<Modal show onHide={this.props.onClose} container={this.props.container} bsSize="large">
                    <Modal.Header closeButton>
                        <Modal.Title>{this.props.action.developerName}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <AceEditor mode="json" theme="github" name={this.props.action.developerName + '_editor'} />
                        <Button>Execute</Button>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button bsStyle="danger" onClick={this.props.onClose}>Close</Button>
                    </Modal.Footer>
                </Modal>);
    }
}

export default ActionTest;
