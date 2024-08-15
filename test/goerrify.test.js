const { errify, errifyAll } = require('../src/index');

describe('goerrify', () => {
    describe('errify', () => {
        test('should return result and null for a resolved promise', async () => {
            const asyncFunc = () => Promise.resolve('success');
            const [result, err] = await errify(asyncFunc());
            expect(result).toBe('success');
            expect(err).toBeNull();
        });

        test('should return null and error for a rejected promise', async () => {
            const asyncFunc = () => Promise.reject(new Error('failure'));
            const [result, err] = await errify(asyncFunc());
            expect(result).toBeNull();
            expect(err).toEqual(new Error('failure'));
        });
    });

    describe('errifyAll', () => {
        test('should handle multiple resolved promises', async () => {
            const asyncFuncs = [
                () => Promise.resolve('result1'),
                () => Promise.resolve('result2'),
                () => Promise.resolve('result3')
            ];
            const results = await errifyAll(asyncFuncs.map(func => func()));
            expect(results).toEqual([
                ['result1', null],
                ['result2', null],
                ['result3', null]
            ]);
        });

        test('should handle multiple rejected promises', async () => {
            const asyncFuncs = [
                () => Promise.reject(new Error('error1')),
                () => Promise.reject(new Error('error2')),
                () => Promise.reject(new Error('error3'))
            ];
            const results = await errifyAll(asyncFuncs.map(func => func()));
            expect(results).toEqual([
                [null, new Error('error1')],
                [null, new Error('error2')],
                [null, new Error('error3')]
            ]);
        });

        test('should handle a mix of resolved and rejected promises', async () => {
            const asyncFuncs = [
                () => Promise.resolve('result1'),
                () => Promise.reject(new Error('error1')),
                () => Promise.resolve('result2'),
                () => Promise.reject(new Error('error2'))
            ];
            const results = await errifyAll(asyncFuncs.map(func => func()));
            expect(results).toEqual([
                ['result1', null],
                [null, new Error('error1')],
                ['result2', null],
                [null, new Error('error2')]
            ]);
        });

        test('should handle an empty array of promises', async () => {
            const results = await errifyAll([]);
            expect(results).toEqual([]);
        });
    });
});
