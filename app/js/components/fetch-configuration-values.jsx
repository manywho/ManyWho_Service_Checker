var FetchConfigurationValues = React.createClass({
    getInitialState: function() {
        return {
            configurationValues: []
        }
    },

    handleClick: function (event) {
        var serviceUrl = document.getElementById('service-url').value;

        $.post('/fetch?url=' + serviceUrl + '/metadata', {}, function (result) {
            if (this.isMounted()) {
                this.setState({
                    configurationValues: result.configurationValues
                });
            }
        }.bind(this));
    },

    handleSave: function (event) {
        alert('save');
    },

    render: function () {
        var configurationValues = [];
        this.state.configurationValues.forEach(function (configurationValue) {
            configurationValues.push(
                <div className="form-group">
                    <label>{ configurationValue.developerName }</label>
                    <input className="form-control" data-developer-name={configurationValue.developerName} />
                </div>
            );
        });

        if (configurationValues.length > 0) {
            configurationValues.push(
                <button type="submit" className="btn btn-default" onClick={ this.handleSave }>Save</button>
            );
        }

        return (
            <span>
                <button type="submit" className="btn btn-default" onClick={ this.handleClick }>Fetch Configuration Values</button>

                { configurationValues }
            </span>
        );
    }
});