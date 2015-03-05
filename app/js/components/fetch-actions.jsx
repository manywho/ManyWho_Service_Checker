var FetchActions = React.createClass({
    getInitialState: function () {
        return {
            actions: []
        };
    },

    handleClick: function (event) {
        var serviceUrl = document.getElementById('service-url').value;

        $.post('/fetch?url=' + serviceUrl + '/metadata', {}, function (result) {
            if (this.isMounted()) {
                if (result.actions !== null) {
                    this.setState({
                        actions: result.actions
                    });
                }

                this.setState(null);
            }
        }.bind(this));
    },

    render: function () {
        var actions = [];
        this.state.actions.forEach(function (action) {
            var inputs = [];
            action.serviceInputs.forEach(function (input) {
                manywho.utils.addPropertyToList(inputs, input);
            });

            var outputs = [];
            action.serviceOutputs.forEach(function (output) {
                manywho.utils.addPropertyToList(outputs, output);
            });

            actions.push(
                <div>
                    <h4>{ action.developerName }</h4>
                    <h5>/{ action.uriPart }</h5>
                    <h5>{ action.developerSummary }</h5>

                    <h5><strong>Inputs</strong></h5>
                    <ul className="inputs">
                    { inputs }
                    </ul>

                    <h5><strong>Outputs</strong></h5>
                    <ul className="outputs">
                    { outputs }
                    </ul>
                </div>
            );
        });

        return (
            <span>
                <button type="submit" className="btn btn-default" onClick={ this.handleClick }>Fetch Actions</button>

                { actions }
            </span>
        );
    }
});