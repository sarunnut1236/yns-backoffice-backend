import { Camp } from "../../core/entity";
import { CampRepositoryPort } from "../../core/ports";
import { AppDataSource } from "../database/data-source";
import { v4 as uuidv4 } from "uuid";

export class TypeOrmCampRepository implements CampRepositoryPort {
    private campRepository = AppDataSource.getRepository(Camp);

    async findAll(queryParams: Partial<Camp>): Promise<Camp[]> {
        const whereClause = Object.entries(queryParams).reduce(
            (acc, [key, value]) => {
                if (value !== undefined) {
                    acc[key] = value;
                }
                return acc;
            },
            {} as Record<string, any>
        );

        return await this.campRepository.findBy(whereClause);
    }

    async findById(id: string): Promise<Camp | undefined> {
        const camp = await this.campRepository.findOne({
            where: { id },
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
        campData: Partial<Camp>
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
