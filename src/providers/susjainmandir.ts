import axios from 'axios';
import * as cheerio from 'cheerio';
import { BaseCalendarProvider } from './base';
import { RawJainEvent, Sect, EventCategory } from '../types';

export class SusJainMandirProvider extends BaseCalendarProvider {
  name = 'susjainmandir';
  sect: Sect = 'Digambar';

  async fetchMonth(year: number, month: number): Promise<RawJainEvent[]> {
    const url = `https://www.susjainmandir.com/jain-calendar/?year=${year}&month=${month}`;
    const response = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept-Language': 'en-US,en;q=0.9'
      },
      timeout: 10000
    });

    const $ = cheerio.load(response.data);
    const events: RawJainEvent[] = [];

    $('.sidebar-section').each((_, sectionEl) => {
      const sectionHeader = $(sectionEl).find('.sidebar-head h3').text().trim().toLowerCase();
      let category: EventCategory = 'Festival';

      if (sectionHeader.includes('kalyanak')) {
        category = 'Kalyanak';
      } else if (sectionHeader.includes('parv')) {
        category = 'Parv';
      } else if (sectionHeader.includes('festival')) {
        category = 'Festival';
      }

      $(sectionEl).find('.s-item').each((_, itemEl) => {
        const dayStr = $(itemEl).find('.s-day').text().trim();
        const day = parseInt(dayStr, 10);
        const name = $(itemEl).find('.s-name').text().trim();
        const tag = $(itemEl).find('.s-tag').text().trim();

        if (!isNaN(day) && name) {
          events.push({
            title: name,
            sect: 'Digambar',
            category,
            tag: tag || category,
            day,
            month,
            year,
            source: this.name
          });
        }
      });
    });

    return events;
  }
}
