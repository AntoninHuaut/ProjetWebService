import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude, Expose } from 'class-transformer';
import { IsNotEmpty, IsString } from "class-validator";

@Entity()
@Exclude()
export class User {

    @PrimaryGeneratedColumn()
    @Expose()
    id: number;

    @Column()
    @IsString()
    @Expose()
    userName: string;

    @Column()
    @IsNotEmpty()
    @IsString()
    password: string;

    constructor(partial: Partial<User>) {
        Object.assign(this, partial);
    }
}