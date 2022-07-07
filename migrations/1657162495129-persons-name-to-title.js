const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class personsNameToTitle1657162495129 {
    name = 'personsNameToTitle1657162495129'

    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "persons" RENAME COLUMN "name" TO "title"`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "persons" RENAME COLUMN "title" TO "name"`);
    }
}
