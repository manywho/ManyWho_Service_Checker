import React from 'react';
import { Input, Modal, Button } from 'react-bootstrap';
import brace from 'brace';
import AceEditor from 'react-ace';

import 'brace/mode/json';
import 'brace/theme/github';

class TypeLoad extends React.Component {

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
                        <Modal.Title>{'Load By Type: ' + this.props.type.developerName}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <h3>List Filter</h3>
                        <Input type="text" label="Id" />
                        <Input type="text" label="Search" />
                        <Input type="number" label="Limit" />
                        <Input type="number" label="Offset" />
                        <Input type="text" label="Order By DirectionType" />
                        <Input type="text" label="Order By Property DeveloperName" />
                        <Input type="checkbox" label="Filter By Provided Objects" />
                        <Input type="text" label="Comparison Type" />
                        <h4>Wheres</h4>
                        <AceEditor mode="json" theme="github" name={this.props.type.developerName + '_editor'} />
                        <Button>Load</Button>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button bsStyle="danger" onClick={this.props.onClose}>Close</Button>
                    </Modal.Footer>
                </Modal>);
    }
}

export default TypeLoad;
