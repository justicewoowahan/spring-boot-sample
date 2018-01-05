export const Selectize = function (element, value) {

    $(element).selectize()[0].selectize.destroy();

    let selectedIndex = 0;
    let opts;

    if (Array.isArray(value)) {
        if (!value.length) {
            return;
        } else {
            opts = Array.from(value);
        }
    } else {
        if (typeof value === 'undefined') {
            return;
        } else {
            opts = Array.from([value]);
        }
    }

    element.innerHTML = '';

    for (const [index, opt] of opts.entries()) {
        let label, val;

        if (typeof opt === 'string') {
            label = opt;
            val = opt;
        } else {
            label = opt.label;
            val = opt.value;
        }

        if (!!opt.selected) {
            selectedIndex = index;
        }

        $(element).append(`<option value="${val}">${label}</option>`);
    }

    let target = $(element).data('target');

    console.log(`selectize: ${target}`);

    // flatpickr이 해당 속성을 사용해 충돌이 일어나서
    // 런타임에 해당 속성을 제거함

    ;
    $(element).children('option').eq(selectedIndex).attr('selected', 'selected');
    $(element).trigger('change');
    let selectize = $(element).selectize({
        sortField: 'text'
    });
    selectize.on('change',function(){
        let $target = $('#' + target);
        $target.val($(element).val());
        let val= $target.val();
        $target.keyup();
        console.log(`onChange selectize ${val}`);
        console.log($target);
    });
};