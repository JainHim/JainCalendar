import { describe, it, expect } from 'vitest';
import { enrichJainEvent, isFastingEvent } from '../src/rules';
import { ValidatedJainEvent } from '../src/types';

describe('RulesEngine - Dynamic Fasting & Reminder Trigger Logic', () => {
  it('should identify fasting events dynamically based on keywords and Parv category', () => {
    expect(isFastingEvent('Das Lakshan Paryushan Prarambh (Uttam Kshama)', 'Festival', 'Festival')).toBe(true);
    expect(isFastingEvent('Anant Chaturdashi (Das Lakshan Samapt)', 'Festival', 'Festival')).toBe(true);
    expect(isFastingEvent('Krishna Ashtami', 'Ashtami', 'Parv')).toBe(true);
    expect(isFastingEvent('Rohini Vrat', 'Vrat', 'Festival')).toBe(true);
    expect(isFastingEvent('Shree Parshvanath Bhagwan', 'Moksha Kalyanak', 'Kalyanak')).toBe(false);
  });

  it('should dynamically schedule Das Lakshan Paryushan Prarambh reminder at 12:00 PM Noon 1 day prior', () => {
    const event: ValidatedJainEvent = {
      title: 'Das Lakshan Paryushan Prarambh (Uttam Kshama)',
      sect: 'Digambar',
      category: 'Festival',
      tag: 'Festival',
      dateString: '2026-09-15',
      validationStatus: 'VALIDATED_ZERO_ERROR',
      sources: ['susjainmandir', 'digambar_reference']
    };

    const enriched = enrichJainEvent(event);

    expect(enriched.isFastingDay).toBe(true);
    expect(enriched.reminderTitle).toBe('Fasting Day Tomorrow: Das Lakshan Paryushan Prarambh (Uttam Kshama)');
    
    // Date of event: Sept 15, 2026. Reminder must trigger Sept 14, 2026 at 12:00:00 UTC
    expect(enriched.reminderTriggerDate.toISOString()).toBe('2026-09-14T12:00:00.000Z');
    expect(enriched.description).toContain('before sunset today');
  });

  it('should dynamically schedule Anant Chaturdashi reminder at 12:00 PM Noon 1 day prior', () => {
    const event: ValidatedJainEvent = {
      title: 'Anant Chaturdashi (Das Lakshan Samapt)',
      sect: 'Digambar',
      category: 'Festival',
      tag: 'Festival',
      dateString: '2026-09-25',
      validationStatus: 'VALIDATED_ZERO_ERROR',
      sources: ['susjainmandir', 'digambar_reference']
    };

    const enriched = enrichJainEvent(event);

    expect(enriched.isFastingDay).toBe(true);
    expect(enriched.reminderTriggerDate.toISOString()).toBe('2026-09-24T12:00:00.000Z');
  });

  it('should dynamically handle month boundaries for fasting days (e.g. event on 1st of month)', () => {
    const event: ValidatedJainEvent = {
      title: 'Krishna Ashtami',
      sect: 'Digambar',
      category: 'Parv',
      tag: 'Ashtami',
      dateString: '2026-06-01',
      validationStatus: 'VALIDATED_ZERO_ERROR',
      sources: ['susjainmandir', 'digambar_reference']
    };

    const enriched = enrichJainEvent(event);

    // Event on June 1 -> Reminder triggers on May 31 at 12:00:00 UTC
    expect(enriched.reminderTriggerDate.toISOString()).toBe('2026-05-31T12:00:00.000Z');
  });

  it('should schedule non-fasting Kalyanak events at 7:00 AM on the day of the event', () => {
    const event: ValidatedJainEvent = {
      title: 'Shree Parshvanath Bhagwan',
      sect: 'Digambar',
      category: 'Kalyanak',
      tag: 'Moksha Kalyanak',
      dateString: '2026-08-19',
      validationStatus: 'VALIDATED_ZERO_ERROR',
      sources: ['susjainmandir', 'digambar_reference']
    };

    const enriched = enrichJainEvent(event);

    expect(enriched.isFastingDay).toBe(false);
    expect(enriched.reminderTitle).toBe('Shree Parshvanath Bhagwan - Moksha Kalyanak');
    // Day of event: Aug 19, 2026 at 07:00:00 UTC
    expect(enriched.reminderTriggerDate.toISOString()).toBe('2026-08-19T07:00:00.000Z');
  });
});
