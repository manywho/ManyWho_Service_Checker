manywho.actionTester = React.createClass({

    getInputControl: function(input) {

        switch (input.contentType.toLowerCase()) {
            case 'contentobject':
            case 'contentlist':

                return <div id={input.developerName} className="json-editor" style={ { height: '200px' } }></div>

            case 'contenttext':
            case 'contentpassword':

                return <input type="text" className="form-control" id={input.developerName}></input>

            case 'contentboolean':

                return <input type="checkbox" className="form-control" id={input.developerName}></input>

        }

    },

    onTest: function (event) {

        var self = this;
        var service = manywho.services.getSelected();
        var serviceUrl = new URI(this.props.uriPart);

        var request = {
            uri: serviceUrl.absoluteTo(service.url).toString(),
            configurationValues: service.configurationValues,
            inputs: []
        }

        $.post('/fetch?url=' + request.uri, request)
            .done(function(response) {

                debugger;

            })
            .fail(function(response) {

                self.setState({
                    error: response.responseText,
                    status: response.status
                });

            });

    },

    onKeyDown: function(e) {

        if (this.props.isVisible && e.keyCode == 27) {

            this.props.onClose();

        }

    },

    componentDidUpdate: function() {

        if (this.props.isVisible) {

            var jsonEditors = Array.prototype.slice.call(document.querySelectorAll('.json-editor'));

            jsonEditors.forEach(function(editor) {

                new JSONEditor(editor, { mode: 'code' });

            });

        }

    },

    componentDidMount: function() {

        document.addEventListener('keydown', this.onKeyDown);

    },

    componentWillUnmount: function() {

        document.removeEventListener('keydown', this.onKeyDown);

    },

    getInitialState: function()  {

        return {}

    },

    render: function () {

        var classes = [
            'action-tester',
            'center-block',
            (this.props.isVisible) ? '' : 'hidden'
        ].join(' ');

        if (this.props.action) {

            return (
                <div className="action-tester-container" onKeyUp={this.onKeyUp}>
                    <div className="action-tester-background" onClick={this.props.onClose}></div>
                    <div className={classes}>
                        <h3>{this.props.action.uriPart}</h3>
                        <p>{this.props.action.developerSummary}</p>
                        <button className="btn btn-default" onClick={this.onTest}>Test</button>

                        <div className="row">
                            <div className="col-sm-6">
                                <h3>Inputs</h3>
                                <ul className="list-unstyled inputs-list">
                                {
                                    this.props.action.serviceInputs.map(function(input) {

                                        return (
                                            <li>
                                                <div className="form-group">
                                                    <label>{input.developerName}</label>
                                                    { (input.required) ? <span><em> Required</em></span> : null }
                                                    { (input.typeElementDeveloperName) ? <span className="show">Type: { input.typeElementDeveloperName }</span> : null }
                                                    { this.getInputControl(input) }
                                                </div>
                                            </li>
                                        );

                                    }, this)
                                }
                                </ul>
                            </div>

                            <div className="col-sm-6">
                                <h3>Output - { this.state.status} </h3>
                                { (this.state.error) ? <div style={ { wordWrap: 'break-word' } }>{this.state.error}</div> : null }
                            </div>
                        </div>
                    </div>
                </div>
            );

        }
        else {

            return null;

        }

    }

});
