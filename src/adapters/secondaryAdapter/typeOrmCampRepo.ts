import { Camp } from "../../core/entity";
import { CampRepositoryPort } from "../../core/ports";
import { AppDataSource } from "../database/data-source";
import { v4 as uuidv4 } from "uuid";
import { turnToWhereClause } from "./utils";

export class TypeOrmCampRepository implements CampRepositoryPort {
    private campRepository = AppDataSource.getRepository(Camp);

    async findAll(queryParams: Partial<Camp>): Promise<Camp[]> {
        return await this.campRepository.findBy(turnToWhereClause(queryParams));
    }

    async findOne(queryParams: Partial<Camp>): Promise<Camp | undefined> {
        const camp = await this.campRepository.findOne({
            where: turnToWhereClause(queryParams),
        });
        return camp || undefined;
    }

    async createCamp(campData: Omit<Camp, "id">): Promise<Camp> {
        const newCamp = this.campRepository.create({
            ...campData,
            id: uuidv4(),
            createdAt: new Date(),
            updatedAt: new Date(),
        });
        return await this.campRepository.save(newCamp);
    }

    async updateCamp(
        id: string,
        campData: Omit<Partial<Camp>, "id">
    ): Promise<Camp | undefined> {
        const campToUpdate = await this.campRepository.findOne({
            where: { id },
        });

        if (!campToUpdate) {
            return undefined;
        }

        const updatedCamp = {
            ...campToUpdate,
            ...campData,
            updatedAt: new Date(),
        };

        return await this.campRepository.save(updatedCamp);
    }

    async deleteCamp(id: string): Promise<boolean> {
        const result = await this.campRepository.delete(id);
        return result.affected ? result.affected > 0 : false;
    }
}
