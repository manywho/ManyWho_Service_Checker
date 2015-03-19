manywho.configurationValues = React.createClass({

    onGet: function (event) {

        manywho.services.getConfigurationValues(manywho.services.getSelected());        

    },

    render: function () {

        var configurationValues = manywho.services.getSelected().configurationValues || [];

        return (
            <div className="col-sm-4">
                <h3>Configuration Values</h3>
                <button className="btn btn-default btn-block" onClick={ this.onGet }>Update</button>
                {
                    configurationValues.map(function(value) {

                        return (<div className="form-group">
                            <label>{ value.developerName }</label>
                            <input className="form-control" data-developer-name={value.developerName} />
                        </div>);

                    })
                }
            </div>
        );

    }

});