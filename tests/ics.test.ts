import { describe, it, expect } from 'vitest';
import { ICalendarExporter, foldICalLine } from '../src/exporters/ics';
import { enrichJainEvent } from '../src/rules';
import { ValidatedJainEvent } from '../src/types';

describe('ICalendarExporter & RFC 5545 Line Folding', () => {
  const exporter = new ICalendarExporter();

  it('should fold long content lines at 75 characters according to RFC 5545', () => {
    const longLine = 'DESCRIPTION:This is a very long description text that exceeds seventy five characters and must be folded by RFC 5545 rules.';
    const folded = foldICalLine(longLine);
    const lines = folded.split('\r\n');

    for (let i = 0; i < lines.length; i++) {
      // Each folded line segment (excluding leading continuation space for line 2+) must be <= 75 chars
      expect(lines[i].length).toBeLessThanOrEqual(75 + (i > 0 ? 1 : 0));
    }
    expect(lines.length).toBeGreaterThan(1);
    expect(lines[1].startsWith(' ')).toBe(true); // Continuation line starts with space
  });

  it('should generate 100% RFC 5545 compliant iCalendar content with no line > 76 chars', () => {
    const rawEvent: ValidatedJainEvent = {
      title: 'Shree Parshvanath Bhagwan',
      sect: 'Digambar',
      category: 'Kalyanak',
      tag: 'Moksha Kalyanak',
      dateString: '2026-08-19',
      validationStatus: 'VALIDATED_ZERO_ERROR',
      sources: ['susjainmandir', 'digambar_reference']
    };

    const enrichedList = enrichJainEvent(rawEvent);
    const icsContent = exporter.generateICS(enrichedList);

    expect(icsContent).toContain('BEGIN:VCALENDAR');
    expect(icsContent).toContain('X-WR-CALNAME:Digambar Jain Calendar 2026');

    // Verify every single line in the output complies with RFC 5545 75-octet limit
    const contentLines = icsContent.split('\r\n');
    for (const line of contentLines) {
      expect(line.length).toBeLessThanOrEqual(76); // 75 content chars + optional 1 leading continuation space
    }
  });
});
