import Woowahan from "woowahan";
import Template from "./index.hbs";

export default Woowahan.View.create('DefaultLayout', {
  template: Template,

  initialize() {

    this.super();
  }
});