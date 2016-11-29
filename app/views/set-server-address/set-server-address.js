let config = require("../../shared/config");
let thisPage = require("../set-server-address/set-server-address");
let view = require("ui/core/view");
let observableModule = require("data/observable");
let frameModule = require("ui/frame");

//Variables
let context = new observableModule.Observable();
const protocols = ["http", "https"];

exports.loaded = (args) => {
    let page = args.object;
    context.protocols = protocols;
    context.protocol = config.protocol;
    context.url = config.url;
    context.portnumber = config.portnumber;
    page.bindingContext = context;
};

exports.goToPortnumber = () => {
    portnumberTextField.focus();
};

exports.accept = () => {
    config.apiUrl = protocols[context.protocol] + '://' + (context.url || "localhost") + ':' + (context.portnumber || 80) + '/';
    frameModule.topmost().navigate("views/login/login");
};

