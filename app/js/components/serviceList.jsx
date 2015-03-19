manywho.serviceList = React.createClass({

	onClick: function(e) {

		manywho.services.setSelected(manywho.services.get(e.target.id));
		manywho.services.render();

	},

	render: function() {

		var selectedService = manywho.services.getSelected();

		return (<ul className="list-group">
				    {manywho.services.getAll().map(function(service) {

			    		var classNames = ['list-group-item'];

			    		if (service.id == selectedService.id) {
			    			
			    			classNames.push('active')

			    		}

			    		var style = {
			    			wordWrap: 'break-word'
			    		}

			    		return <li className={classNames.join(' ')} style={style} id={service.id} onClick={this.onClick}>{service.url}</li>

				    }, this)}
				</ul>);

	}

});
