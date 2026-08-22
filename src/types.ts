export type Sect = 'Digambar' | 'Shvetambar';

export type EventCategory = 'Kalyanak' | 'Parv' | 'Festival';

export interface RawJainEvent {
  title: string;
  sect: Sect;
  category: EventCategory;
  tag: string; // e.g. "Garbh Kalyanak", "Ashtami", "Vrat", "Festival"
  day: number;
  month: number; // 1-12
  year: number;
  source: string; // e.g. 'susjainmandir' | 'drikpanchang'
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

export interface EnrichedCalendarEvent extends ValidatedJainEvent {
  uid: string;
  isFastingDay: boolean;
  reminderTitle: string;
  reminderTriggerDate: Date; // 12:00 PM Noon day before for Fasting; 7:00 AM day of for Kalyanak
  eventStartDate: Date;
  eventEndDate: Date;
  description: string;
}
