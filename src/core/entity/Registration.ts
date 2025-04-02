import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from "typeorm";
import { User } from "./User";
import { Camp } from "./Camp";

@Entity()
export class Registration {
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @ManyToOne(() => User, {
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    })
    user!: User;

    @ManyToOne(() => Camp, {
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    })
    camp!: Camp;

    @Column("simple-json")
    dayAvailability!: { [dayId: string]: boolean };

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;
}
