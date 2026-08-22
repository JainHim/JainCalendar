import { google, calendar_v3 } from 'googleapis';
import { EnrichedCalendarEvent } from '../types';

export const DEDICATED_CALENDAR_NAME = 'Digambar Jain Calendar';

export class GoogleCalendarSyncEngine {
  private calendar: calendar_v3.Calendar;

  constructor(authClient: any) {
    this.calendar = google.calendar({ version: 'v3', auth: authClient });
  }

  /**
   * Finds or creates a dedicated Google Calendar named "Digambar Jain Calendar"
   */
  async getOrCreateDedicatedCalendar(): Promise<string> {
    const listRes = await this.calendar.calendarList.list();
    const calendars = listRes.data.items || [];

    const existing = calendars.find(c => c.summary === DEDICATED_CALENDAR_NAME);
    if (existing && existing.id) {
      console.log(`[GCal Sync] Using existing dedicated calendar: "${DEDICATED_CALENDAR_NAME}" (ID: ${existing.id})`);
      return existing.id;
    }

    console.log(`[GCal Sync] Creating new dedicated Google Calendar: "${DEDICATED_CALENDAR_NAME}"...`);
    const createRes = await this.calendar.calendars.insert({
      requestBody: {
        summary: DEDICATED_CALENDAR_NAME,
        description: 'Digambar Jain Calendar Events, Kalyanaks, Parv Tithis, and Fasting Reminders',
        timeZone: 'UTC'
      }
    });

    const newCalendarId = createRes.data.id!;
    console.log(`[GCal Sync] Successfully created dedicated calendar (ID: ${newCalendarId})`);
    return newCalendarId;
  }

  /**
   * Syncs an event into the dedicated "Digambar Jain Calendar" idempotently
   */
  async syncEvent(calendarId: string, event: EnrichedCalendarEvent): Promise<{ status: 'inserted' | 'updated' | 'skipped'; gcalId?: string }> {
    if (event.validationStatus === 'DISCREPANCY') {
      console.warn(`[GCal Sync] Skipping event with DISCREPANCY: ${event.title} (${event.dateString})`);
      return { status: 'skipped' };
    }

    const gcalEvent: calendar_v3.Schema$Event = {
      summary: event.reminderTitle,
      description: event.description,
      start: {
        date: event.dateString
      },
      end: {
        date: event.dateString
      },
      extendedProperties: {
        private: {
          jainUid: event.uid,
          jainSect: event.sect,
          validationStatus: event.validationStatus
        }
      },
      reminders: {
        useDefault: false,
        overrides: [
          {
            method: 'popup',
            minutes: event.isFastingDay ? 12 * 60 : 60 // 12 hours prior (12:00 PM Noon) or 1 hour prior
          }
        ]
      }
    };

    // Check if event already exists by jainUid extended property to prevent duplicates
    const existingRes = await this.calendar.events.list({
      calendarId,
      privateExtendedProperty: [`jainUid=${event.uid}`]
    });

    const existingEvents = existingRes.data.items || [];

    if (existingEvents.length > 0) {
      const existingId = existingEvents[0].id!;
      await this.calendar.events.update({
        calendarId,
        eventId: existingId,
        requestBody: gcalEvent
      });
      return { status: 'updated', gcalId: existingId };
    } else {
      const insertRes = await this.calendar.events.insert({
        calendarId,
        requestBody: gcalEvent
      });
      return { status: 'inserted', gcalId: insertRes.data.id || undefined };
    }
  }

  /**
   * Batch syncs all events into the dedicated "Digambar Jain Calendar"
   */
  async syncAllEvents(events: EnrichedCalendarEvent[]): Promise<{ inserted: number; updated: number; skipped: number }> {
    const calendarId = await this.getOrCreateDedicatedCalendar();
    let inserted = 0;
    let updated = 0;
    let skipped = 0;

    for (const ev of events) {
      const result = await this.syncEvent(calendarId, ev);
      if (result.status === 'inserted') inserted++;
      else if (result.status === 'updated') updated++;
      else if (result.status === 'skipped') skipped++;
    }

    return { inserted, updated, skipped };
  }
}
