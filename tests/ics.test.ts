import { describe, it, expect } from 'vitest';
import { ICalendarExporter } from '../src/exporters/ics';
import { enrichJainEvent } from '../src/rules';
import { ValidatedJainEvent } from '../src/types';

describe('ICalendarExporter', () => {
  const exporter = new ICalendarExporter();

  it('should generate valid RFC 5545 iCalendar content with 12:00 PM Noon alarm trigger', () => {
    const rawEvent: ValidatedJainEvent = {
      title: 'Das Lakshan Paryushan Prarambh (Uttam Kshama)',
      sect: 'Digambar',
      category: 'Festival',
      tag: 'Festival',
      dateString: '2026-09-15',
      validationStatus: 'VALIDATED_ZERO_ERROR',
      sources: ['susjainmandir', 'digambar_reference']
    };

    const enriched = enrichJainEvent(rawEvent);
    const icsContent = exporter.generateICS([enriched]);

    expect(icsContent).toContain('BEGIN:VCALENDAR');
    expect(icsContent).toContain('SUMMARY:Fasting Day Tomorrow: Das Lakshan Paryushan Prarambh (Uttam Kshama)');
    expect(icsContent).toContain('BEGIN:VALARM');
    // Alarm trigger must be Sept 14 at 12:00:00 UTC
    expect(icsContent).toContain('TRIGGER;VALUE=DATE-TIME:20260914T120000Z');
    expect(icsContent).toContain('END:VCALENDAR');
  });
});
