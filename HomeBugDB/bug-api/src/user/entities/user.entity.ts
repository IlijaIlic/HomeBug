import { Comment } from "@comment/entities/comment.entity";
import { KnownBug } from "@known-bug/entities/known-bug.entity";
import { UnknownBug } from "@unknown-bug/entities/unknown-bug.entity";
import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    surname: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column({
        type: 'enum',
        enum: ['male', 'female']
    })
    gender: string;

    @Column()
    reputation: number;

    @Column()
    unknown_bugs_scanned: number;

    @Column()
    comments_helping_others: number;

    @Column()
    other_users_rated: number;

    @ManyToMany(() => KnownBug)
    @JoinTable()
    known_scans: KnownBug[];

    @OneToMany(() => UnknownBug, ubug => ubug.user)
    unknown_scans: UnknownBug[];

    @OneToMany(() => Comment, (comment) => comment.user)
    comments: Comment[];

    @ManyToMany(() => KnownBug)
    @JoinTable()
    saved_bugs: KnownBug[];

}
