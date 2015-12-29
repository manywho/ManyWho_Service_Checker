import alt from '../alt.js';
import ServiceSource from '../source/service.js';

class ServiceActions {

    setLoading() {
        return true;
    }

    metadata(uri, configurationValues) {
        this.setLoading();

        return (dispatch) => {
            ServiceSource.metadata(uri, configurationValues)
                .then((response) => dispatch(response))
                .catch((response) => this.onError(response));
        }
    }

    onError(response) {
        return response;
    }

}

export default alt.createActions(ServiceActions);
