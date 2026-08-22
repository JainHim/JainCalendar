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

export class ICalendarExporter {
  generateICS(events: EnrichedCalendarEvent[]): string {
    const lines: string[] = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Jainism Community//Digambar Jain Calendar Sync CLI//EN',
      'CALSCALE:GREGORIAN',
      'METHOD:PUBLISH',
      'X-WR-CALNAME:Digambar Jain Calendar & Fasting Reminders',
      'X-WR-TIMEZONE:UTC'
    ];

    for (const ev of events) {
      const dtStartStr = formatICalDate(ev.eventStartDate);
      const dtEndStr = formatICalDate(ev.eventEndDate);
      const alarmTriggerStr = formatICalDate(ev.reminderTriggerDate);

      lines.push(
        'BEGIN:VEVENT',
        `UID:${ev.uid}`,
        `DTSTAMP:${dtStartStr}`,
        `DTSTART;VALUE=DATE:${dtStartStr.substring(0, 8)}`,
        `DTEND;VALUE=DATE:${dtEndStr.substring(0, 8)}`,
        `SUMMARY:${formatICalValue(ev.reminderTitle)}`,
        `DESCRIPTION:${formatICalValue(ev.description)}`,
        `CATEGORIES:Digambar Jain,${ev.category}`,
        `X-JAIN-SECT:${ev.sect}`,
        `X-JAIN-VALIDATION:${ev.validationStatus}`,
        'BEGIN:VALARM',
        'ACTION:DISPLAY',
        `DESCRIPTION:${formatICalValue(ev.reminderTitle)}`,
        `TRIGGER;VALUE=DATE-TIME:${alarmTriggerStr}`,
        'END:VALARM',
        'END:VEVENT'
      );
    }

    lines.push('END:VCALENDAR');
    return lines.join('\r\n');
  }
}
