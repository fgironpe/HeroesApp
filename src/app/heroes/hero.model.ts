export class Hero {
    public id: number;
    public name: string;
    public alterEgo: string;
    public description: string;
    public imageUrl: string;
    public imageAlt: string;
    public universe: string;
    public author: string;
    public year: number;

    constructor( 
        id: number,
        name: string,
        alterEgo: string,
        description: string,
        imageUrl: string,
        imageAlt: string,
        universe: string,
        author: string,
        year: number
    ) {
        this.id = id;
        this.name = name;
        this.alterEgo = alterEgo;
        this.description = description;
        this.imageUrl = imageUrl;
        this.imageAlt = imageAlt;
        this.universe = universe;
        this.author = author;
        this.year = year;
    }
}