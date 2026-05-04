/**
 * event-bus Tests
 */

import { event-bus } from '../index';
import { EventBus } from '../index';

describe('event-bus', () => {
  let instance: any;

  beforeEach(() => {
    // Initialize instance based on component type
    instance = new EventBus({});
  });

  test('should initialize', () => {
    expect(instance).toBeDefined();
  });

  test('should have basic functionality', () => {
    expect(typeof instance).toBe('object');
  });
});
