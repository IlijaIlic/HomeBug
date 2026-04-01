import { UnknownBug } from "src/unknown-bug/entities/unknown-bug.entity";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

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


}
