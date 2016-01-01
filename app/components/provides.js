import React from 'react';
import { Input } from 'react-bootstrap';

class Provides extends React.Component {

    static propTypes = {
        service: React.PropTypes.object
    }

    constructor(props) {
        super(props);
    }

    shouldComponentUpdate(nextProps) {
        return nextProps.service !== this.props.service;
    }

    render() {
        return (<div>
            <h3>Provides</h3>
            <div className="form-inline">
                <Input type="checkbox" label="Database" readOnly checked={this.props.service.providesDatabase} />
                <Input type="checkbox" label="Logic" readOnly checked={this.props.service.providesLogic} />
                <Input type="checkbox" label="Social" readOnly checked={this.props.service.providesSocial} />
                <Input type="checkbox" label="Identity" readOnly checked={this.props.service.providesIdentity} />
                <Input type="checkbox" label="Files" readOnly checked={this.props.service.providesFiles} />
                <Input type="checkbox" label="Views" readOnly checked={this.props.service.providesViews} />
            </div>
        </div>);
    }
}

export default Provides;
