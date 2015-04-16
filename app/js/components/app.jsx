manywho.app = React.createClass({

	onNew: function(e) {

		manywho.services.new();
		this.forceUpdate();

	},

	onSave: function(e) {

		manywho.services.save(manywho.services.getSelected());
		this.forceUpdate();

	},

	onUrlChanged: function(e) {

		manywho.services.getSelected().url = e.target.value;
		this.forceUpdate();

	},

	onTestAction: function(uriPart) {

		this.setState({ testActionUriPart: uriPart });

	},

	hideTestActionModal: function() {

		this.setState({ testActionUriPart: null });

	},

	getInitialState: function() {

		return {
			testActionUriPart: null
		}

	},

	render: function() {

		var ServiceSelector = manywho.serviceSelector;
		var Service = manywho.service;

		return (<div className="container">
				    <h1>ManyWho Service Checker</h1>

			    	<div>
						<ServiceSelector></ServiceSelector>
						<Service service={manywho.services.getSelected()}></Service>
				    </div>

				</div>);

	}

});
