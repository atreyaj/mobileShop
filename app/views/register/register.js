let dialogsModule = require("ui/dialogs");
let frameModule = require("ui/frame");

let UserViewModel = require("../../shared/view-models/user-view-model");
let user = new UserViewModel();

exports.loaded = function(args) {
    let page = args.object;
    page.bindingContext = user;
};

function completeRegistration() {
    user.register()
        .then(() => {
            dialogsModule
                .alert("Your account was successfully created.")
                .then(function() {
                    frameModule.topmost().navigate("views/login/login");
                });
        }).catch((error) => {
            console.log(error);
            dialogsModule
                .alert({
                    message: "Unfortunately we were unable to create your account.",
                    okButtonText: "OK"
                });
        });
}

exports.register = function() {
    if (user.isValidEmail()) {
        completeRegistration();
    } else {
        dialogsModule.alert({
            message: "Enter a valid email address.",
            okButtonText: "OK"
        });
    }
};