manywho.services = (function(manywho, $, React) {

    function guid() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
            return v.toString(16);
        });
    }

    function developerNameSort(a, b) {

        if (a.developerName > b.developerName) {

            return 1;

        }

        if (a.developerName < b.developerName) {

            return -1;

        }

        return 0;

    }

	var services = {};

	return {

		new: function() {

			var newService = { id: guid(), url: '', actions: [], types: [], configurationValues: [] }
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
            this.selectDefault();

		},

        delete: function(service) {

            services[service.id] = null;
            delete services[service.id];

            localStorage.setItem('services', JSON.stringify(services));

            this.selectDefault();

        },

        isSaved: function(id) {

            var services = JSON.parse(localStorage.getItem('services') || '{}');
            return (services[id]);

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

        selectDefault: function() {

            var keys = Object.keys(services);
            if (keys.length == 0) {

                this.new();

            }
            else {

                this.setSelected(services[keys[0]]);

            }

        },

		getAll: function() {

			var servicesObject = services || {}

			return Object.keys(servicesObject).map(function(key) {

				return servicesObject[key];

			});

		},

        update: function(service) {

            var self = this;

            return $.post(service.url + '/metadata', {})
                .then(function(response) {

                    service.providesDatabase = response.providesDatabase;
                    service.providesFiles = response.providesFiles;
                    service.providesIdentity = response.providesIdentity;
                    service.providesLogic = response.providesLogic;
                    service.providesSocial = response.providesSocial;
                    service.providesViews = service.providesViews;

                    service.actions = response.actions;
                    if (service.actions) {

                        service.actions.sort(developerNameSort);

                    }

                    service.types = response.install.typeElements;
                    if (service.types) {

                        service.types.sort(developerNameSort);

                    }

                    if (response.configurationValues) {

                        service.configurationValues = response.configurationValues.map(function(value) {

                            var existingValue = service.configurationValues.filter(function(configValue) {

                                return configValue.developerName == value.developerName;

                            })[0];

                            if (existingValue) {

                                value.customValue = existingValue.customValue;

                            }

                            return value;

                        })
                        .sort(developerNameSort);

                    }
                    else {

                        service.configurationValues = [];

                    }

                });

        },

		render: function() {

			 React.render(React.createElement(manywho.app, null), document.getElementById('services'));

		}

	}

}(manywho, jQuery, React));
