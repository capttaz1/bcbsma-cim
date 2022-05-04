import assert from 'assert';
import { describe, it } from 'jest';
import Container from 'typedi';

describe('Step Service', () => {
    it('Returns a ping', async () => {
        // Arrange
        const stepService = Container.get('StepService');

        // Act
        const actual = await stepService.ping();
        const expected = 'OK';

        // Assert
        assert(expected === actual, 'The Step Service ping returned "OK"');
    });
});
