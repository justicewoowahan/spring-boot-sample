/*global toastr LE*/

export const onFailGlobal = function(error) {
    if ($('.spinner').length > 0) $('.spinner').remove();
    if ($('.ladda-button').length > 0) Ladda.stopAll();

    const href = window.location.href;
    const service = !!~href.indexOf('localhost') ? 'localhost' : window.location.href.split('//')[1].split('.')[0];

    let errorResponse = error.response || {};
    let errorTitle =  errorResponse.code || errorResponse.error || error.statusText || 'ERROR';
    let errorMessage = errorResponse.message || errorResponse.error || error.status || '오류가 발생하였습니다.';

    // toastr.error(errorMessage, errorTitle);
    if (error.status == 401)  window.location.href = '/login';
};

export const onSuccessGlobal = function(res) {
    this.finish(res);
};

export const requestPreprocess = function(url, options, request) {
    if (typeof options == 'function') {
        request = options;
        options = {};
    }

    if (typeof request != 'function') {
        throw new Error('XHR 객체를 할당해야 합니다.');
    }

    let defaultOptions = {
        contentType: 'application/json; charset=UTF-8',
        dataType: 'json'
    };

    request.call(this, url, Object.assign(defaultOptions, options));
};
