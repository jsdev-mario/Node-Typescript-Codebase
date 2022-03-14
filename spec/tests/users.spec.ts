import supertest from 'supertest';
import StatusCodes from 'http-status-codes';
import { SuperTest, Test, Response } from 'supertest';
import app from '@server';

describe('route-test', () => {
    const { BAD_REQUEST, CREATED, OK } = StatusCodes;
    let agent: SuperTest<Test>;
    beforeAll((done) => {
        agent = supertest.agent(app);
        done();
    });
    describe('fake test', () => {
        it('should be ok', () => {
            const result = 127;
            expect(result).toBe(127);
        });
    });
});
