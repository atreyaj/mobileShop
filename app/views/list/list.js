let dialogsModule = require("ui/dialogs");
let observableModule = require("data/observable");
let GroceryListViewModel = require("../../shared/view-models/grocery-list-view-model");
let page;
let groceryList = new GroceryListViewModel([]);
let socialShare = require("nativescript-social-share");

let pageData = new observableModule.fromObject({
    groceryList: groceryList,
    grocery: "",
    isLoading: true
});

exports.add = function() {
    // Check for empty submissions
    if (pageData.get("grocery").trim() === "") {
        dialogsModule.alert({
            message: "Enter a grocery item",
            okButtonText: "OK"
        });
        return;
    }

    // Dismiss the keyboard
    page.getViewById("grocery").dismissSoftInput();
    groceryList.add(pageData.get("grocery"))
        .catch(function() {
            dialogsModule.alert({
                message: "An error occurred while adding an item to your list.",
                okButtonText: "OK"
            });
        });

    // Empty the input field
    pageData.set("grocery", "");
};

exports.share = function() {
    let list = [];
    for (let i = 0, size = groceryList.length; i < size ; i++) {
        list.push(groceryList.getItem(i).name);
    }
    let listString = list.join(", ").trim();
    socialShare.shareText(listString);
};

exports.loaded = function(args) {
    page = args.object;
    page.bindingContext = pageData;
    let listView = page.getViewById('groceryList');

    groceryList.empty();
    groceryList.load().then(() => {
        pageData.isLoading = false;
        listView.animate({
            opacity: 1,
            duration: 1500
        });
    });
};