export const InputRadio = function(element, value) {
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

    var i=0;

    for (const [index, opt] of opts.entries()) {
        let label, val, name;

        if (typeof opt === 'string') {
            label = opt;
            val = opt;
            name = opt;
        } else {
            label = opt.label;
            val = opt.value;
            name = opt.name;

        }

        if (!!opt.selected) {
            selectedIndex = index;
        }

        let id = `${name}${i}`;
        if (index == 0) {
            $(element).append(`<label><input type="radio" id="${id}" name="${name}" value="${val}" checked="checked"> ${label}</label>`);
        } else {
            $(element).append(`<label><input type="radio" id="${id}" name="${name}" value="${val}"> ${label}</label>`);
        }
    }

};