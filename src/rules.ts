import { ValidatedJainEvent, EnrichedCalendarEvent } from './types';

// Fasting keywords in Digambar tradition
const FASTING_KEYWORDS = [
  'ashtami',
  'chaturdashi',
  'vrat',
  'upvas',
  'das lakshan',
  'paryushan',
  'rohini',
  'sugandh dashami',
  'sola kaaran',
  'anant',
  'ratnatray',
  'ashtanika'
];

export function isFastingEvent(title: string, tag: string, category: string): boolean {
  if (category === 'Parv') return true;
  const text = `${title} ${tag}`.toLowerCase();
  return FASTING_KEYWORDS.some(keyword => text.includes(keyword));
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

export function enrichJainEvent(event: ValidatedJainEvent): EnrichedCalendarEvent {
  const isFasting = isFastingEvent(event.title, event.tag, event.category);
  
  // Parse dateString (YYYY-MM-DD)
  const [yearStr, monthStr, dayStr] = event.dateString.split('-');
  const year = parseInt(yearStr, 10);
  const month = parseInt(monthStr, 10);
  const day = parseInt(dayStr, 10);

  // All-day event start & end dates
  const eventStartDate = new Date(Date.UTC(year, month - 1, day));
  const eventEndDate = new Date(Date.UTC(year, month - 1, day));

  let reminderTriggerDate: Date;
  let reminderTitle: string;
  let description: string;

  if (isFasting) {
    // 12:00 PM Noon, 1 day PRIOR to the fasting event date
    reminderTriggerDate = new Date(Date.UTC(year, month - 1, day - 1, 12, 0, 0));

    reminderTitle = `Fasting Day Tomorrow: ${event.title}`;
    description = [
      `Digambar Jain Fasting Reminder:`,
      `Tomorrow (${event.dateString}) is ${event.title} (${event.tag}).`,
      ``,
      `Please complete meal preparation and grocery buying before sunset today for tomorrow's Upvas / Ekasana / Chauvihar.`,
      ``,
      `Tradition: ${event.sect}`,
      `Validation Status: ${event.validationStatus}`
    ].join('\n');
  } else {
    // 7:00 AM Morning of the event date
    reminderTriggerDate = new Date(Date.UTC(year, month - 1, day, 7, 0, 0));

    reminderTitle = `${event.title} - ${event.tag}`;
    description = [
      `Digambar Jain Event Notice:`,
      `Today is ${event.title} (${event.tag}).`,
      ``,
      `Tradition: ${event.sect}`,
      `Validation Status: ${event.validationStatus}`
    ].join('\n');
  }

  const uid = `jain-cal-${year}-${event.category.toLowerCase()}-${slugify(event.title)}-${event.dateString}`;

  return {
    ...event,
    uid,
    isFastingDay: isFasting,
    reminderTitle,
    reminderTriggerDate,
    eventStartDate,
    eventEndDate,
    description
  };
}
