import { Folder } from "./folder";
export declare function accounts(): Promise<Account[]>;
export declare class Account {
    static find(name: string): Promise<Account[]>;
    id: string;
    name: string;
    constructor(object?: any);
    folders(): Promise<Folder[]>;
    createFolder(name: string): Promise<Folder>;
}
