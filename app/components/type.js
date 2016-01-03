import React from 'react';
import { Modal, Button } from 'react-bootstrap';

class Type extends React.Component {

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
        const properties = this.props.type
                            && this.props.type.properties
                            && this.props.type.properties
                                .map((property) => property)
                                .sort((a, b) => {
                                    if(a.developerName < b.developerName) return -1;
                                    if(a.developerName > b.developerName) return 1;
                                    return 0;
                                })
                                .map((property) => {
                                    return (<tr key={property.developerName}>
                                                <td>{property.developerName}</td>
                                                <td>{property.contentType}</td>
                                                <td>{property.typeElementDeveloperName}</td>
                                                <td>{property.contentFormat}</td>
                                            </tr>);
                                });

        return (<Modal show onHide={this.props.onClose} container={this.props.container} bsSize="large">
                    <Modal.Header closeButton>
                        <Modal.Title>{this.props.type && this.props.type.developerName}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <h4>Properties <small>{properties && properties.length}</small></h4>
                        <table className="table table-bordered table-striped">
                            <tbody>
                                <tr>
                                    <th>Name</th>
                                    <th>Content Type</th>
                                    <th>Type</th>
                                    <th>Format</th>
                                </tr>
                                {properties}
                            </tbody>
                        </table>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.props.onClose}>Close</Button>
                    </Modal.Footer>
                </Modal>);
    }
}

export default Type;
