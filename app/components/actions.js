import React from 'react';
import { Button } from 'react-bootstrap';

class Actions extends React.Component {

    static propTypes = {
        actions: React.PropTypes.any,
        onView: React.PropTypes.func
    }

    constructor(props) {
        super(props);
    }

    render() {
        const actions = this.props.actions
                        && this.props.actions.size > 0
                        && this.props.actions.toArray().map((action) => {
                            return (<tr key={action.developerName}>
                                        <td><Button bsStyle="info" bsSize="small" onClick={this.props.onView.bind(null, action)}>View</Button> {action.developerName}</td>
                                    </tr>);
                        });

        return (<div className="actions">
            <h3>Actions <small>{actions && actions.length}</small></h3>
            <table className="table table-bordered table-striped">
                <tbody>
                    <tr>
                        <th>Name</th>
                    </tr>
                    {actions}
                </tbody>
            </table>
        </div>);
    }
}

export default Actions;
