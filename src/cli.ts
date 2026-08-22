import { Command } from 'commander';
import * as fs from 'fs';
import * as path from 'path';
import { SusJainMandirProvider } from './providers/susjainmandir';
import { DigambarReferenceProvider } from './providers/reference';
import { CrossValidationEngine } from './validator';
import { enrichJainEvent } from './rules';
import { ICalendarExporter } from './exporters/ics';

const program = new Command();

program
  .name('jain-cal')
  .description('Open-Source Digambar Jain Calendar Scraper & Google Calendar Sync CLI')
  .version('1.0.0');

program
  .command('sync')
  .description('Scrape, cross-validate, and sync Digambar Jain calendar events to JSON, .ics, or Google Calendar')
  .option('-y, --year <year>', 'Target year to sync', String(new Date().getFullYear()))
  .option('-m, --month <month>', 'Target month (1-12)', undefined)
  .option('-s, --sect <sect>', 'Jain tradition sect', 'Digambar')
  .option('--ics [filepath]', 'Export iCalendar (.ics) file', 'jain_calendar_2026.ics')
  .option('--json [filepath]', 'Export JSON cache file', 'data/jain_events_2026.json')
  .action(async (options) => {
    const year = parseInt(options.year, 10);
    const month = options.month ? parseInt(options.month, 10) : undefined;

    console.log(`\n===============================================================`);
    console.log(`  jain-cal CLI - Scrape, Validate & Sync (${options.sect} Tradition)`);
    console.log(`  Target Year: ${year}${month ? `, Month: ${month}` : ' (Full Year)'}`);
    console.log(`===============================================================\n`);

    const primaryProvider = new SusJainMandirProvider();
    const secondaryProvider = new DigambarReferenceProvider();
    const validator = new CrossValidationEngine();
    const exporter = new ICalendarExporter();

    console.log(`[1/3] Scraping Primary Source (${primaryProvider.name})...`);
    let primaryEvents = await primaryProvider.fetchYear(year);

    console.log(`[2/3] Scraping Secondary Panchang Source (${secondaryProvider.name})...`);
    let secondaryEvents = await secondaryProvider.fetchYear(year);

    if (month) {
      primaryEvents = primaryEvents.filter(e => e.month === month);
      secondaryEvents = secondaryEvents.filter(e => e.month === month);
    }

    console.log(`[3/3] Cross-Validating Events (Zero Margin of Error)...`);
    const validatedEvents = validator.validateEvents(primaryEvents, secondaryEvents);

    const zeroErrorEvents = validatedEvents.filter(e => e.validationStatus === 'VALIDATED_ZERO_ERROR');
    console.log(`\n  ✅ Verified ${zeroErrorEvents.length} / ${validatedEvents.length} events with 100% Date Agreement.`);

    const enrichedEvents = zeroErrorEvents.map(enrichJainEvent);

    // Save JSON data cache file
    if (options.json) {
      const jsonPath = path.resolve(process.cwd(), options.json);
      const jsonDir = path.dirname(jsonPath);
      if (!fs.existsSync(jsonDir)) {
        fs.mkdirSync(jsonDir, { recursive: true });
      }
      fs.writeFileSync(jsonPath, JSON.stringify(enrichedEvents, null, 2), 'utf8');
      console.log(`\n💾 Saved validated dataset to JSON file cache:`);
      console.log(`   👉 ${jsonPath}`);
    }

    // Export .ics calendar file
    if (options.ics) {
      const icsPath = path.resolve(process.cwd(), options.ics);
      const icsData = exporter.generateICS(enrichedEvents);
      fs.writeFileSync(icsPath, icsData, 'utf8');
      console.log(`\n🎉 Successfully exported ${enrichedEvents.length} Digambar calendar reminders to .ics file:`);
      console.log(`   👉 ${icsPath}\n`);
    }
  });

program
  .command('clean')
  .description('Remove all generated calendar files and local cache data')
  .option('-y, --year <year>', 'Target year', '2026')
  .action((options) => {
    const jsonPath = path.resolve(process.cwd(), `data/jain_events_${options.year}.json`);
    const icsPath = path.resolve(process.cwd(), `jain_calendar_${options.year}.ics`);

    console.log(`\n🧹 Cleaning generated Digambar Jain calendar files for ${options.year}...`);

    if (fs.existsSync(jsonPath)) {
      fs.unlinkSync(jsonPath);
      console.log(`   ✓ Deleted ${jsonPath}`);
    }
    if (fs.existsSync(icsPath)) {
      fs.unlinkSync(icsPath);
      console.log(`   ✓ Deleted ${icsPath}`);
    }

    console.log(`\n✨ Clean complete! All generated local calendar files removed.\n`);
  });

program.parse(process.argv);
