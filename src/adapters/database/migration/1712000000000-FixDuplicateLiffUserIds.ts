import { MigrationInterface, QueryRunner } from "typeorm";

export class FixDuplicateLiffUserIds1712000000000 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        // First, find duplicate liffUserIds
        const duplicates = await queryRunner.query(`
            SELECT "liffUserId", COUNT(*)
            FROM "user"
            GROUP BY "liffUserId"
            HAVING COUNT(*) > 1
        `);

        // If there are duplicates, handle them
        if (duplicates.length > 0) {
            console.log(`Found ${duplicates.length} duplicate liffUserId groups`);
            
            // For each duplicate group, update all but one record to make them unique
            for (const duplicate of duplicates) {
                const liffUserId = duplicate.liffUserId;
                
                // Get all users with this liffUserId
                const users = await queryRunner.query(`
                    SELECT "id", "liffUserId" 
                    FROM "user" 
                    WHERE "liffUserId" = $1
                `, [liffUserId]);
                
                // Keep the first one as is, update the rest
                for (let i = 1; i < users.length; i++) {
                    const userId = users[i].id;
                    const newLiffUserId = `${liffUserId}_${i}`;
                    
                    await queryRunner.query(`
                        UPDATE "user"
                        SET "liffUserId" = $1
                        WHERE "id" = $2
                    `, [newLiffUserId, userId]);
                    
                    console.log(`Updated user ${userId} liffUserId to ${newLiffUserId}`);
                }
            }
        }

        // Now it's safe to add the unique constraint
        try {
            await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "UQ_liffUserId" UNIQUE ("liffUserId")`);
            console.log("Successfully added unique constraint to liffUserId");
        } catch (error) {
            console.error("Failed to add unique constraint:", error);
            throw error;
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Remove the unique constraint
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "UQ_liffUserId"`);
    }
}