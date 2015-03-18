var TestDatabaseLoad = React.createClass({
    handleClick: function (event) {
        var serviceUrl = document.getElementById('service-url').value;

        $.ajax({
            type: 'POST',
            contentType: 'application/json',
            dataType: 'json',
            url: '/fetch?url=' + serviceUrl + '/data',
            data: JSON.stringify({
                configurationValues: [
                    {
                        developerName: "API Token",
                        contentValue: "65ab40a154150326997b474745545a32"
                    }
                ],
                objectDataType: {
                    developerName: this.props.type.developerName
                }
            }),
            success: function (result) {
                if (this.isMounted()) {
                    if (result.actions !== null) {
                        this.setState({
                            actions: result.actions
                        });
                    }

                    this.setState(null);
                }
            }.bind(this)
        });
    },

    render: function () {
        //var actions = [];
        //this.state.actions.forEach(function (action) {
        //    var inputs = [];
        //    action.serviceInputs.forEach(function (input) {
        //        manywho.utils.addPropertyToList(inputs, input);
        //    });
        //
        //    var outputs = [];
        //    action.serviceOutputs.forEach(function (output) {
        //        manywho.utils.addPropertyToList(outputs, output);
        //    });
        //
        //    actions.push(
        //        <div>
        //            <h4>{ action.developerName }</h4>
        //            <h5>/{ action.uriPart }</h5>
        //            <h5>{ action.developerSummary }</h5>
        //
        //            <h5><strong>Inputs</strong></h5>
        //            <ul className="inputs">
        //            { inputs }
        //            </ul>
        //
        //            <h5><strong>Outputs</strong></h5>
        //            <ul className="outputs">
        //            { outputs }
        //            </ul>
        //        </div>
        //    );
        //});

        return (
            <span>
                <button type="submit" className="btn btn-default" onClick={ this.handleClick }>Test Database Call</button>
            </span>
        );
    }
});