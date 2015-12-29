import React from 'react';
import ConfigurationValue from './configuration-value.js';

class ConfigurationValues extends React.Component {

    static propTypes = {
        values: React.PropTypes.any,
    }

    constructor(props) {
        super(props);
    }

    render() {
        const values = this.props.values
                        && this.props.values.size > 0
                        && this.props.values.toArray().map((value) => {
                            return (<tr key={value.developerName}>
                                        <td>{value.developerName}</td>
                                        <td>{value.contentType}</td>
                                        <td><input type="checkbox" readOnly checked={value.isRequired} /></td>
                                        <td><ConfigurationValue value={value} onChange={this.props.onChange} /></td>
                                    </tr>);
                        });

        return (<div className="configurationValues">
            <h3>Configuration Values <small>{values && values.length}</small></h3>
            <table className="table table-bordered table-striped">
                <tbody>
                    <tr>
                        <th>Name</th>
                        <th>Type</th>
                        <th>Is Required</th>
                        <th>Value</th>
                    </tr>
                    {values}
                </tbody>
            </table>
        </div>);
    }
}

export default ConfigurationValues;
