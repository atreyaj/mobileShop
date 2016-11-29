let frameModule = require("ui/frame");
let UserViewModel = require("../../shared/view-models/user-view-model");
let model = new UserViewModel();
let dialogsModule = require("ui/dialogs");
let observable = require("data/observable");
let view = require("ui/core/view");
let thisWindow = require("../login/login"); //This is messed up T_T

//Variables
let passwordTextField, usernameTextField;

exports.loaded = (args) => {
    let page = args.object;
    page.bindingContext = model;
    passwordTextField = view.getViewById(page, "password");
    usernameTextField = view.getViewById(page, "username");
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

exports.goToPassword = (args) => {
    passwordTextField.focus();
};

exports.callSignIn = (args) => {
    if(usernameTextField.text && passwordTextField.text) {
        thisWindow.signIn();
    }
};

