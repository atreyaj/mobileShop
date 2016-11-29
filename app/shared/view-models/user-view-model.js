let config = require("../../shared/config");
let fetchModule = require("fetch");
let Observable = require("data/observable").Observable;
let validator = require("email-validator");
let http = require("http");

function User(info) {
    info = info || {};

    // You can add properties to observables on creation
    let viewModel = new Observable({
        email: info.email || "daniellarsen725@hotmail.com",
        password: info.password || "password"
    });

    viewModel.login = function() {
        return fetchModule.fetch(config.apiUrl + "users?username=" + viewModel.email + "&password=" + viewModel.password, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(handleErrors)
            .then(function(response) {
                return response.json();
            })
            .then(function (response) {
                return response[0];
            })
            .then(function(data) {
                config.user = data;
            });
    };

    viewModel.register = function() {
        return fetchModule.fetch(config.apiUrl + "users", {
            method: "POST",
            body: JSON.stringify({
                username: viewModel.get("email"),
                password: viewModel.get("password")
            }),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(handleErrors);
    };

    viewModel.isValidEmail = function() {
        let email = this.get("email");
        return validator.validate(email);
    };

    return viewModel;
}

function handleErrors(response) {
    if (!response.ok) {
        console.log(JSON.stringify(response));
        throw Error(response.statusText);
    }
    return response;
}

module.exports = User;