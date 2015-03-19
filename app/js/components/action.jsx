manywho.action = React.createClass({

    getInputControl: function(input) {

        switch (input.contentType.toLowerCase()) {
            case 'contentobject':
            case 'contentlist':

                return <div id='jsoneditor' className="json-editor" style={ { height: '200px' } }></div>

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

    componentDidMount: function() {

        var container = document.getElementById("jsoneditor");
        var options = {
            mode: 'code'
        };
        var editor = new JSONEditor(container, options);

    },

    getInitialState: function()  {

        return {}

    },

    render: function () {

        return (
            <div>
                <h3>{this.props.uriPart}</h3>
                <p>{this.props.developerSummary}</p>
                <button className="btn btn-default" onClick={this.onTest}>Test</button>

                <div className="row">
                    <div className="col-sm-6">
                        <h3>Inputs</h3>
                        <ul className="list-unstyled inputs-list">
                            {
                                this.props.serviceInputs.map(function(input) {

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
        );

    }

});