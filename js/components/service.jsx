manywho.service = React.createClass({

    onSave: function() {

        this.props.service.url = this.state.url;
        manywho.services.save(this.props.service);

        this.onRefresh();

    },

    onRefresh: function() {

        manywho.services.update(this.props.service)
            .then(function() { manywho.services.render() });

    },

    onDelete: function() {

        manywho.services.delete(this.props.service);
        manywho.services.render();

    },

    onUrlChanged: function(e) {

        this.setState({
            url: e.target.value
        });

    },

    getInitialState: function() {

        return { url: this.props.service.url }

    },

    componentWillReceiveProps: function(nextProps) {

        this.setState({ url: nextProps.service.url });

    },

    render: function() {

        var ConfigurationValues = manywho.configurationValues;
        var Actions = manywho.actions;
        var Types = manywho.types;
        var Provides = manywho.provides;

        return <div>

            <div className="form-group">
               <label>Url</label>
               <input type="text" className="form-control" value={this.state.url} onChange={this.onUrlChanged} />
            </div>

            <div className="service-buttons">
                <button className="btn btn-primary" type="button" onClick={ this.onSave }>Save</button>
                <button className="btn btn-info" type="button" onClick={ this.onRefresh }>Refresh</button>
                <button className="btn btn-danger" type="button" onClick={ this.onDelete }>Delete</button>
            </div>

            <div className="row">
                <div className="col-sm-7">
                    <Provides service={ this.props.service } />
                    <ConfigurationValues service={ this.props.service }/>
                    <Types service={ this.props.service }/>
                </div>
                <div className="col-sm-5">
                    <Actions service={ this.props.service }/>
                </div>
            </div>

        </div>

    }

});
