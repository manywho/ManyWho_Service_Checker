manywho.configurationValues = React.createClass({

    onSave: function(e) {

        this.props.service.configurationValues = this.props.service.configurationValues.map(function(value) {

            var id = value.developerName.replace(/' '/g, '_');

            if (this.state.values[id]) {

                value.customValue = this.state.values[id];

            }

            return value;

        }, this);

        manywho.services.save(this.props.service);

    },

    onValueChange: function(e) {

        var values = this.state.values;
        values[e.target.id] = e.target.value;

        this.setState({ values: values });

    },

    getInitialState: function() {

        return {
            values: {}
        }

    },

    render: function () {

        var configurationValues = this.props.service.configurationValues || [];
        var isSaveDisabled = (configurationValues.length > 0) ? null : 'disabled';

        return (
            <div>
                <h3>Configuration Values</h3>
                <table className="table configuration-values-table">
                    <tbody>
                    {
                        configurationValues.map(function(value) {

                            var id = value.developerName.replace(/' '/g, '_');
                            var customValue = value.customValue || this.state.values[id] || '';

                            return (<tr key={ value.developerName }>
                                <td>{ value.developerName }</td>
                                <td>
                                    <input className="form-control" id={ id } value={ customValue } onChange={ this.onValueChange } />
                                </td>
                            </tr>);

                        }, this)
                    }
                    </tbody>
                </table>
                <button className="btn btn-primary" onClick={ this.onSave } disabled={ isSaveDisabled }>Save</button>
            </div>
        );

    }

});
