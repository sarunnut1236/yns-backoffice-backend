import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from "typeorm";
import { Camp } from "./Camp";

@Entity()
export class CampDay {
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Column()
    dayNumber!: number;

    @Column()
    date!: Date;

    @Column("simple-array", { nullable: true })
    activities?: string[];

    @ManyToOne(() => Camp, (camp) => camp.days, {
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    })
    camp!: Camp;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;
}
