import supertest from 'supertest';
import StatusCodes from 'http-status-codes';
import { SuperTest, Test } from 'supertest';
import app from '@server';

describe('book-route', () => {
    const { OK } = StatusCodes;
    let agent: SuperTest<Test>;
    beforeAll((done) => {
        agent = supertest.agent(app);
        done();
    });
    describe('GET: /api/books', () => {
        it('should be return empty arrary', async () => {
            const res = await agent.get('/api/books');
            expect(res.header['content-type']).toBe('application/json; charset=utf-8');
            expect(res.statusCode).toBe(OK);
            expect(res.body.data).toEqual([]);
            expect(res.body.totalCount).toEqual(0);
        });
    });
});
