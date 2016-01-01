import React from 'react';
import { Input, Button } from 'react-bootstrap';
import Provides from './provides.js';
import ConfigurationValues from './configuration-values.js';
import Types from './types.js';
import Actions from './actions.js';
import State from '../state.js';

class Service extends React.Component {

    static propTypes = {
        service: React.PropTypes.object
    }

    constructor(props) {
        super(props);
        this.onNameChange = this.onNameChange.bind(this);
        this.onUriChange = this.onUriChange.bind(this);
        this.onRefresh = this.onRefresh.bind(this);
        this.onRefreshWithConfigurationValues = this.onRefreshWithConfigurationValues.bind(this);
        this.onConfigurationValueChange = this.onConfigurationValueChange.bind(this);
    }

    shouldComponentUpdate(nextProps) {
		return nextProps.service !== this.props.service;
	}

    onNameChange(e) {
        this.props.service.set('name', e.target.value);
    }

    onUriChange(e) {
        this.props.service.set('uri', e.target.value);
    }

    onConfigurationValueChange(name, value) {
        const index = this.props.service.configurationValues.map((item) => item.developerName).indexOf(name);
        const configurationValue = this.props.service.configurationValues[index].set({ contentValue: value });

        this.props.service.configurationValues.set(index, configurationValue);
    }

    onRefresh() {
        State.trigger('service:refresh', this.props.service, false);
    }

    onRefreshWithConfigurationValues() {
        State.trigger('service:refresh', this.props.service, true);
    }

    onViewType(type) {
        const state = State.get();
        state.set({ type });
    }

    onTestType(type) {

    }

    onViewAction(action) {
        const state = State.get();
        state.set({ action });
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
            <Types types={this.props.service.types} onView={this.onViewType} onTest={this.onTestType}/>
            <Actions actions={this.props.service.actions} onView={this.onViewAction}/>
        </div>);
    }
}

export default Service;
