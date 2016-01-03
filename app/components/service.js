import React from 'react';
import { Input, Button, Modal } from 'react-bootstrap';
import Provides from './provides.js';
import ConfigurationValues from './configuration-values.js';
import Types from './types.js';
import Type from './type.js';
import TypeTest from './type-test.js';
import Actions from './actions.js';
import Action from './action.js';
import ActionTest from './action-test.js';
import State from '../state.js';
import Model from '../model.js';

class Service extends React.Component {

    static propTypes = {
        service: React.PropTypes.object,
        editor: React.PropTypes.object
    }

    constructor(props) {
        super(props);
        this.onNameChange = this.onNameChange.bind(this);
        this.onUriChange = this.onUriChange.bind(this);
        this.onRefresh = this.onRefresh.bind(this);
        this.onRefreshWithConfigurationValues = this.onRefreshWithConfigurationValues.bind(this);
        this.onConfigurationValueChange = this.onConfigurationValueChange.bind(this);
        this.onViewType = this.onViewType.bind(this);
        this.onTestType = this.onTestType.bind(this);
        this.onViewAction = this.onViewAction.bind(this);
        this.onTestAction = this.onTestAction.bind(this);
        this.closeEditor = this.closeEditor.bind(this);
    }

    shouldComponentUpdate(nextProps) {
		return nextProps.service !== this.props.service || nextProps.editor !== this.props.editor;
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
        Model.trigger('service:refresh', this.props.service, false);
    }

    onRefreshWithConfigurationValues() {
        Model.trigger('service:refresh', this.props.service, true);
    }

    onViewType(type) {
        this.props.editor.set(this.props.service.id, { kind: 'TYPE', name: type.developerName });
    }

    onTestType(type) {
        this.props.editor.set(this.props.service.id, { kind: 'TYPE-TEST', name: type.developerName });
    }

    onViewAction(action) {
        this.props.editor.set(this.props.service.id, { kind: 'ACTION', uri: action.uri });
    }

    onTestAction(action) {
        this.props.editor.set(this.props.service.id, { kind: 'ACTION-TEST', uri: action.uri });
    }

    closeEditor() {
        this.props.editor.set(this.props.service.id, null);
    }

    render() {
        if (!this.props.service) {
            return <div className="service"></div>;
        }

        let editor = null;

        if (this.props.editor && this.props.editor[this.props.service.id]) {
            switch (this.props.editor[this.props.service.id].kind.toUpperCase()) {
                case 'TYPE':
                    editor = <Type type={this.props.service.types.filter((type) => type.developerName === this.props.editor[this.props.service.id].name)[0]} onClose={this.closeEditor} container={this} />
                    break;

                case 'TYPE-TEST':
                    editor = <TypeTest type={this.props.service.types.filter((type) => type.developerName === this.props.editor[this.props.service.id].name)[0]} onClose={this.closeEditor} container={this} />
                    break;

                case 'ACTION':
                    editor = <Action action={this.props.service.actions.filter((action) => action.uri === this.props.editor[this.props.service.id].uri)[0]} onClose={this.closeEditor} container={this} />
                    break;

                case 'ACTION-TEST':
                    editor = <ActionTest action={this.props.service.actions.filter((action) => action.uri === this.props.editor[this.props.service.id].uri)[0]} onClose={this.closeEditor} container={this} />
                    break;
            }
        }

        return (<div className="service modal-container">
            <Input type="text" label="Name" value={this.props.service.name} onChange={this.onNameChange} />
            <Input type="text" label="Uri" value={this.props.service.uri} onChange={this.onUriChange} />
            <Button bsStyle="info" onClick={this.onRefresh}>Refresh</Button>
            <Button bsStyle="primary" onClick={this.onRefreshWithConfigurationValues}>Refresh with Configuration Values</Button>
            <Provides service={this.props.service} />
            <ConfigurationValues values={this.props.service.configurationValues} onChange={this.onConfigurationValueChange}/>
            <Types types={this.props.service.types} onView={this.onViewType} onTest={this.onTestType}/>
            <Actions actions={this.props.service.actions} onView={this.onViewAction} onTest={this.onTestAction} />
            {editor}
        </div>);
    }
}

export default Service;
