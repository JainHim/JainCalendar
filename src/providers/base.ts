import { RawJainEvent, Sect } from '../types';

export abstract class BaseCalendarProvider {
  abstract name: string;
  abstract sect: Sect;

  abstract fetchMonth(year: number, month: number): Promise<RawJainEvent[]>;
  
  async fetchYear(year: number): Promise<RawJainEvent[]> {
    const allEvents: RawJainEvent[] = [];
    for (let m = 1; m <= 12; m++) {
      try {
        const events = await this.fetchMonth(year, m);
        allEvents.push(...events);
      } catch (err) {
        console.warn(`[${this.name}] Warning: Failed to fetch month ${m} for year ${year}:`, err);
      }
    }
    return allEvents;
  }
}
