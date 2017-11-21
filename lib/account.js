"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var osa = require("osa2");
var folder_1 = require("./folder");
function accounts() {
    return osa(function () {
        var Notes = Application("Notes");
        return Notes.accounts().map(function (a) {
            return {
                id: a.id(),
                name: a.name(),
            };
        });
    })().then(function (accounts) {
        return accounts.map(function (a) { return new Account(a); });
    });
}
exports.accounts = accounts;
var Account = (function () {
    function Account(object) {
        this.id = object.id;
        this.name = object.name;
    }
    Account.find = function (name) {
        return osa(function (query) {
            var Notes = Application("Notes");
            var accounts = Notes.accounts.where({
                name: query,
            });
            if (!accounts.length) {
                throw new Error("Account " + query + " note found");
            }
            return accounts().map(function (a) {
                return {
                    id: a.id(),
                    name: a.name(),
                };
            });
        })(name).then(function (accounts) {
            return accounts.map(function (a) { return new Account(a); });
        });
    };
    Account.prototype.folders = function () {
        return osa(function (accountName) {
            var Notes = Application("Notes");
            Notes.accounts[accountName].folders().map(function (f) {
                return {
                    id: f.id(),
                    name: f.name(),
                };
            });
        })(this.name).then(function (folders) {
            return folders.map(function (f) { return new folder_1.Folder(f); });
        });
    };
    Account.prototype.createFolder = function (name) {
        return folder_1.Folder.create(name, this.name);
    };
    return Account;
}());
exports.Account = Account;
