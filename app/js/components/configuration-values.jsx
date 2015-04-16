manywho.configurationValues = React.createClass({

    onSave: function(event) {

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

                            return (<tr key={value.developerName}>
                                <td>{ value.developerName }</td>
                                <td>
                                    <input className="form-control" data-developer-name={value.developerName} />
                                </td>
                            </tr>);

                        })
                    }
                    </tbody>
                </table>
                <button className="btn btn-primary" onClick={ this.onSave } disabled={isSaveDisabled}>Save</button>
            </div>
        );

    }

});
