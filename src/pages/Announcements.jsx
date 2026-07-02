import { useState } from "react";

const events = [
  { date: "2026-07-06", title: "Sunday Service" },
  { date: "2026-07-13", title: "Sunday Service" },
  { date: "2026-07-18", title: "Fish Fry" },
  { date: "2026-09-28", title: "85th Church Anniversary" },
];

const announcements = [
  {
    id: 1,
    date: "2026-07-01",
    title: "Announcement Title Here",
    body: "Announcement details go here. Replace with real content when available.",
  },
  {
    id: 2,
    date: "2026-07-01",
    title: "Announcement Title Here",
    body: "Announcement details go here. Replace with real content when available.",
  },
  {
    id: 3,
    date: "2026-07-18",
    title: "Pastoral Anniversary Fish Fry Fundraiser",
    body: "Whiting Dinners and Sandwiches Available $15 Dinner/$12 Sandwich",
  },
  {
    id: 3,
    date: "2026-09-01",
    title: "85th Church Anniversary",
    body: "Join us as we celebrate 85 years of ministry. Details to follow.",
  },
];

function Calendar({ year, month }) {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const monthName = new Date(year, month).toLocaleString("default", {
    month: "long",
  });

  const eventDates = events
    .filter((e) => {
      const d = new Date(e.date + "T12:00:00");
      return d.getFullYear() === year && d.getMonth() === month;
    })
    .map((e) => ({
      day: new Date(e.date + "T12:00:00").getDate(),
      title: e.title,
    }));

  const cells = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  return (
    <div className="rounded-3xl bg-white p-8 shadow-lg">
      <h2 className="text-xl font-semibold text-center mb-6">
        {monthName} {year}
      </h2>
      <div className="grid grid-cols-7 gap-1 text-center text-xs font-semibold text-slate-400 mb-2">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
          <div key={d}>{d}</div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1 text-center text-sm">
        {cells.map((day, i) => {
          const event = eventDates.find((e) => e.day === day);
          return (
            <div
              key={i}
              title={event ? event.title : ""}
              className={`rounded-full py-2 text-sm font-medium
                ${!day ? "" : "hover:bg-[#D5E4F2] cursor-default"}
                ${event ? "bg-[#0A1826] text-white hover:bg-[#0A1826]" : ""}
              `}
            >
              {day || ""}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function Announcements() {
  const now = new Date();
  const [year, setYear] = useState(now.getFullYear());
  const [month, setMonth] = useState(now.getMonth());

  const prevMonth = () => {
    if (month === 0) {
      setMonth(11);
      setYear((y) => y - 1);
    } else setMonth((m) => m - 1);
  };

  const nextMonth = () => {
    if (month === 11) {
      setMonth(0);
      setYear((y) => y + 1);
    } else setMonth((m) => m + 1);
  };

  const filteredAnnouncements = announcements.filter((item) => {
    const d = new Date(item.date + "T12:00:00");
    return d.getFullYear() === year && d.getMonth() === month;
  });

  return (
    <div className="mx-auto max-w-6xl px-6 py-20">
      <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#5D87A1]">
        Stay Informed
      </p>
      <h1 className="mt-4 text-3xl font-semibold md:text-5xl">Announcements</h1>

      <div className="mt-12 flex items-center justify-between mb-4">
        <button
          onClick={prevMonth}
          className="rounded-full px-4 py-2 text-sm font-medium bg-[#D5E4F2] text-[#0A1826] hover:bg-[#5D87A1] hover:text-white transition"
        >
          ← Prev
        </button>
        <button
          onClick={nextMonth}
          className="rounded-full px-4 py-2 text-sm font-medium bg-[#D5E4F2] text-[#0A1826] hover:bg-[#5D87A1] hover:text-white transition"
        >
          Next →
        </button>
      </div>

      <Calendar year={year} month={month} />

      <div className="mt-12 space-y-6">
        {filteredAnnouncements.length > 0 ? (
          filteredAnnouncements.map((item) => (
            <div key={item.id} className="rounded-3xl bg-white p-8 shadow-lg">
              <p className="text-xs uppercase tracking-[0.24em] text-[#5D87A1]">
                {new Date(item.date + "T12:00:00").toLocaleString("default", {
                  month: "long",
                  year: "numeric",
                })}
              </p>
              <h2 className="mt-2 text-xl font-semibold">{item.title}</h2>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                {item.body}
              </p>
            </div>
          ))
        ) : (
          <div className="rounded-3xl bg-white p-8 shadow-lg text-center text-slate-500">
            No announcements for this month.
          </div>
        )}
      </div>
    </div>
  );
}

export default Announcements;
