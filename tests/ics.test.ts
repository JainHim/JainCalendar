import { describe, it, expect } from 'vitest';
import { ICalendarExporter } from '../src/exporters/ics';
import { enrichJainEvent } from '../src/rules';
import { ValidatedJainEvent } from '../src/types';

describe('ICalendarExporter', () => {
  const exporter = new ICalendarExporter();

  it('should generate valid RFC 5545 iCalendar content for dual fasting events', () => {
    const rawEvent: ValidatedJainEvent = {
      title: 'Shukla Chaturdashi',
      sect: 'Digambar',
      category: 'Parv',
      tag: 'Chaturdashi',
      dateString: '2026-08-27',
      validationStatus: 'VALIDATED_ZERO_ERROR',
      sources: ['susjainmandir', 'digambar_reference']
    };

    const enrichedList = enrichJainEvent(rawEvent);
    const icsContent = exporter.generateICS(enrichedList);

    expect(icsContent).toContain('BEGIN:VCALENDAR');

    // 1. Check Timed 2:00 PM IST (08:30 UTC) Prep Reminder Event
    expect(icsContent).toContain('SUMMARY:🔔 Meal Prep Reminder: Shukla Chaturdashi Fast Tomorrow');
    expect(icsContent).toContain('DTSTART:20260826T083000Z');
    expect(icsContent).toContain('DTEND:20260826T090000Z');

    // 2. Check All-Day Fasting Event on Aug 27
    expect(icsContent).toContain('SUMMARY:🪷 Shukla Chaturdashi (Fasting Day)');
    expect(icsContent).toContain('DTSTART;VALUE=DATE:20260827');

    // Check no debug text in file
    expect(icsContent).not.toContain('VALIDATED_ZERO_ERROR');
    expect(icsContent).toContain('END:VCALENDAR');
  });
});
