import { describe, it, expect } from 'vitest';
import { CrossValidationEngine } from '../src/validator';
import { RawJainEvent } from '../src/types';

describe('CrossValidationEngine', () => {
  const engine = new CrossValidationEngine();

  it('should mark events as VALIDATED_ZERO_ERROR when dates match across providers', () => {
    const primary: RawJainEvent[] = [
      { title: 'Krishna Ashtami', sect: 'Digambar', category: 'Parv', tag: 'Ashtami', day: 6, month: 8, year: 2026, source: 'susjainmandir' }
    ];
    const secondary: RawJainEvent[] = [
      { title: 'Krishna Ashtami', sect: 'Digambar', category: 'Parv', tag: 'Ashtami', day: 6, month: 8, year: 2026, source: 'digambar_reference' }
    ];

    const results = engine.validateEvents(primary, secondary);
    expect(results).toHaveLength(1);
    expect(results[0].validationStatus).toBe('VALIDATED_ZERO_ERROR');
    expect(results[0].dateString).toBe('2026-08-06');
    expect(results[0].sources).toEqual(['susjainmandir', 'digambar_reference']);
  });

  it('should flag DISCREPANCY when event dates differ between providers', () => {
    const primary: RawJainEvent[] = [
      { title: 'Krishna Ashtami', sect: 'Digambar', category: 'Parv', tag: 'Ashtami', day: 6, month: 8, year: 2026, source: 'susjainmandir' }
    ];
    const secondary: RawJainEvent[] = [
      { title: 'Krishna Ashtami', sect: 'Digambar', category: 'Parv', tag: 'Ashtami', day: 7, month: 8, year: 2026, source: 'digambar_reference' }
    ];

    const results = engine.validateEvents(primary, secondary);
    expect(results).toHaveLength(1);
    expect(results[0].validationStatus).toBe('DISCREPANCY');
    expect(results[0].mismatchDetails).toContain('susjainmandir says 2026-08-06, but digambar_reference says 2026-08-07');
  });

  it('should mark events as UNVALIDATED_SINGLE_SOURCE when secondary provider lacks the event', () => {
    const primary: RawJainEvent[] = [
      { title: 'Local Temple Festival', sect: 'Digambar', category: 'Festival', tag: 'Festival', day: 15, month: 8, year: 2026, source: 'susjainmandir' }
    ];
    const secondary: RawJainEvent[] = [];

    const results = engine.validateEvents(primary, secondary);
    expect(results).toHaveLength(1);
    expect(results[0].validationStatus).toBe('UNVALIDATED_SINGLE_SOURCE');
  });
});
