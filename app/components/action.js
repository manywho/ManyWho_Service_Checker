import React from 'react';
import { Modal, Button } from 'react-bootstrap';

class Action extends React.Component {

    static propTypes = {
        action: React.PropTypes.any,
        isVisible: React.PropTypes.any,
        onClose: React.PropTypes.func
    }

    constructor(props) {
        super(props);
    }

    render() {
        const inputs = this.props.action
                        && this.props.action.serviceInputs
                        && this.props.action.serviceInputs.map((input) => {
                            return (<tr key={input.developerName}>
                                <td>{input.developerName}</td>
                                <td>{input.contentType}</td>
                                <td>{input.typeElementDeveloperName}</td>
                                <td><input type="checkbox" readOnly checked={input.isRequired} /></td>
                            </tr>);
                        });

        const outputs = this.props.action
                        && this.props.action.serviceOutputs
                        && this.props.action.serviceOutputs.map((output) => {
                            return (<tr key={output.developerName}>
                                <td>{output.developerName}</td>
                                <td>{output.contentType}</td>
                                <td>{output.typeElementDeveloperName}</td>
                                <td><input type="checkbox" readOnly checked={output.isRequired} /></td>
                            </tr>);
                        });

        return (<Modal show={this.props.isVisible} onHide={this.props.onClose} bsSize="large">
                    <Modal.Header closeButton>
                        <Modal.Title>{this.props.action && this.props.action.developerName}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>{this.props.action && this.props.action.developerSummary}</p>
                        <h4>Uri: <small>{this.props.action && this.props.action.uriPart}</small></h4>
                        <h4>Inputs <small>{inputs && inputs.length}</small></h4>
                        <table className="table table-bordered table-striped">
                            <tbody>
                                <tr>
                                    <th>Name</th>
                                    <th>Content Type</th>
                                    <th>Type</th>
                                    <th>Is Required</th>
                                </tr>
                                {inputs}
                            </tbody>
                        </table>
                        <h4>Outputs <small>{outputs && outputs.length}</small></h4>
                        <table className="table table-bordered table-striped">
                            <tbody>
                                <tr>
                                    <th>Name</th>
                                    <th>Content Type</th>
                                    <th>Type</th>
                                    <th>Is Required</th>
                                </tr>
                                {outputs}
                            </tbody>
                        </table>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.props.onClose}>Close</Button>
                    </Modal.Footer>
                </Modal>);
    }
}

export default Action;
