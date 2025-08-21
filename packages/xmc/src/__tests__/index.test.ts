import { describe, it, expect, beforeEach, vi } from 'vitest';
import { XMC } from '../index';
import * as authoring from '../client-authoring/sdk.gen';
import * as content from '../client-content/sdk.gen';
import * as contentTransfer from '../client-content-transfer/sdk.gen';
import * as xmapp from '../client-xmapp/sdk.gen';

describe('XMC', () => {
    beforeEach(() => {
        // Reset all mocks before each test
        vi.resetAllMocks();
    });

    it('should throw an error for invalid operation format', () => {
        expect(() => XMC.invokeOperation('invalidOperation')).toThrow(
            "Invalid operation format: 'invalidOperation'. Expected format 'clientNamespace.operationName'."
        );
    });

    it('should throw an error for non-existent namespace', () => {
        expect(() => XMC.invokeOperation('nonExistentNamespace.operation')).toThrow(
            "Namespace 'nonExistentNamespace' not found"
        );
    });

    it('should throw an error for non-existent operation in a valid namespace', () => {
        expect(() => XMC.invokeOperation('authoring.nonExistentOperation')).toThrow(
            "Operation 'nonExistentOperation' not found in namespace 'authoring'"
        );
    });

    it('should invoke the correct operation in the authoring namespace', () => {
        const mockOperation = vi.fn();
        authoring['someOperation'] = mockOperation;

        XMC.invokeOperation('authoring.someOperation', 'arg1', 'arg2');

        expect(mockOperation).toHaveBeenCalledWith('arg1', 'arg2');
    });

    it('should invoke the correct operation in the content namespace', () => {
        const mockOperation = vi.fn();
        content['someOperation'] = mockOperation;

        XMC.invokeOperation('live.someOperation', 'arg1', 'arg2');

        expect(mockOperation).toHaveBeenCalledWith('arg1', 'arg2');
    });

    it('should invoke the correct operation in the contentTransfer namespace', () => {
        const mockOperation = vi.fn();
        contentTransfer['someOperation'] = mockOperation;

        XMC.invokeOperation('contentTransfer.someOperation', 'arg1', 'arg2');

        expect(mockOperation).toHaveBeenCalledWith('arg1', 'arg2');
    });

    it('should invoke the correct operation in the xmapp namespace', () => {
        const mockOperation = vi.fn();
        xmapp['someOperation'] = mockOperation;

        XMC.invokeOperation('xmapp.someOperation', 'arg1', 'arg2');

        expect(mockOperation).toHaveBeenCalledWith('arg1', 'arg2');
    });
});