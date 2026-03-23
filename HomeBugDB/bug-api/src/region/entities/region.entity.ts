import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Region {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column("simple-array")
    coord: number[];

}
