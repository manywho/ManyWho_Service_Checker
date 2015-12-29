import React from 'react';
import { Button } from 'react-bootstrap';

class Types extends React.Component {

    static propTypes = {
        types: React.PropTypes.any,
        onView: React.PropTypes.func
    }

    constructor(props) {
        super(props);
    }

    render() {
        const types = this.props.types
                        && this.props.types.size > 0
                        && this.props.types.toArray().map((type) => {
                            return (<tr key={type.developerName}>
                                        <td><Button bsStyle="info" bsSize="small" onClick={this.props.onView.bind(null, type)}>View</Button>{type.developerName}</td>
                                        <td>{type.developerSummary}</td>
                                    </tr>);
                        });

        return (<div className="types">
            <h3>Types <small>{types && types.length}</small></h3>
            <table className="table table-bordered table-striped">
                <tbody>
                    <tr>
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
