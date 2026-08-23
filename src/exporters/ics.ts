import { EnrichedCalendarEvent } from '../types';

export function formatICalDate(date: Date): string {
  const pad = (n: number) => String(n).padStart(2, '0');
  const year = date.getUTCFullYear();
  const month = pad(date.getUTCMonth() + 1);
  const day = pad(date.getUTCDate());
  const hours = pad(date.getUTCHours());
  const minutes = pad(date.getUTCMinutes());
  const seconds = pad(date.getUTCSeconds());
  return `${year}${month}${day}T${hours}${minutes}${seconds}Z`;
}

export function formatICalValue(text: string): string {
  return text
    .replace(/\\/g, '\\\\')
    .replace(/;/g, '\\;')
    .replace(/,/g, '\\,')
    .replace(/\n/g, '\\n');
}

/**
 * RFC 5545 Section 3.1 Content Line Folding:
 * Content lines SHOULD NOT be longer than 75 octets, excluding line breaks.
 * Long lines are folded by inserting a CRLF immediately followed by a single space.
 */
export function foldICalLine(line: string): string {
  const maxLength = 75;
  if (line.length <= maxLength) return line;

  let result = '';
  let current = line;

  while (current.length > maxLength) {
    result += current.substring(0, maxLength) + '\r\n ';
    current = current.substring(maxLength);
  }
  result += current;
  return result;
}

export class ICalendarExporter {
  generateICS(events: EnrichedCalendarEvent[]): string {
    const rawLines: string[] = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Jainism Community//Digambar Jain Calendar Sync CLI//EN',
      'CALSCALE:GREGORIAN',
      'METHOD:PUBLISH',
      'X-WR-CALNAME:Digambar Jain Calendar 2026',
      'X-WR-TIMEZONE:UTC'
    ];

    for (const ev of events) {
      const dtStartStr = formatICalDate(ev.eventStartDate);
      const dtEndStr = formatICalDate(ev.eventEndDate);

      if (ev.isAllDay) {
        rawLines.push(
          'BEGIN:VEVENT',
          `UID:${ev.uid}`,
          `DTSTAMP:${dtStartStr}`,
          `DTSTART;VALUE=DATE:${dtStartStr.substring(0, 8)}`,
          `DTEND;VALUE=DATE:${dtEndStr.substring(0, 8)}`,
          `SUMMARY:${formatICalValue(ev.eventTitle)}`,
          `DESCRIPTION:${formatICalValue(ev.description)}`,
          `CATEGORIES:Digambar Jain,${ev.category}`,
          'END:VEVENT'
        );
      } else {
        // Timed Meal Prep or Temple Visit Reminder Event
        rawLines.push(
          'BEGIN:VEVENT',
          `UID:${ev.uid}`,
          `DTSTAMP:${dtStartStr}`,
          `DTSTART:${dtStartStr}`,
          `DTEND:${dtEndStr}`,
          `SUMMARY:${formatICalValue(ev.eventTitle)}`,
          `DESCRIPTION:${formatICalValue(ev.description)}`,
          `CATEGORIES:Digambar Jain,Reminder`,
          'BEGIN:VALARM',
          'ACTION:DISPLAY',
          `DESCRIPTION:${formatICalValue(ev.eventTitle)}`,
          'TRIGGER:-PT0M',
          'END:VALARM',
          'END:VEVENT'
        );
      }
    }

    rawLines.push('END:VCALENDAR');

    // Fold all lines strictly according to RFC 5545 (<= 75 octets per line)
    const foldedLines = rawLines.map(line => foldICalLine(line));
    return foldedLines.join('\r\n');
  }
}
