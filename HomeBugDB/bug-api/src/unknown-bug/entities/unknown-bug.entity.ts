import { Comment } from "src/comment/entities/comment.entity";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class UnknownBug {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User)
    user: User;

    @Column()
    picture_url: string;

    @Column()
    description: string;

    @Column()
    color: string;

    @Column()
    size: string;

    @Column()
    wings: boolean;

    @Column()
    legs: number;

    @OneToMany(() => Comment, comment => comment.ubug)
    comments: Comment[];



}
