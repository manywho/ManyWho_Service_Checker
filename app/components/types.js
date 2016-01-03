import React from 'react';
import { Button } from 'react-bootstrap';

class Types extends React.Component {

    static propTypes = {
        types: React.PropTypes.any,
        onAction: React.PropTypes.func
    }

    constructor(props) {
        super(props);
    }

    shouldComponentUpdate(nextProps) {
        return nextProps.types !== this.props.types;
    }

    render() {
        const types = this.props.types
                        && this.props.types.length > 0
                        && this.props.types.map((type) => {
                            return (<tr key={type.developerName}>
                                        <td>
                                            <Button bsStyle="info" bsSize="small" onClick={this.props.onAction.bind(null, type, 'TYPE')}>View</Button>
                                            <Button bsStyle="primary" bsSize="small" onClick={this.props.onAction.bind(null, type, 'TYPE-LOAD')}>Load</Button>
                                            <Button bsStyle="success" bsSize="small" onClick={this.props.onAction.bind(null, type, 'TYPE-SAVE')}>Save</Button>
                                        </td>
                                        <td>{type.developerName}</td>
                                        <td>{type.developerSummary}</td>
                                    </tr>);
                        });

        return (<div className="types">
            <h3>Types <small>{types && types.length}</small></h3>
            <table className="table table-bordered table-striped">
                <tbody>
                    <tr>
                        <th>Actions</th>
                        <th>Name</th>
                        <th>Summary</th>
                    </tr>
                    {types}
                </tbody>
            </table>
        </div>);
    }
}

export default Types;
