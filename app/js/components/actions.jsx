manywho.actions = React.createClass({

    onCloseTester: function(e) {

        this.setState({
            testAction: null
        });

    },

    onTest: function(e) {

        var selectedAction = this.props.service.actions.filter(function(action) {

            return action.uriPart == e.target.id;

        })[0];

        this.setState({
            testAction: selectedAction
        });

    },

    getInitialState: function() {

        return { testAction: null }

    },

    render: function () {

        var actions = this.props.service.actions || [];
        var PropertyTable = manywho.propertyTable;
        var ActionTester = manywho.actionTester;

        var isActionTesterVisible = this.state.testAction != null;

        return (
            <div>
                <h3>Actions</h3>
                {
                    actions.map(function(action) {

                        return (
                            <div>
                                <h4>{ action.developerName }</h4>
                                <h5>/{ action.uriPart }</h5>
                                <h5>{ action.developerSummary }</h5>

                                <button className="btn btn-small btn-default" onClick={ this.onTest } id={ action.uriPart }>Test</button>

                                <h5><strong>Inputs</strong></h5>
                                <PropertyTable properties={ action.serviceInputs }></PropertyTable>

                                <h5><strong>Outputs</strong></h5>
                                    <PropertyTable properties={ action.serviceOutputs } isRequiredVisible="true"></PropertyTable>
                            </div>
                        );

                    }, this)
                }
                <ActionTester isVisible={ isActionTesterVisible } service={ this.props.service } action={ this.state.testAction } onClose={ this.onCloseTester }></ActionTester>
            </div>
        );

    }

});
