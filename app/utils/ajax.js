export const CheckStatus = function(response) {
    if (response.status >= 200 && response.status < 300) {
        return response;
    } else {
        const error = new Error(response.statusText);
        error.response = response;
        throw error
    }
};

export const Parse = function(response) {
    return response && response.json();
};

export const ParseText = function(response) {
    return response && response.text();
};
