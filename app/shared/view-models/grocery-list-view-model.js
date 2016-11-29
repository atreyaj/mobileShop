let config = require("../../shared/config");
let ObservableArray = require("data/observable-array").ObservableArray;

function GroceryListViewModel(items) {
    let viewModel = new ObservableArray(items);

    viewModel.load = function () {
        return fetch(config.apiUrl + "users/" + config.user.id + "/items")
            .then(handleErrors)
            .then(function (response) {
                return response.json();
            }).then(function (data) {
                data.forEach(function (grocery) {
                    viewModel.push({
                        name: grocery.name,
                        id: grocery.id
                    });
                });
            });
    };

    viewModel.empty = function () {
        while (viewModel.length) {
            viewModel.pop();
        }
    };

    viewModel.add = (grocery) => {
        return fetch(config.apiUrl + "users/" + config.user.id + "/items", {
            method: "POST",
            body: JSON.stringify({
                name: grocery
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(handleErrors)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                viewModel.push({name: grocery, id: data.id});
            });
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

module.exports = GroceryListViewModel;