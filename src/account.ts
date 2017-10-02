import * as osa from "osa2";

import { Folder } from "./folder";

declare const Application: any;

/**
 * List all accounts
 * @return      {Promise<Account[]>} List of Account
 */
export function accounts(): Promise<Account[]> {
  return osa(() => {
    const Notes = Application("Notes");

    return Notes.accounts().map((a) => {
      return {
        id: a.id(),
        name: a.name(),
      };
    });
  })().then((accounts) => {
    return accounts.map((a) => new Account(a));
  });
}

export class Account {

  /**
   * Find accounts by name
   * @param  {string}             name Name of the account
   * @return {Promise<Account[]>}      List off accounts with name matching your query
   */
  public static find(name: string): Promise<Account[]> {
    return osa((query) => {
      const Notes = Application("Notes");
      const accounts = Notes.accounts.where({
        name: query,
      });

      if (!accounts.length) {
        throw new Error(`Account ${query} note found`);
      }

      return accounts().map((a) => {
        return {
          id: a.id(),
          name: a.name(),
        };
      });
    })(name).then((accounts) => {
      return accounts.map((a) => new Account(a));
    });
  }

  public id: string;
  public name: string;

  constructor(object?: any) {
    this.id = object.id;
    this.name = object.name;
  }

  /**
   * List all folders in an account
   * @return {Promise<Folder[]>} List of folders
   */
  public folders(): Promise<Folder[]> {
    return osa((accountName) => {
      const Notes = Application("Notes");
      Notes.accounts[accountName].folders().map((f) => {
        return {
          id: f.id(),
          name: f.name(),
        };
      });
    })(this.name).then((folders) => {
      return folders.map((f) => new Folder(f));
    });
  }

  /**
   * Create a new Folder in this accountName
   * @param  {string}          name Name of the new folder
   * @return {Promise<Folder>}      The new Folder
   */
  public createFolder(name: string): Promise<Folder> {
    return Folder.create(name, this.name);
  }

}
