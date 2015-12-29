import React from 'react';
import Container from './container.js';
import { supplyFluxContext } from 'alt-react';
import alt from '../alt.js';

class Root extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (<Container />);
    }

}

// export default Root;
export default supplyFluxContext(alt)(Root);
