# 🪷 Digambar Jain Calendar (`digambar-jain-calendar`)

> **Open-Source Digambar Jain Calendar 2026 & Fasting Reminders for Google Calendar & Apple Calendar.**

Digambar Jain Calendar & Panchang 2026 — open-source CLI & Google Calendar sync app. Cross-validates Parv Tithis (Ashtami, Chaturdashi), Das Lakshan Paryushan, Mahavir Jayanti, Deepavali, Rohini Vrat & 24 Tirthankara Kalyanaks with zero-error verification. 12 PM Noon fasting reminders for Upvas/Ekasana/Chauvihar meal prep.

---

## ✨ Features (Simple & Easy to Use)

- 🪷 **Authentic Digambar Calendar**: Scrapes official Digambar Jain Tithis, Kalyanaks, and Festivals directly from trusted temple sources.
- 🔔 **12:00 PM Noon Fasting Reminders**: Receive a reminder at **12:00 PM Noon, 1 day BEFORE** every fasting day (*Ashtami*, *Chaturdashi*, *Rohini Vrat*, *Das Lakshan Parv*, *Sugandh Dashami*). This gives you plenty of time to buy groceries and complete meal preparation before sunset (*Chauvihar*, *Upvas*, *Ekasana*).
- ✅ **Double-Checked Verified Dates**: Every date is cross-checked against multiple calendar sources to ensure 100% accuracy with zero margin of error.
- 📅 **Dedicated Clean Calendar**: Syncs into a separate *"Digambar Jain Calendar"* on your Google account so your personal work and family events stay clean and un-cluttered.
- 📱 **Works on All Devices**: Easily imports into Google Calendar (Android / iPhone / Web), Apple Calendar (Mac / iOS), or Outlook with 1-click.

---

## 📅 Key Events Included

- **Fasting Parv Tithis**: Every *Krishna Ashtami*, *Krishna Chaturdashi*, *Shukla Ashtami*, and *Shukla Chaturdashi*.
- **Das Lakshan Paryushan Parv**: Complete 10-day schedule (*Uttam Kshama* through *Anant Chaturdashi* & *Kshamavani Parv*).
- **Festivals & Vrats**: *Sugandh Dashami*, *Mahavir Jayanti*, *Deepavali / Mahavir Nirvana*, *Veer Nirvana Samvat 2553*, *Rohini Vrat*, *Akshay Tritiya*, *Ashtahnika Parv*.
- **Tirthankara Kalyanaks**: All 5 Kalyanaks (*Garbh*, *Janma*, *Tap*, *Gyan*, *Moksha*) for all 24 Tirthankaras.

---

## 🚀 Quick Start Guide

### 1. Download & Setup
```bash
git clone https://github.com/JainHim/JainCalendar.git
cd JainCalendar
npm install
npm run build
```

### 2. Export 2026 Calendar (.ics File)
To generate your 2026 Digambar Jain Calendar file:
```bash
npx ts-node src/cli.ts sync --year 2026
```
This generates `jain_calendar_2026.ics` which you can open and import into Google Calendar or iPhone Calendar with a single click!

---

## 🧪 Verification & Testing

Run unit tests to verify rules and date accuracy:
```bash
npm test
```

---

## 📜 License

MIT License — Built with devotion for the global Jain community.
