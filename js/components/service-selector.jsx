manywho.serviceSelector = React.createClass({

    onChange: function(e) {

        manywho.services.setSelected(manywho.services.get(e.target.value));
        manywho.services.render();

    },

    onNew: function(e) {

        e.preventDefault();
        e.stopPropagation();

        if (manywho.services.isSaved(manywho.services.getSelected().id)) {

            manywho.services.new();
            manywho.services.render();

        }

    },

    render: function() {

        var selectedService = manywho.services.getSelected() || {};

        return <div className="form-inline service-selector">
                  <div className="form-group">
                    <label>Service:</label>
                    <select className="form-control" onChange={ this.onChange } value={ selectedService.id } style={ { width: '450px', marginLeft: '1em', marginRight: '1em' } }>
                        {
                            manywho.services.getAll().map(function(service) {

                                return (<option value={ service.id }>{ service.url }</option>);

                            })
                        }
                    </select>
                  </div>
                  <button className="btn btn-default" onClick={ this.onNew }>New</button>
                </div>

    }

});
