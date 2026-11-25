import { describe, test, beforeEach, expect } from 'vitest';
import { GenericResponseData } from '../shared-types';

describe('GenericResponseData', () => {
  const status = 200;
  const statusText = 'OK';
  const headers = { 'content-type': 'application/json' };
  const json = JSON.stringify({ key: 'value' });

  describe('with ArrayBuffer body', () => {
    const body = new TextEncoder().encode(json).buffer as ArrayBuffer;
    let response: GenericResponseData;

    beforeEach(() => {
      response = new GenericResponseData(status, statusText, headers, body);
    });

    test('should create an instance with correct properties', () => {
      expect(response.status).toBe(status);
      expect(response.statusText).toBe(statusText);
      expect(response.headers).toEqual(headers);
      expect(response.body).toEqual(body);
    });

    test('json() should parse body as JSON', async () => {
      expect(await response.json()).toEqual({ key: 'value' });
    });

    test('text() should parse body as string', async () => {
      expect(await response.text()).toBe(json);
    });

    test('arrayBuffer() should return the ArrayBuffer body', async () => {
      expect(await response.arrayBuffer()).toBe(body);
    });

    test('blob() should wrap the ArrayBuffer body', async () => {
      const blob = await response.blob();
      expect(blob).toBeInstanceOf(Blob);
      expect(blob.type).toBe('application/json');
      expect(await blob.text()).toBe(json);
    });
  });

  describe('with Blob body', () => {
    const body = new Blob([json], { type: 'application/json' });
    let response: GenericResponseData;

    beforeEach(() => {
      response = new GenericResponseData(status, statusText, headers, body);
    });

    test('should create an instance with Blob body', () => {
      expect(response.body).toBe(body);
    });

    test('json() should parse Blob body as JSON', async () => {
      expect(await response.json()).toEqual({ key: 'value' });
    });

    test('text() should parse Blob body as string', async () => {
      expect(await response.text()).toBe(json);
    });

    test('arrayBuffer() should return bytes from the Blob', async () => {
      const buffer = await response.arrayBuffer();
      expect(new TextDecoder().decode(buffer)).toBe(json);
    });

    test('blob() should return the same Blob instance', async () => {
      expect(await response.blob()).toBe(body);
    });
  });
});
