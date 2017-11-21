import { Note } from "./note";
export declare function folders(): Promise<Folder[]>;
export declare class Folder {
    static find(name: string): Promise<Folder[]>;
    static create(name: string, accountName?: string): Promise<Folder>;
    id: string;
    name: string;
    constructor(object?: any);
    delete(): Promise<any>;
    notes(): Promise<Note[]>;
    findNote(name: string): Promise<Note>;
    createNote(name: string): Promise<Note>;
}
