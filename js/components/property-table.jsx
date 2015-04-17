manywho.propertyTable = React.createClass({

    render: function() {

        var rows = this.props.properties.map(function(prop) {

            var requiredClassName = (prop.required) ? 'glyphicon-ok' : 'glyphicon-remove';
            var contentType = prop.contentType;
            var contentTypeName = null;
            var required = null;

            if (prop.contentType === 'ContentObject' || prop.contentType === 'ContentList') {

                contentTypeName = <a href={ '#' + prop.typeElementDeveloperName.replace(/ /g, '_') }>{ prop.typeElementDeveloperName }</a>

            }

            if (this.props.isRequiredVisible) {

                required = <td><span className={ 'glyphicon ' + requiredClassName }></span></td>

            }

            return (<tr>
                <td>{ prop.developerName }</td>
                <td>{ contentType }</td>
                <td>{ contentTypeName }</td>
                { required }
            </tr>);

        }, this)

        return (
            <table className="table table-striped table-condensed property-table">
                <tbody>
                    <tr>
                        <th>Name</th>
                        <th>Type</th>
                        <th>Type Name</th>
                        { (this.props.isRequiredVisible) ? <th>Required</th> : null }
                    </tr>
                    {rows}
                </tbody>
            </table>
        );

    }

});
