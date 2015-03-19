manywho.root = React.createClass({

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

		var selectedService = manywho.services.getSelected();

		var ServiceList = manywho.serviceList;
		var ConfigurationValues = manywho.configurationValues;
		var Actions = manywho.actions;
		var Types = manywho.types;
		var Action = manywho.action;
 		var Modal = ReactBootstrap.Modal;
 		var testActionModal = null;

		if (this.state.testActionUriPart) {

			var selectedAction = selectedService.actions.filter(function(action) {

				return action.uriPart == this.state.testActionUriPart;

			}, this)[0];

			testActionModal = <Modal title={selectedAction.developerName}
			        bsStyle="primary"
			        bsClass="modal-lg"
			        backdrop={true}
			        animation={true}
			        onRequestHide={this.hideTestActionModal}>
		        <div className="modal-body">
		         	<Action {...selectedAction} />
		        </div>
			</Modal>

		}

		return (<div className="container">
				    <h1>ManyWho Service Checker</h1>

			    	<div className="row">

				    	<div className="col-sm-9">

					    	<div>
					    		<button className="btn btn-default" onClick={this.onNew}>New</button>
					    		<button className="btn btn-default" onClick={this.onSave}>Save</button>
					    	</div>

						    <form>
						        <div className="form-group">
						            <label htmlFor="service-url">Service URL</label>
						            <input className="form-control" placeholder="Service URL" value={selectedService.url} onChange={this.onUrlChanged} />
						        </div>
						    </form>

						    <div className="row">
						    	<ConfigurationValues />
						    	<Actions onTest={this.onTestAction} />
						    	<Types />
						    </div>

					    </div>

					    <div className="col-sm-3">
					    	<ServiceList />
					    </div>

					</div>

					{ testActionModal }

				</div>);

	}

});
