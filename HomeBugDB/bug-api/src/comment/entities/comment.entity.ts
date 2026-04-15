import { UnknownBug } from "@unknown-bug/entities/unknown-bug.entity";
import { User } from "@user/entities/user.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Rating } from "../../rating/entities/rating.entity";

@Entity()
export class Comment {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, {
        onDelete: 'CASCADE'
    })
    user: User;

    @ManyToOne(() => UnknownBug, bug => bug.comments, {
        onDelete: 'CASCADE'
    })
    ubug: UnknownBug;

    @Column()
    text: string;

    @Column({ default: 0 })
    rating: number;

    @OneToMany(() => Rating, rating => rating.comment)
    ratings: Rating[];


}
