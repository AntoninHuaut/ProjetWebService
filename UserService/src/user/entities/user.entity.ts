import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';
import {Exclude, Expose} from 'class-transformer';
import {IsNotEmpty, IsString} from "class-validator";
import {UserRole} from "../enum/userrole.enum";

@Entity()
@Exclude()
export class User {

    @PrimaryGeneratedColumn()
    @Expose()
    id: number;

    @Column({
        unique: true
    })
    @IsString()
    @Expose()
    userName: string;

    @Column()
    @IsNotEmpty()
    @IsString()
    password: string;

    @Column()
    @Expose()
    role: UserRole;

    @Column({
        type: 'text',
        unique: true,
        nullable: true,
    })
    token: string;

    constructor(partial: Partial<User>) {
        Object.assign(this, partial);
    }
}