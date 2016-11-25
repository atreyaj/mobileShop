let frameModule = require("ui/frame");
let UserViewModel = require("../../shared/view-models/user-view-model");
let model = new UserViewModel();
let dialogsModule = require("ui/dialogs");

exports.loaded = (args) => {
    let page = args.object;
    page.bindingContext = model;
};

exports.signIn = () => {
    model.login().catch(function (error) {
        dialogsModule.alert({
            message: "Unfortunately we could not find your account.",
            okButtonText: "OK"
        });
        return Promise.reject();
    }).then(function () {
        frameModule.topmost().navigate("views/list/list");
    });
};

exports.register = () => {
    let topmost = frameModule.topmost();
    topmost.navigate("views/register/register");
};