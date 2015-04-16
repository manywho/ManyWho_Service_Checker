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

    onUrlChanged: function(e) {

        this.setState({
            url: e.target.value
        });

    },

    getInitialState: function() {

        return { url: this.props.service.url }

    },

    render: function() {

        var ConfigurationValues = manywho.configurationValues;
        var Actions = manywho.actions;
        var Types = manywho.types;

        return <div>

            <div className="form-group">
               <label>Url</label>
               <input type="text" className="form-control" value={this.state.url} onChange={this.onUrlChanged} />
            </div>

            <div>
                <button className="btn btn-primary" type="button" onClick={this.onSave}>Save</button>
                <button className="btn btn-info" type="button" onClick={this.onRefresh}>Refresh</button>
            </div>

            <div className="row">
                <div className="col-sm-7">
                    <ConfigurationValues service={this.props.service}/>
                    <Types service={this.props.service}/>
                </div>
                <div className="col-sm-5">
                    <Actions service={this.props.service}/>
                </div>
            </div>

        </div>

    }

});