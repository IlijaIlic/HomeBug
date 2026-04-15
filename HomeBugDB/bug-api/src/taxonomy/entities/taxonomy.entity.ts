import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Taxonomy {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    taxonomyClass: string;
    
    @Column()
    order: string;

    @Column()
    family: string;

    @Column()
    genus: string;

    @Column()
    species: string;    
}
