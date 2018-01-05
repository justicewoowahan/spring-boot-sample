export const DatePicker = function (element, value) {
    let options = {
        locale: 'ko',
        enableTime: false
        // defaultDate: datetime
    };

    // flatpickr이 해당 속성을 사용해 충돌이 일어나서
    // 런타임에 해당 속성을 제거함
    let $element = $(element);
    $element.html('');
    let id = $element.attr('data-name');

    $element.append(`<input type="text" id=${id} name="${id}" class="form-control flatpickr flatpickr-input" readonly="readonly"/>`);

    element.removeAttribute('data-plugins');
    flatpickr(`#${id}`, options);
};