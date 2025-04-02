import { CampDay } from "../../core/entity";
import { CampDayRepositoryPort } from "../../core/ports";
import { AppDataSource } from "../database/data-source";
import { v4 as uuidv4 } from 'uuid';
import { turnToWhereClause } from "./utils";

export class TypeOrmCampDayRepository implements CampDayRepositoryPort {
    private campDayRepository = AppDataSource.getRepository(CampDay);

    async findAll(queryParams: Partial<CampDay>): Promise<CampDay[]> {
        return await this.campDayRepository.findBy(turnToWhereClause(queryParams));
    }

    async findOne(queryParams: Partial<CampDay>): Promise<CampDay | undefined> {
        const campDay = await this.campDayRepository.findOne({
            where: turnToWhereClause(queryParams),
        });
        return campDay || undefined;
    }

    async findByCampId(campId: string): Promise<CampDay[]> {
        return await this.campDayRepository.find({
            where: { camp: { id: campId } },
            relations: ["camp"]
        });
    }

    async createCampDay(campDay: Omit<CampDay, 'id'>): Promise<CampDay> {
        const newCampDay = this.campDayRepository.create({
            ...campDay,
            id: uuidv4()
        });
        return await this.campDayRepository.save(newCampDay);
    }

    async updateCampDay(id: string, campDayData: Omit<Partial<CampDay>, 'id'>): Promise<CampDay | undefined> {
        const campDayToUpdate = await this.campDayRepository.findOne({
            where: { id }
        });

        if (!campDayToUpdate) {
            return undefined;
        }

        const updatedCampDay = {
            ...campDayToUpdate,
            ...campDayData,
            updatedAt: new Date()
        };

        return await this.campDayRepository.save(updatedCampDay);
    }

    async deleteCampDay(id: string): Promise<boolean> {
        const result = await this.campDayRepository.delete(id);
        return result.affected ? result.affected > 0 : false;
    }
}