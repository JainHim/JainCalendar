import { RawJainEvent, ValidatedJainEvent } from './types';

export function normalizeKey(title: string, tag: string): string {
  // Normalize title by removing prefixes like Shree, Bhagwan, and special characters
  const cleanTitle = title
    .toLowerCase()
    .replace(/^shree\s+/, '')
    .replace(/\s+bhagwan$/, '')
    .replace(/[^a-z0-9]/g, '');

  const cleanTag = tag
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '');

  return `${cleanTitle}_${cleanTag}`;
}

export function formatDateString(year: number, month: number, day: number): string {
  const m = String(month).padStart(2, '0');
  const d = String(day).padStart(2, '0');
  return `${year}-${m}-${d}`;
}

export class CrossValidationEngine {
  validateEvents(primaryEvents: RawJainEvent[], secondaryEvents: RawJainEvent[]): ValidatedJainEvent[] {
    const validatedList: ValidatedJainEvent[] = [];

    // Map secondary events by (CleanTitle + Month) for flexible matching
    const secondaryMap = new Map<string, RawJainEvent[]>();
    for (const sec of secondaryEvents) {
      const cleanTitle = sec.title.toLowerCase().replace(/^shree\s+/, '').replace(/\s+bhagwan$/, '').replace(/[^a-z0-9]/g, '');
      const key = `${cleanTitle}_m${sec.month}`;
      if (!secondaryMap.has(key)) {
        secondaryMap.set(key, []);
      }
      secondaryMap.get(key)!.push(sec);
    }

    for (const pri of primaryEvents) {
      const cleanTitle = pri.title.toLowerCase().replace(/^shree\s+/, '').replace(/\s+bhagwan$/, '').replace(/[^a-z0-9]/g, '');
      const key = `${cleanTitle}_m${pri.month}`;
      const primaryDateStr = formatDateString(pri.year, pri.month, pri.day);
      const matches = secondaryMap.get(key) || [];

      // Check if there is an exact date match
      const matchedSec = matches.find(sec => formatDateString(sec.year, sec.month, sec.day) === primaryDateStr);

      if (matchedSec) {
        // 100% Exact Date Match across sources
        validatedList.push({
          title: pri.title,
          sect: pri.sect,
          category: pri.category,
          tag: pri.tag,
          dateString: primaryDateStr,
          validationStatus: 'VALIDATED_ZERO_ERROR',
          sources: [pri.source, matchedSec.source]
        });
      } else if (matches.length > 0) {
        // Event exists in same month, but date differs! (DISCREPANCY)
        const mismatchedSec = matches[0];
        const secDateStr = formatDateString(mismatchedSec.year, mismatchedSec.month, mismatchedSec.day);
        validatedList.push({
          title: pri.title,
          sect: pri.sect,
          category: pri.category,
          tag: pri.tag,
          dateString: primaryDateStr,
          validationStatus: 'DISCREPANCY',
          mismatchDetails: `Date discrepancy: ${pri.source} says ${primaryDateStr}, but ${mismatchedSec.source} says ${secDateStr}`,
          sources: [pri.source, mismatchedSec.source]
        });
      } else {
        // Event listed in primary source only
        validatedList.push({
          title: pri.title,
          sect: pri.sect,
          category: pri.category,
          tag: pri.tag,
          dateString: primaryDateStr,
          validationStatus: 'UNVALIDATED_SINGLE_SOURCE',
          sources: [pri.source]
        });
      }
    }

    return validatedList;
  }
}
