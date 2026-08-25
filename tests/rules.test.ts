import { describe, it, expect } from 'vitest';
import { enrichJainEvent, isFastingEvent } from '../src/rules';
import { ValidatedJainEvent } from '../src/types';

describe('RulesEngine - Dual-Event & Clean Formatting', () => {
  it('should identify fasting events dynamically based on keywords and Parv category', () => {
    expect(isFastingEvent('Das Lakshan Paryushan Prarambh (Uttam Kshama)', 'Festival', 'Festival')).toBe(true);
    expect(isFastingEvent('Anant Chaturdashi (Das Lakshan Samapt)', 'Festival', 'Festival')).toBe(true);
    expect(isFastingEvent('Shukla Chaturdashi', 'Chaturdashi', 'Parv')).toBe(true);
    expect(isFastingEvent('Shree Parshvanath Bhagwan', 'Moksha Kalyanak', 'Kalyanak')).toBe(false);
    expect(isFastingEvent('Shree Anantnath Bhagwan', 'Garbh Kalyanak', 'Kalyanak')).toBe(false);
    expect(isFastingEvent('Shree Munisuvrat Bhagwan', 'Moksha Kalyanak', 'Kalyanak')).toBe(false);
  });

  it('should generate TWO distinct events for fasting days: 2:00 PM IST Meal Prep Reminder & All-Day Fasting Event', () => {
    const event: ValidatedJainEvent = {
      title: 'Shukla Chaturdashi',
      sect: 'Digambar',
      category: 'Parv',
      tag: 'Chaturdashi',
      dateString: '2026-08-27',
      validationStatus: 'VALIDATED_ZERO_ERROR',
      sources: ['susjainmandir', 'digambar_reference']
    };

    const enrichedList = enrichJainEvent(event);
    expect(enrichedList).toHaveLength(2);

    const [prepEvent, fastEvent] = enrichedList;

    // 1. Meal Prep Reminder Event on Wednesday Aug 26 at 2:00 PM IST (08:30:00 UTC)
    expect(prepEvent.isPrepReminder).toBe(true);
    expect(prepEvent.isAllDay).toBe(false);
    expect(prepEvent.eventTitle).toBe('🔔 Meal Prep Reminder: Shukla Chaturdashi Fast Tomorrow');
    expect(prepEvent.eventStartDate.toISOString()).toBe('2026-08-26T08:30:00.000Z');
    expect(prepEvent.eventEndDate.toISOString()).toBe('2026-08-26T09:00:00.000Z');
    expect(prepEvent.description).toContain('Complete grocery buying and cooking');

    // 2. Fasting Day Event on Thursday Aug 27 (All Day)
    expect(fastEvent.isPrepReminder).toBe(false);
    expect(fastEvent.isAllDay).toBe(true);
    expect(fastEvent.eventTitle).toBe('🪷 Shukla Chaturdashi (Fasting Day)');
    expect(fastEvent.eventStartDate.toISOString()).toBe('2026-08-27T00:00:00.000Z');
    expect(fastEvent.description).toContain('Today is a sacred fasting day');
  });

  it('should generate TWO distinct events for Kalyanak events: 8:00 PM IST Temple Visit Reminder & All-Day Kalyanak Event', () => {
    const event: ValidatedJainEvent = {
      title: 'Shree Parshvanath Bhagwan',
      sect: 'Digambar',
      category: 'Kalyanak',
      tag: 'Moksha Kalyanak',
      dateString: '2026-08-19',
      validationStatus: 'VALIDATED_ZERO_ERROR',
      sources: ['susjainmandir', 'digambar_reference']
    };

    const enrichedList = enrichJainEvent(event);
    expect(enrichedList).toHaveLength(2);

    const [templePrepEvent, kalyanakEvent] = enrichedList;

    // 1. Temple Visit Reminder Event on Aug 18 at 8:00 PM IST (14:30:00 UTC)
    expect(templePrepEvent.isPrepReminder).toBe(true);
    expect(templePrepEvent.isAllDay).toBe(false);
    expect(templePrepEvent.eventTitle).toBe('🪔 Temple Visit Reminder: Shree Parshvanath Bhagwan Moksha Kalyanak Tomorrow');
    expect(templePrepEvent.eventStartDate.toISOString()).toBe('2026-08-18T14:30:00.000Z');
    expect(templePrepEvent.eventEndDate.toISOString()).toBe('2026-08-18T15:00:00.000Z');
    expect(templePrepEvent.description).toContain('Plan your Jain Temple visit');

    // 2. All-Day Kalyanak Event on Aug 19
    expect(kalyanakEvent.isAllDay).toBe(true);
    expect(kalyanakEvent.eventTitle).toBe('🪷 Shree Parshvanath Bhagwan (Moksha Kalyanak)');
    expect(kalyanakEvent.eventStartDate.toISOString()).toBe('2026-08-19T00:00:00.000Z');
  });
});
