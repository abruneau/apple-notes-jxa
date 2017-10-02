export declare function notes(): Promise<Note[]>;
export declare class Note {
    id: string;
    name: string;
    body: string;
    creationDate: string;
    modificationDate: string;
    constructor(object?: any);
    update(): Promise<Note>;
    delete(): Promise<any>;
}
