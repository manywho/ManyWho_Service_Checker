import React from 'react';
import { Input, Button } from 'react-bootstrap';
import Provides from './provides.js';
import ConfigurationValues from './configuration-values.js';
import Types from './types.js';
import Actions from './actions.js';
import ServiceActions from '../action/service.js';
import ServicesActions from '../action/services.js';
import TypeActions from '../action/type.js';
import ActionActions from '../action/action.js';

class Service extends React.Component {

    static propTypes = {
        onEdit: React.PropTypes.func,
        service: React.PropTypes.any
    }

    constructor(props) {
        super(props);
        this.onNameChange = this.onNameChange.bind(this);
        this.onUriChange = this.onUriChange.bind(this);
        this.onRefresh = this.onRefresh.bind(this);
        this.onRefreshWithConfigurationValues = this.onRefreshWithConfigurationValues.bind(this);
        this.onConfigurationValueChange = this.onConfigurationValueChange.bind(this);
    }

    onNameChange(e) {
        const service = this.props.service;
        service.name = e.target.value;
        this.props.onEdit(service);
    }

    onUriChange(e) {
        const service = this.props.service;
        service.uri = e.target.value;
        this.props.onEdit(service);
    }

    onConfigurationValueChange(name, value) {
        const configurationValue = this.props.service.configurationValues.get(name);
        configurationValue.contentValue = value;

        const service = this.props.service;
        service.configurationValues = service.configurationValues.set(name, configurationValue);
        this.props.onEdit(service);
    }

    onRefresh() {
        ServiceActions.metadata(this.props.service.uri);
    }

    onRefreshWithConfigurationValues() {
        ServiceActions.metadata(this.props.service.uri, this.props.service.configurationValues);
    }

    onViewType(type) {
        TypeActions.view(type);
    }

    onViewAction(action) {
        ActionActions.view(action);
    }

    render() {
        if (!this.props.service) {
            return <div className="service"></div>;
        }

        return (<div className="service">
            <Input type="text" label="Name" value={this.props.service.name} onChange={this.onNameChange} />
            <Input type="text" label="Uri" value={this.props.service.uri} onChange={this.onUriChange} />
            <Button bsStyle="info" onClick={this.onRefresh}>Refresh</Button>
            <Button bsStyle="primary" onClick={this.onRefreshWithConfigurationValues}>Refresh with Configuration Values</Button>
            <Provides service={this.props.service} />
            <ConfigurationValues values={this.props.service.configurationValues} onChange={this.onConfigurationValueChange}/>
            <Types types={this.props.service.types} onView={this.onViewType}/>
            <Actions actions={this.props.service.actions} onView={this.onViewAction}/>
        </div>);
    }
}

export default Service;
