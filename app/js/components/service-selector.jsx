manywho.serviceSelector = React.createClass({

    onChange: function(e) {

        manywho.services.setSelected(manywho.services.get(e.target.value));
        manywho.services.render();

    },

    render: function() {

        return <form className="form-inline service-selector">
                  <div className="form-group">
                    <label>Service:</label>
                    <select className="form-control" onChange={this.onChange} style={ { width: '450px', marginLeft: '1em', marginRight: '1em' } }>
                        {
                            manywho.services.getAll().map(function(service) {

                                return (<option value={service.id}>{service.url}</option>);

                            })
                        }
                    </select>
                  </div>
                  <button className="btn btn-default">New</button>
                </form>

    }

});
