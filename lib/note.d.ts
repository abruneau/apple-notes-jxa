export declare function notes(): Promise<Note[]>;
export declare class Note {
    id: string;
    name: string;
    body: string;
    creationDate: Date;
    modificationDate: Date;
    constructor(object?: any);
    create(folderId: string): Promise<Note>;
    update(): Promise<Note>;
    delete(): Promise<any>;
}
