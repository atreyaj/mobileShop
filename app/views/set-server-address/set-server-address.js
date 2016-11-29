let config = require("../../shared/config");
let thisPage = require("../set-server-address/set-server-address");
let view = require("ui/core/view");
let observable = require("data/observable");
let frameModule = require("ui/frame");

//Variables
let portnumberTextField;

exports.loaded = (args) => {
    let page = args.object, context = observable;
    context.protocols = ["http", "https"];
    context.protocol = config.protocol;
    context.url = config.url;
    context.portnumber = config.portnumber;
    page.bindingContext = context;
    portnumberTextField = view.getViewById(page, "portnumber");

};

exports.goToPortnumber = () => {
    portnumberTextField.focus();
};

exports.accept = () => {
    frameModule.topmost().navigate("views/login/login");
};

