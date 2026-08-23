# 🪷 Digambar Jain Calendar 2026 (`digambar-jain-calendar`)

> **Verified Digambar Jain Calendar 2026, Fasting Meal-Prep Reminders, and Tirthankara Kalyanak Guides for Google Calendar, Apple Calendar, and Outlook.**

Digambar Jain Calendar & Panchang 2026 — open-source CLI & Google Calendar sync app. Cross-validates Parv Tithis (Ashtami, Chaturdashi), Das Lakshan Paryushan, Mahavir Jayanti, Deepavali, Rohini Vrat & 24 Tirthankara Kalyanaks with zero-error verification. 2:00 PM IST fasting reminders for Upvas/Ekasana/Chauvihar meal prep and 8:00 PM IST temple visit reminders.

---

## ⚡ Easiest Ways to Use (Choose One Option Below)

### 🌟 Option 1: 1-Click Add to Google Calendar (Easiest for Android & Web)
Click the link below to add the calendar to your Google account in a single click:  
👉 **[Click Here to Add to Google Calendar](https://calendar.google.com/calendar/render?cid=https://jainhim.github.io/JainCalendar/jain_calendar_2026.ics)**

*(Click "Add" when the pop-up appears, and a separate calendar titled **"Digambar Jain Calendar 2026"** will instantly populate on your phone and web calendar!)*

---

### 📲 Option 2: iPhone, iPad & Mac Calendar Subscribe (.ics Feed)
Click the link below on your iPhone, iPad, or Mac:  
👉 **[Click Here to Download & Subscribe Calendar](https://jainhim.github.io/JainCalendar/jain_calendar_2026.ics)**

*(Clicking this link downloads `jain_calendar_2026.ics`. Simply click or double-click the downloaded file to open Apple Calendar and click **"Subscribe"**!)*

---

### 📁 Option 3: Manual File Download & Import (.ics File)
If you prefer downloading the calendar file directly to your computer:
1. Download **[`jain_calendar_2026.ics`](https://jainhim.github.io/JainCalendar/jain_calendar_2026.ics)**.
2. In Google Calendar, create a new calendar named **"Digambar Jain Calendar 2026"**.
3. Go to **Settings $\rightarrow$ Import & export $\rightarrow$ Import**, select `jain_calendar_2026.ics`, and click **Import**.

---

## ✨ Key Features

- 🔔 **2:00 PM IST Fasting Prep Reminders**: Fires a notification at 2:00 PM IST the day BEFORE every fasting day (*Ashtami*, *Chaturdashi*, *Rohini Vrat*, *Das Lakshan Parv*, *Sugandh Dashami*) to complete grocery buying & cooking before sunset (*Chauvihar* / *Upvas* / *Ekasana*).
- 🪔 **8:00 PM IST Temple Visit Reminders**: Fires a notification at 8:00 PM IST the evening BEFORE every Tirthankara Kalyanak to plan your morning temple visit (*Jinendra Darshan / Pujan / Abhishek*).
- 🏛️ **Rich Tirthankara Metadata & Ritual Guides**: Every Kalyanak includes the Tirthankara's Symbol (Lanchhan 🐂🐍🦁), Parents, Birthplace, Moksha Kshetra, recommended Stotra (*Bhaktamara* / *Parshvanath Stotra*), and 108 Jaap Mantras.
- ✅ **100% Cross-Validated Accuracy**: Every date is double-checked across multiple sources (`susjainmandir.com`, `vitragvani.com`, Digambar Panchang) with zero margin of error.

---

## 📅 Key Events Included

- **Fasting Parv Tithis**: Every *Krishna Ashtami*, *Krishna Chaturdashi*, *Shukla Ashtami*, and *Shukla Chaturdashi*.
- **Das Lakshan Paryushan Parv**: Complete 10-day schedule (*Uttam Kshama* through *Anant Chaturdashi* & *Kshamavani Parv*).
- **Festivals & Vrats**: *Sugandh Dashami*, *Mahavir Jayanti*, *Deepavali / Mahavir Nirvana*, *Veer Nirvana Samvat 2553*, *Rohini Vrat*, *Akshay Tritiya*, *Ashtahnika Parv*.
- **24 Tirthankara Kalyanaks**: All 5 Kalyanaks (*Garbh*, *Janma*, *Tap*, *Gyan*, *Moksha*) for all 24 Tirthankaras.

---

## 🛠️ CLI Developer Usage (Optional)

If you want to run the open-source CLI locally:
```bash
git clone https://github.com/JainHim/JainCalendar.git
cd JainCalendar
npm install
npm run build

# Scrape and export 2026 events
npx ts-node src/cli.ts sync --year 2026
```

---

## 📜 License

MIT License — Built with devotion for the global Jain community.
