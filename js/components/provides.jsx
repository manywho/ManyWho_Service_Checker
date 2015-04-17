manywho.provides = React.createClass({

    render: function() {

        return <div>
            <h3>Provides</h3>
            <table className="table table-striped table-condensed">
                <tr>
                    <tr>
                        <th>Provides</th>
                        <th></th>
                    </tr>
                </tr>
                <tr>
                    <td>Database</td>
                    <td><span className={ (this.props.service.providesDatabase) ? 'glyphicon glyphicon-ok' : 'glyphicon glyphicon-remove' }></span></td>
                </tr>
                <tr>
                    <td>Files</td>
                    <td><span className={ (this.props.service.providesFiles) ? 'glyphicon glyphicon-ok' : 'glyphicon glyphicon-remove' }></span></td>
                </tr>
                <tr>
                    <td>Identity</td>
                    <td><span className={ (this.props.service.providesIdentity) ? 'glyphicon glyphicon-ok' : 'glyphicon glyphicon-remove' }></span></td>
                </tr>
                <tr>
                    <td>Logic</td>
                    <td><span className={ (this.props.service.providesLogic) ? 'glyphicon glyphicon-ok' : 'glyphicon glyphicon-remove' }></span></td>
                </tr>
                <tr>
                    <td>Social</td>
                    <td><span className={ (this.props.service.providesSocial) ? 'glyphicon glyphicon-ok' : 'glyphicon glyphicon-remove' }></span></td>
                </tr>
                <tr>
                    <td>Views</td>
                    <td><span className={ (this.props.service.providesViews) ? 'glyphicon glyphicon-ok' : 'glyphicon glyphicon-remove' }></span></td>
                </tr>
            </table>
        </div>

    }

});
