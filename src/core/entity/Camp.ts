import {
    Column,
    CreateDateColumn,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from "typeorm";
import { CampDay } from "./CampDay";

@Entity()
export class Camp {
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Column()
    name!: string;

    @Column({ nullable: true })
    description?: string;

    @Column({ nullable: true })
    location?: string;

    @Column()
    startDate!: Date;

    @Column()
    endDate!: Date;

    @Column({ nullable: true })
    imageUrl?: string;

    @Column()
    ownerId!: string;

    @OneToMany(() => CampDay, (campDay) => campDay.camp, {
        cascade: true,
    })
    days?: CampDay[];

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;
}
