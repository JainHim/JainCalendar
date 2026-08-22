import { describe, it, expect } from 'vitest';
import { VitragVaniProvider } from '../src/providers/vitragvani';

describe('VitragVaniProvider', () => {
  const provider = new VitragVaniProvider();

  it('should have correct provider name and sect', () => {
    expect(provider.name).toBe('vitragvani');
    expect(provider.sect).toBe('Digambar');
  });

  it('should parse VitragVani events dynamically for August 2026', async () => {
    const events = await provider.fetchMonth(2026, 8);
    expect(events.length).toBeGreaterThan(0);

    const ashtamiEvent = events.find(e => e.day === 6 && e.tag === 'Ashtami');
    expect(ashtamiEvent).toBeDefined();
    expect(ashtamiEvent?.title).toBe('Krishna Ashtami');
    expect(ashtamiEvent?.category).toBe('Parv');
  });
});
