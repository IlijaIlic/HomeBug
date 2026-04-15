import { Region } from "@region/entities/region.entity";
import { Taxonomy } from "@taxonomy/entities/taxonomy.entity";
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class KnownBug {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    common_name: string;

    @Column()
    latin_name: string;

    @Column("simple-array")
    picture_urls: string[];

    @ManyToMany(() => Region)
    @JoinTable()
    regions: Region[];

    @Column("simple-array")
    habitats: string[];

    @OneToOne(() => Taxonomy)
    @JoinColumn()
    taxonomy: Taxonomy

    @Column()
    no_legs: number;

    @Column()
    body_type: string;

    @Column()
    color: string;

    @Column()
    size: string;

    @Column()
    wings: boolean;

    @Column()
    diet: string;

    @Column()
    danger_to_humans: boolean;

    @Column()
    behaviour: string;

    @Column()
    venomous: boolean;

    @Column()
    bites: boolean;

    @Column()
    stings: boolean;

    @Column()
    overview: string;

}
