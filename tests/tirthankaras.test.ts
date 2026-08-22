import { describe, it, expect } from 'vitest';
import { findTirthankara, TIRTHANKARAS_DATABASE } from '../src/data/tirthankaras';
import { enrichJainEvent } from '../src/rules';
import { ValidatedJainEvent } from '../src/types';

describe('Tirthankara Metadata Database & Enrichment (Phase 8)', () => {
  it('should contain complete metadata for all 24 Tirthankaras', () => {
    expect(TIRTHANKARAS_DATABASE).toHaveLength(24);
    for (const t of TIRTHANKARAS_DATABASE) {
      expect(t.number).toBeGreaterThanOrEqual(1);
      expect(t.number).toBeLessThanOrEqual(24);
      expect(t.symbol).toBeDefined();
      expect(t.mother).toBeDefined();
      expect(t.father).toBeDefined();
      expect(t.birthplace).toBeDefined();
      expect(t.mokshaPlace).toBeDefined();
      expect(t.jaapMantra).toContain('Om Hrim Arham');
    }
  });

  it('should correctly lookup Tirthankaras by name', () => {
    const rushabh = findTirthankara('Shree Rushabhdev Bhagwan');
    expect(rushabh?.name).toBe('Rushabhdev (Adinath)');
    expect(rushabh?.symbol).toContain('Bull');

    const parshvanath = findTirthankara('Shree Parshvanath Bhagwan');
    expect(parshvanath?.name).toBe('Parshvanath');
    expect(parshvanath?.symbol).toContain('Serpent');

    const mahavir = findTirthankara('Shree Mahavir Bhagwan');
    expect(mahavir?.name).toBe('Mahavir (Vardhman)');
    expect(mahavir?.symbol).toContain('Lion');
  });

  it('should enrich Kalyanak event descriptions with Tirthankara symbol, parents, birthplace, moksha place, stotra and jaap mantra', () => {
    const event: ValidatedJainEvent = {
      title: 'Shree Parshvanath Bhagwan',
      sect: 'Digambar',
      category: 'Kalyanak',
      tag: 'Moksha Kalyanak',
      dateString: '2026-08-19',
      validationStatus: 'VALIDATED_ZERO_ERROR',
      sources: ['susjainmandir', 'digambar_reference']
    };

    const enrichedList = enrichJainEvent(event);
    expect(enrichedList).toHaveLength(2);

    const [templeReminder, kalyanakEvent] = enrichedList;

    // 1. Check Temple Visit Reminder Event
    expect(templeReminder.eventTitle).toContain('Temple Visit Reminder');
    expect(templeReminder.description).toContain('Serpent (Sarpa');
    expect(templeReminder.description).toContain('Mata Vama Devi & Raja Ashvasen');
    expect(templeReminder.description).toContain('Shree Sammed Shikharji');

    // 2. Check Kalyanak Day Event
    expect(kalyanakEvent.eventTitle).toBe('🪷 Shree Parshvanath Bhagwan (Moksha Kalyanak)');
    expect(kalyanakEvent.description).toContain('Serpent (Sarpa');
    expect(kalyanakEvent.description).toContain('Mata Vama Devi & Raja Ashvasen');
    expect(kalyanakEvent.description).toContain('Varanasi (Kashi)');
    expect(kalyanakEvent.description).toContain('Shree Sammed Shikharji (Parshvanath Tonk)');
    expect(kalyanakEvent.description).toContain('Om Hrim Arham Shree Parshvanathaya Namah');
    expect(kalyanakEvent.description).toContain('Parshvanath Stotra / Bhaktamara / Uvasaggaharam');
  });
});
