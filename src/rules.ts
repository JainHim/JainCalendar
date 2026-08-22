import { ValidatedJainEvent, EnrichedCalendarEvent } from './types';

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

/**
 * Transforms a ValidatedJainEvent into user-facing calendar events.
 * Fasting days produce TWO clean events:
 *   1. Timed Meal Prep Reminder Event on (Day - 1) from 12:00 PM to 12:30 PM UTC
 *   2. All-Day Fasting Event on (Day of Event)
 *
 * Kalyanak events produce TWO clean events:
 *   1. Timed Temple Visit Reminder Event on (Day - 1) from 8:00 PM to 8:30 PM UTC
 *   2. All-Day Kalyanak Event on (Day of Event)
 */
export function enrichJainEvent(event: ValidatedJainEvent): EnrichedCalendarEvent[] {
  const isFasting = isFastingEvent(event.title, event.tag, event.category);
  const isKalyanak = event.category === 'Kalyanak' || event.tag.toLowerCase().includes('kalyanak');

  const [yearStr, monthStr, dayStr] = event.dateString.split('-');
  const year = parseInt(yearStr, 10);
  const month = parseInt(monthStr, 10);
  const day = parseInt(dayStr, 10);

  const results: EnrichedCalendarEvent[] = [];

  if (isFasting) {
    // 1. Timed Meal Prep Reminder Event on (Day - 1) from 12:00 PM to 12:30 PM UTC
    const prepStartDate = new Date(Date.UTC(year, month - 1, day - 1, 12, 0, 0));
    const prepEndDate = new Date(Date.UTC(year, month - 1, day - 1, 12, 30, 0));
    const prepDateStr = prepStartDate.toISOString().substring(0, 10);

    const prepDescription = [
      `🔔 Meal Preparation Notice`,
      ``,
      `Upcoming Fast: ${event.title}`,
      `Fasting Date: ${event.dateString}`,
      `Tradition: Digambar Jain`,
      ``,
      `Guidance:`,
      `Please complete grocery shopping, cooking, and meal preparation before sunset today for tomorrow's Upvas / Ekasana / Chauvihar.`
    ].join('\n');

    results.push({
      ...event,
      uid: `jain-cal-${year}-${event.category.toLowerCase()}-${slugify(event.title)}-prep-${prepDateStr}`,
      isFastingDay: true,
      isPrepReminder: true,
      eventTitle: `🔔 Meal Prep Reminder: ${event.title} Fast Tomorrow`,
      eventStartDate: prepStartDate,
      eventEndDate: prepEndDate,
      isAllDay: false,
      description: prepDescription
    });

    // 2. All-Day Fasting Day Event on the event date itself
    const fastStartDate = new Date(Date.UTC(year, month - 1, day, 0, 0, 0));
    const fastEndDate = new Date(Date.UTC(year, month - 1, day, 0, 0, 0));

    const fastDescription = [
      `🪷 Digambar Jain Fasting Day`,
      ``,
      `Event: ${event.title}`,
      `Date: ${event.dateString}`,
      `Tradition: Digambar Jain`,
      ``,
      `Today is a sacred fasting day (${event.tag}). Wishing you a peaceful and spiritually enriching day.`
    ].join('\n');

    results.push({
      ...event,
      uid: `jain-cal-${year}-${event.category.toLowerCase()}-${slugify(event.title)}-fast-${event.dateString}`,
      isFastingDay: true,
      isPrepReminder: false,
      eventTitle: `🪷 ${event.title} (Fasting Day)`,
      eventStartDate: fastStartDate,
      eventEndDate: fastEndDate,
      isAllDay: true,
      description: fastDescription
    });
  } else if (isKalyanak) {
    // 1. Timed Temple Visit Reminder Event on (Day - 1) at 8:00 PM to 8:30 PM UTC
    const templePrepStartDate = new Date(Date.UTC(year, month - 1, day - 1, 20, 0, 0));
    const templePrepEndDate = new Date(Date.UTC(year, month - 1, day - 1, 20, 30, 0));
    const templePrepDateStr = templePrepStartDate.toISOString().substring(0, 10);

    const templeDescription = [
      `🪔 Temple Visit Reminder`,
      ``,
      `Tirthankara: ${event.title}`,
      `Occasion: ${event.tag}`,
      `Kalyanak Date: ${event.dateString}`,
      `Tradition: Digambar Jain`,
      ``,
      `Guidance:`,
      `Tomorrow is the auspicious ${event.tag} of ${event.title}. Please plan your visit to the Jain Temple (Jinendra Darshan / Pujan / Abhishek) tomorrow morning.`
    ].join('\n');

    results.push({
      ...event,
      uid: `jain-cal-${year}-${event.category.toLowerCase()}-${slugify(event.title)}-temple-${templePrepDateStr}`,
      isFastingDay: false,
      isPrepReminder: true,
      eventTitle: `🪔 Temple Visit Reminder: ${event.title} ${event.tag} Tomorrow`,
      eventStartDate: templePrepStartDate,
      eventEndDate: templePrepEndDate,
      isAllDay: false,
      description: templeDescription
    });

    // 2. All-Day Kalyanak Event on the event date itself
    const kalyanakStartDate = new Date(Date.UTC(year, month - 1, day, 0, 0, 0));
    const kalyanakEndDate = new Date(Date.UTC(year, month - 1, day, 0, 0, 0));

    const kalyanakDescription = [
      `🪷 Digambar Jain Kalyanak Notice`,
      ``,
      `Tirthankara: ${event.title}`,
      `Occasion: ${event.tag}`,
      `Date: ${event.dateString}`,
      `Tradition: Digambar Jain`,
      ``,
      `Today is the auspicious ${event.tag} of ${event.title}. Wishing you a blessed Jinendra Darshan and Pujan.`
    ].join('\n');

    results.push({
      ...event,
      uid: `jain-cal-${year}-${event.category.toLowerCase()}-${slugify(event.title)}-${event.dateString}`,
      isFastingDay: false,
      isPrepReminder: false,
      eventTitle: `🪷 ${event.title} (${event.tag})`,
      eventStartDate: kalyanakStartDate,
      eventEndDate: kalyanakEndDate,
      isAllDay: true,
      description: kalyanakDescription
    });
  } else {
    // Other Festival events (All-Day on event date)
    const startDate = new Date(Date.UTC(year, month - 1, day, 0, 0, 0));
    const endDate = new Date(Date.UTC(year, month - 1, day, 0, 0, 0));

    const description = [
      `🪷 Digambar Jain Event Notice`,
      ``,
      `Event: ${event.title}`,
      `Occasion: ${event.tag}`,
      `Date: ${event.dateString}`,
      `Tradition: Digambar Jain`
    ].join('\n');

    results.push({
      ...event,
      uid: `jain-cal-${year}-${event.category.toLowerCase()}-${slugify(event.title)}-${event.dateString}`,
      isFastingDay: false,
      isPrepReminder: false,
      eventTitle: `🪷 ${event.title} (${event.tag})`,
      eventStartDate: startDate,
      eventEndDate: endDate,
      isAllDay: true,
      description
    });
  }

  return results;
}
