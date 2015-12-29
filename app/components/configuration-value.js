import React from 'react';
import DateTime from 'react-datetime';
import ContentEditor from './content-editor.js';
import JsonEditor from './json-editor.js';

class ConfigurationValue extends React.Component {

    static propTypes = {
        onChange: React.PropTypes.func,
        value: React.PropTypes.any
    }

    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.onDateTimeChange = this.onDateTimeChange.bind(this);
        this.onEditorChange = this.onEditorChange.bind(this);
    }

    onChange(e) {
        this.props.onChange(this.props.value.developerName, e.target.value);
    }

    onDateTimeChange(dateTime) {
        this.props.onChange(this.props.value.developerName, dateTime.toISOString());
    }

    onEditorChange(value) {
        this.props.onChange(this.props.value.developerName, value);
    }

    render() {
        if (this.props.value) {
            switch (this.props.value.contentType.toUpperCase()) {
                case 'CONTENTSTRING':
                    return <input key={this.props.value.developerName} onChange={this.onChange} value={this.props.value.contentValue} className="form-control" type="text" />;
                case 'CONTENTNUMBER':
                    return <input key={this.props.value.developerName} onChange={this.onChange} value={this.props.value.contentValue} className="form-control" type="number" />;
                case 'CONTENTPASSWORD':
                    return <input key={this.props.value.developerName} onChange={this.onChange} value={this.props.value.contentValue} className="form-control" type="password" />;
                case 'CONTENTBOOLEAN':
                    return <input key={this.props.value.developerName} onChange={this.onChange} value={this.props.value.contentValue} className="form-control" type="boolean" />;
                case 'CONTENTDATETIME':
                    return <DateTime key={this.props.value.developerName} onDateTimeChange={this.onChange} value={this.props.value.contentValue} />;
                case 'CONTENTCONTENT':
                   return <ContentEditor key={this.props.value.developerName} name={this.props.value.developerName} value={this.props.value.contentValue} onSave={this.onEditorChange} />
               case 'CONTENTOBJECT':
               case 'CONTENTLIST':
                  return <JsonEditor key={this.props.value.developerName} name={this.props.value.developerName} value={this.props.value.contentValue} onSave={this.onEditorChange} />
            }
        }

        return null;
    }
}

export default ConfigurationValue;
