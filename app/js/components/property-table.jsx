manywho.propertyTable = React.createClass({

    render: function() {

        var rows = this.props.properties.map(function(prop) {

            var requiredClassName = (prop.required) ? 'glyphicon-ok' : 'glyphicon-remove';
            var contentType = prop.contentType;
            var contentTypeName = null;

            if (prop.contentType === 'ContentObject' || prop.contentType === 'ContentList') {

                contentTypeName = <a href={ '#' + prop.typeElementDeveloperName.replace(/ /g, '_') }>{prop.typeElementDeveloperName}</a>

            }

            return (<tr>
                <td>{prop.developerName}</td>
                <td>{contentType}</td>
                <td>{contentTypeName}</td>
                <td><span className={ 'glyphicon ' + requiredClassName }></span></td>
            </tr>);

        })

        return (
            <table className="table table-striped table-condensed property-table">
                <tbody>
                    <tr>
                        <th>Name</th>
                        <th>Type</th>
                        <th>Type Name</th>
                        <th>Required</th>
                    </tr>
                    {rows}
                </tbody>
            </table>
        );

    }

});
