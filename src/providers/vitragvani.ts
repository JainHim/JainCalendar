import axios from 'axios';
import { BaseCalendarProvider } from './base';
import { RawJainEvent, Sect, EventCategory } from '../types';

const MONTH_NAMES = [
  'january', 'february', 'march', 'april', 'may', 'june',
  'july', 'august', 'september', 'october', 'november', 'december'
];

interface VitragVaniDayItem {
  en_date: string;
  en_month: string;
  en_year: string;
  cal_tithi: string;
  cal_sud_vad: string; // 'Sud' | 'Vad'
  cal_month: string;
  cal_atham_chaudas: string; // '1' if Ashtami or Chaturdashi
  cal_special_event?: string;
  cal_event_details?: string;
}

export class VitragVaniProvider extends BaseCalendarProvider {
  name = 'vitragvani';
  sect: Sect = 'Digambar';

  async fetchMonth(year: number, month: number): Promise<RawJainEvent[]> {
    const monthName = MONTH_NAMES[month - 1];
    const url = `https://www.vitragvani.com/app-calendar/eng/calendar/${year}/${monthName}.json`;

    try {
      const response = await axios.get(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)'
        },
        timeout: 10000
      });

      const items: VitragVaniDayItem[] = response.data?.calendar || [];
      const events: RawJainEvent[] = [];

      for (const item of items) {
        const day = parseInt(item.en_date, 10);
        if (isNaN(day)) continue;

        // Check if Parv Tithi (Ashtami / Chaturdashi)
        if (item.cal_atham_chaudas === '1') {
          const paksha = item.cal_sud_vad === 'Sud' ? 'Shukla' : 'Krishna';
          const tithiName = item.cal_tithi === '8' ? 'Ashtami' : item.cal_tithi === '14' ? 'Chaturdashi' : `Tithi ${item.cal_tithi}`;
          const title = `${paksha} ${tithiName}`;

          events.push({
            title,
            sect: 'Digambar',
            category: 'Parv',
            tag: tithiName,
            day,
            month,
            year,
            source: this.name
          });
        }

        // Check for special events/festivals or Kalyanaks
        if (item.cal_special_event && item.cal_special_event.trim() !== '') {
          const title = item.cal_special_event.trim();
          const category: EventCategory = title.toLowerCase().includes('kalyanak') ? 'Kalyanak' : 'Festival';

          events.push({
            title,
            sect: 'Digambar',
            category,
            tag: category,
            day,
            month,
            year,
            source: this.name
          });
        }
      }

      return events;
    } catch (err: any) {
      console.warn(`[VitragVani] Failed to fetch data for ${year}/${monthName}:`, err.message);
      return [];
    }
  }
}
