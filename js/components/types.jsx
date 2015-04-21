manywho.types = React.createClass({

    render: function () {

        var types = this.props.service.types || [];
        var PropertyTable = manywho.propertyTable;

        return (
            <div>
                <h3>Types</h3>
                {
                    types.map(function(type) {

                        return (<div className="type">
                            <h4 id={ type.developerName.replace(/ /g, '_') }>{ type.developerName }</h4>
                            <p>{ type.developerSummary }</p>
                            <PropertyTable properties={type.properties}></PropertyTable>
                        </div>);

                    })
                }
            </div>
        );

    }

});
