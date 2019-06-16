export interface IWrittenThing {
    content: string;
    createdAt: string;
    updatedAt: string;
    writer: string; // TODO use id
}

export class Article implements IWrittenThing {
    id: number;
    titre: string;
    soustitre?: string;
    content: string;
    createdAt: string;
    updatedAt: string;
    writer: string; // TODO use id
    categorieId: number;
    categorie: Categorie;
    comments: Comment[];
    selected: boolean;
    img: string;
}

export class Categorie {
    id: number;
    name: string;
    cssColor: string;
}

export class Writer {
    id: number;
    name: string;
}

export class Comment implements IWrittenThing {
    id: number;
    content: string;
    createdAt: string;
    updatedAt: string;
    writer: string;
    articleId: number;
}
