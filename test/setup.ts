import connection, { migrate } from "../src/database/connection";

export const mochaHooks = {
    async beforeAll(): Promise<void> {
        await migrate();
    },

    async afterAll(): Promise<void> {
        await connection.destroy();
    },
}