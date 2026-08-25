import { ValidatedJainEvent, EnrichedCalendarEvent } from './types';
import { findTirthankara } from './data/tirthankaras';

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
  if (category === 'Kalyanak' || tag.toLowerCase().includes('kalyanak')) return false;
  const text = `${title} ${tag}`.toLowerCase();
  return FASTING_KEYWORDS.some(keyword => {
    const regex = new RegExp(`\\b${keyword}\\b`, 'i');
    return regex.test(text);
  });
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

/**
 * Transforms a ValidatedJainEvent into rich user-facing calendar events.
 *
 * Fasting days produce TWO clean events:
 *   1. Timed Meal Prep Reminder Event on (Day - 1) at 2:00 PM IST (08:30 UTC)
 *   2. All-Day Fasting Event on (Day of Event)
 *
 * Kalyanak events produce TWO rich events:
 *   1. Timed Temple Visit Reminder Event on (Day - 1) at 8:00 PM IST (14:30 UTC)
 *   2. All-Day Kalyanak Event on (Day of Event) enriched with compact Tirthankara metadata.
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
    // 1. Timed Meal Prep Reminder Event on (Day - 1) at 2:00 PM IST (08:30 UTC)
    const prepStartDate = new Date(Date.UTC(year, month - 1, day - 1, 8, 30, 0));
    const prepEndDate = new Date(Date.UTC(year, month - 1, day - 1, 9, 0, 0));
    const prepDateStr = prepStartDate.toISOString().substring(0, 10);

    const prepDescription = [
      `🔔 Fasting Meal Prep Reminder: ${event.title}`,
      `Complete grocery buying and cooking before sunset today for tomorrow's Upvas / Ekasana / Chauvihar.`
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
      `🪷 Digambar Jain Fasting Day (${event.title})`,
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
    const tirthankara = findTirthankara(event.title);

    // 1. Timed Temple Visit Reminder Event on (Day - 1) at 8:00 PM IST (14:30 UTC)
    const templePrepStartDate = new Date(Date.UTC(year, month - 1, day - 1, 14, 30, 0));
    const templePrepEndDate = new Date(Date.UTC(year, month - 1, day - 1, 15, 0, 0));
    const templePrepDateStr = templePrepStartDate.toISOString().substring(0, 10);

    const templeLines = [
      `🪔 Temple Visit Reminder: ${event.title} ${event.tag}`
    ];

    if (tirthankara) {
      templeLines.push(
        `• Symbol: ${tirthankara.symbol} | Parents: ${tirthankara.mother} & ${tirthankara.father}`,
        `• Birthplace: ${tirthankara.birthplace} | Moksha: ${tirthankara.mokshaPlace}`
      );
    }

    templeLines.push(
      `Plan your Jain Temple visit (Jinendra Abhishek / Pujan) tomorrow morning.`
    );

    results.push({
      ...event,
      uid: `jain-cal-${year}-${event.category.toLowerCase()}-${slugify(event.title)}-temple-${templePrepDateStr}`,
      isFastingDay: false,
      isPrepReminder: true,
      eventTitle: `🪔 Temple Visit Reminder: ${event.title} ${event.tag} Tomorrow`,
      eventStartDate: templePrepStartDate,
      eventEndDate: templePrepEndDate,
      isAllDay: false,
      description: templeLines.join('\n')
    });

    // 2. All-Day Kalyanak Event on the event date itself
    const kalyanakStartDate = new Date(Date.UTC(year, month - 1, day, 0, 0, 0));
    const kalyanakEndDate = new Date(Date.UTC(year, month - 1, day, 0, 0, 0));

    const kalyanakLines = [
      `🪷 Digambar Jain Kalyanak: ${event.title} (${event.tag})`
    ];

    if (tirthankara) {
      kalyanakLines.push(
        `• Tirthankara #: ${tirthankara.number} of 24 | Symbol: ${tirthankara.symbol}`,
        `• Parents: ${tirthankara.mother} & ${tirthankara.father}`,
        `• Birthplace: ${tirthankara.birthplace} | Moksha: ${tirthankara.mokshaPlace}`,
        `• Pujan: Jinendra Abhishek & ${event.title} Pujan Arghya`,
        `• Stotra: ${tirthankara.stotra} | Jaap: "${tirthankara.jaapMantra}"`,
        `• Evening: 5-Deepak Jinendra Aarti & Mangal Diyo`
      );
    } else {
      kalyanakLines.push(
        `Today is the auspicious ${event.tag} of ${event.title}. Wishing you a blessed Jinendra Darshan.`
      );
    }

    results.push({
      ...event,
      uid: `jain-cal-${year}-${event.category.toLowerCase()}-${slugify(event.title)}-${event.dateString}`,
      isFastingDay: false,
      isPrepReminder: false,
      eventTitle: `🪷 ${event.title} (${event.tag})`,
      eventStartDate: kalyanakStartDate,
      eventEndDate: kalyanakEndDate,
      isAllDay: true,
      description: kalyanakLines.join('\n')
    });
  } else {
    // Other Festival events
    const startDate = new Date(Date.UTC(year, month - 1, day, 0, 0, 0));
    const endDate = new Date(Date.UTC(year, month - 1, day, 0, 0, 0));

    const description = [
      `🪷 Digambar Jain Event: ${event.title} (${event.tag})`
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
