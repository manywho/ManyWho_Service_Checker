function getInput(input, service) {

    var value = {
        developerName: input.developerName,
        typeElementDeveloperName: input.typeElementDeveloperName,
        contentType: input.contentType,
        contentValue: input.contentValue || null,
        objectData: null
    }

    if (input.contentType == "ContentList" || input.contentType == "ContentObject") {

        value.objectData = [getObjectData(input.typeElementDeveloperName, service, 0)];

    }

    return value;

}

function getObjectData(typeName, service, depth) {

    debugger;

    depth++;
    if (depth > 2) {

        return null;

    }

    var type = service.types.filter(function(type) {

        return type.developerName == typeName;

    })[0];

    var objectData = {
        externalId: null,
        developerName: type.developerName,
        isSelected: false,
        properties: type.properties.map(function(prop) {

            var propData = {
                developerName: prop.developerName
            }

            if (prop.contentType == "ContentList" || prop.contentType == "ContentObject") {

                propData.objectData = getObjectData(prop.typeElementDeveloperName, service, depth);

            }
            else {

                propData.contentValue = '',
                propData.objectData = null

            }

            return propData;

        })
    }

    return objectData;

}

manywho.actionTester = React.createClass({

    getInputControl: function(input) {

        switch (input.contentType.toLowerCase()) {
            case 'contentobject':
            case 'contentlist':

                return <div id={ input.developerName } className="json-editor" style={ { height: '300px' } }></div>

            case 'contenttext':
            case 'contentpassword':

                return <input type="text" className="form-control" id={ input.developerName }></input>

            case 'contentboolean':

                return <input type="checkbox" className="form-control" id={ input.developerName }></input>

        }

    },

    onTest: function (event) {

        var self = this;
        var serviceUrl = new URI(this.props.action.uriPart);

        var request = {
            uri: serviceUrl.absoluteTo(this.props.service.url).toString(),
            configurationValues: this.props.service.configurationValues,
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

            var jsonEditors = Array.prototype.slice.call(document.querySelectorAll('.json-editor:not(.initialized)'));

            jsonEditors.forEach(function(editor) {

                editor.classList.add('initialized');
                var instance = new JSONEditor(editor, { mode: 'code' });

                var input = this.props.action.serviceInputs.filter(function(input) {

                    return input.developerName == editor.id;

                })[0];

                instance.set(getInput(input, this.props.service));

            }, this);

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
                <div className="action-tester-container" onKeyUp={ this.onKeyUp }>
                    <div className="action-tester-background" onClick={ this.props.onClose }></div>
                    <div className={ classes }>

                        <button type="button" className="close pull-right" aria-label="Close" onClick={ this.props.onClose }><span aria-hidden="true">&times;</span></button>

                        <div className="row" style={ { clear: 'both' } }>
                            <div className="col-sm-10">
                                <h3>{ this.props.action.uriPart }</h3>
                                <p>{ this.props.action.developerSummary }</p>
                            </div>
                            <div className="col-sm-2">
                                <button className="btn btn-primary" onClick={ this.onTest } style={ { marginTop: '42px' } }>Test</button>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-sm-6">
                                <h3>Inputs</h3>
                                <ul className="list-unstyled inputs-list">
                                {
                                    this.props.action.serviceInputs.map(function(input) {

                                        return (
                                            <li>
                                                <div className="form-group">
                                                    <ul className="list-inline input-details">
                                                        <li><strong>Name:</strong> { input.developerName }</li>
                                                        <li><strong>Type:</strong> { (input.typeElementDeveloperName) ? input.typeElementDeveloperName : input.contentType }</li>
                                                        <li><strong>Required:</strong> { (input.required) ? <span className="glyphicon glyphicon-ok"></span> : <span className="glyphicon glyphicon-remove"></span> }</li>
                                                    </ul>
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
