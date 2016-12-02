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
                        id: grocery.id,
                        userId: grocery.userId
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
                viewModel.push({name: grocery, id: data.id, userId: data.userId});
            });
    };

    viewModel.delete = (model) => {
        if(config.user.id != model.userId) {
            return Promise.reject("This user does not have access to this item.");
        }

        return fetch(config.apiUrl + "items/" + model.id, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(handleErrors)
        .then(function () {
            let index = viewModel.indexOf(model);
            viewModel.splice(index, 1);
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