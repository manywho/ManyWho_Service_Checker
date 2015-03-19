(function(manywho, $, React) {

    function guid() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
            return v.toString(16);
        });
    }

	var services = {};
	var selectedService = { id: guid() };

	manywho.services = {

		new: function() {

			var newService = { id: guid() }
			services[newService.id] = newService;
			this.setSelected(newService);

			return this.getSelected();

		},

		save: function(service) {

			services[service.id] = service;
			localStorage.setItem('services', JSON.stringify(services));

		},

		load: function() {

			services = JSON.parse(localStorage.getItem('services') || '{}');

			var keys = Object.keys(services);
			if (keys && keys.length > 0) {

				this.setSelected(services[keys[0]]);

			}

		},

		get: function(id) {

			return services[id];

		},

		getSelected: function() {

			return selectedService;

		},

		setSelected: function(service) {

			selectedService = service;

		},

		getAll: function() {

			var servicesObject = services || {}

			return Object.keys(servicesObject).map(function(key) {

				return servicesObject[key];

			});

		},

		getConfigurationValues: function(service) {

			var self = this;

	        $.post('/fetch?url=' + service.url + '/metadata', {})
	        	.then(function(response) {

	        		service.configurationValues = response.configurationValues;
        			self.render();

		        });

		},

		getActions: function(service) {

			var self = this;

	        $.post('/fetch?url=' + service.url + '/metadata', {})
	        	.then(function(response) {

	        		service.actions = response.actions;
        			self.render();

		        });

		},

		getTypes: function(service) {

			var self = this;

	        $.post('/fetch?url=' + service.url + '/metadata', {})
	        	.then(function(response) {

	        		service.types = response.install.typeElements;
        			self.render();

		        });

		},

		render: function() {

			 React.render(React.createElement(manywho.root, null), document.getElementById('services'));

		}

	}

}(manywho, jQuery, React));