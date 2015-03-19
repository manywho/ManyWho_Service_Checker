manywho.types = React.createClass({

    onGet: function (event) {

        manywho.services.getTypes(manywho.services.getSelected());        

    },

    render: function () {

        var types = manywho.services.getSelected().types || [];

        var elements = types.map(function (type) {

            var properties = [];

            type.properties.forEach(function (property) {
                manywho.utils.addPropertyToList(properties, property);
            });

            return (
                <div>
                    <h4>{ type.developerName }</h4>
                    <h5>{ type.developerSummary }</h5>

                    <ul className="properties">
                    { properties}
                    </ul>
                </div>
            );

        });

        return (
            <div className="col-sm-4">
                <h3>Types</h3>
                <button className="btn btn-default btn-block" onClick={ this.onGet }>Update</button>
                { elements }
            </div>
        );

    }

});