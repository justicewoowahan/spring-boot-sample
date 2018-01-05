export const textArea = function(element, value) {
    let rows = $(element).attr("rows");
    let cols = $(element).attr("cols");
    element.innerHTML = `<textarea placeholder="${value}" rows="${rows}" cols="${cols}" class="form-control">`;
};
