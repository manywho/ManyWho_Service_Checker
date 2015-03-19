manywho.actions = React.createClass({

    onGet: function (event) {

        manywho.services.getActions(manywho.services.getSelected());        

    },

    onTest: function(e) {

        this.props.onTest(e.target.id);

    },

    render: function () {

        var actions = manywho.services.getSelected().actions || [];
        var inputs = [];
        var outputs = [];

        actions.forEach(function (action) {

            action.serviceInputs.forEach(function (input) {
                manywho.utils.addPropertyToList(inputs, input);
            });

            action.serviceOutputs.forEach(function (output) {
                manywho.utils.addPropertyToList(outputs, output);
            });

        });

        return (
            <div className="col-sm-4">
                <h3>Actions</h3>
                <button className="btn btn-default btn-block" onClick={ this.onGet }>Update</button>
                {
                    actions.map(function(action) {

                        return (
                            <div>
                                <h4>{ action.developerName }</h4>
                                <h5>/{ action.uriPart }</h5>
                                <h5>{ action.developerSummary }</h5>

                                <button className="btn btn-small btn-default" onClick={this.onTest} id={action.uriPart}>Test</button>

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

                    }, this)
                }
            </div>
        );

    }

});