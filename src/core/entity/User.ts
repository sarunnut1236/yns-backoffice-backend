import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

export enum UserRole {
    ADMIN = '2',
    JOINER = '1',
    GUEST = '0'
}

export enum Region {
    BKK = 'BKK',
    EAST = 'EAST',
    CEN = 'CEN',
    PARI = 'PARI'
}

@Entity()
export class User {
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Column({ nullable: true })
    firstname?: string;

    @Column({ nullable: true })
    surname?: string;

    @Column({ nullable: true })
    nickname?: string;

    @Column({ nullable: true })
    email?: string;

    @Column({ nullable: true })
    phone?: string;

    @Column({ type: "enum", enum: UserRole, default: UserRole.GUEST })
    role!: UserRole;

    @Column({ type: "enum", enum: Region, nullable: true })
    region?: Region;

    @Column({ nullable: true })
    joinedAt?: Date;

    @Column({ nullable: true })
    profileImage?: string;

    @Column({ nullable: true })
    birthdate?: Date;

    @Column({ nullable: true })
    lineId?: string;

    @Column({ nullable: true })
    foodAllergy?: string;

    @Column({ nullable: true })
    personalMedicalCondition?: string;

    @Column({ nullable: true })
    bio?: string;

    @Column({ nullable: true })
    title?: string;

    @Column({ nullable: true })
    memberCode?: string;

    @Column()
    liffUserId!: string;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;
}

