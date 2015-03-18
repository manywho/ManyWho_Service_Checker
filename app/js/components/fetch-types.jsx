var FetchTypes = React.createClass({
    getInitialState: function () {
        return {
            types: []
        };
    },

    handleClick: function (event) {
        var serviceUrl = document.getElementById('service-url').value;

        $.post('/fetch?url=' + serviceUrl + '/metadata', {}, function (result) {
            if (this.isMounted()) {
                if (result.install !== null) {
                    this.setState({
                        types: result.install.typeElements
                    });
                }

                this.setState(null);
            }
        }.bind(this));
    },

    render: function () {
        var types = [];
        this.state.types.forEach(function (type) {
            var properties = [];
            type.properties.forEach(function (property) {
                manywho.utils.addPropertyToList(properties, property);
            });

            types.push(
                <div>
                    <h4>{ type.developerName }</h4>
                    <h5>{ type.developerSummary }</h5>

                    <TestDatabaseLoad type={ type } />

                    <ul className="properties">
                    { properties}
                    </ul>
                </div>
            );
        });

        return (
            <span>
                <button type="submit" className="btn btn-default" onClick={ this.handleClick }>Fetch Types</button>

                { types }
            </span>
        );
    }
});