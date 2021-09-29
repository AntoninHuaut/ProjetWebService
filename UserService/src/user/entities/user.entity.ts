import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude } from 'class-transformer';
import { IsNotEmpty, IsEmail, MinLength, MaxLength, Min, Max, IsNumber, IsString } from "class-validator";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @IsNotEmpty()
    @IsString()
    userName: string;

    @Column({ select: false })
    @IsNotEmpty()
    @IsString()
    @Exclude({ toPlainOnly: true })
    password: string;

}