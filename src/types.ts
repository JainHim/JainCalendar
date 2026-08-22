export type Sect = 'Digambar' | 'Shvetambar';

export type EventCategory = 'Kalyanak' | 'Parv' | 'Festival';

export interface RawJainEvent {
  title: string;
  sect: Sect;
  category: EventCategory;
  tag: string;
  day: number;
  month: number; // 1-12
  year: number;
  source: string;
}

export interface ValidatedJainEvent {
  title: string;
  sect: Sect;
  category: EventCategory;
  tag: string;
  dateString: string; // YYYY-MM-DD
  validationStatus: 'VALIDATED_ZERO_ERROR' | 'UNVALIDATED_SINGLE_SOURCE' | 'DISCREPANCY';
  mismatchDetails?: string;
  sources: string[];
}

export interface EnrichedCalendarEvent {
  uid: string;
  title: string;
  sect: Sect;
  category: EventCategory;
  tag: string;
  dateString: string; // YYYY-MM-DD
  validationStatus: 'VALIDATED_ZERO_ERROR' | 'UNVALIDATED_SINGLE_SOURCE' | 'DISCREPANCY';
  sources: string[];
  isFastingDay: boolean;
  isPrepReminder: boolean; // True for the 12:00 PM Noon day-before prep reminder event
  eventTitle: string;     // Clean user-facing title
  eventStartDate: Date;   // Start date/time
  eventEndDate: Date;     // End date/time
  isAllDay: boolean;      // True for all-day events, false for timed 12 PM prep reminders
  description: string;    // Clean, devotional description (no debug code strings!)
}
