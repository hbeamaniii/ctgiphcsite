import { useState, useEffect } from "react";

const CALENDAR_API_KEY = import.meta.env.VITE_GOOGLE_CALENDAR_API_KEY;
const CALENDAR_ID = import.meta.env.VITE_GOOGLE_CALENDAR_ID;

function Announcements() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const now = new Date();
  const [year, setYear] = useState(now.getFullYear());
  const [month, setMonth] = useState(now.getMonth());

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const timeMin = new Date(year, month, 1).toISOString();
        const timeMax = new Date(year, month + 1, 0, 23, 59, 59).toISOString();
        const url = `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(CALENDAR_ID)}/events?key=${CALENDAR_API_KEY}&timeMin=${timeMin}&timeMax=${timeMax}&singleEvents=true&orderBy=startTime`;
        const res = await fetch(url);
        const data = await res.json();
        setEvents(data.items || []);
      } catch (err) {
        console.error("Calendar fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, [year, month]);

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

  const monthName = new Date(year, month).toLocaleString("default", {
    month: "long",
  });
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const eventDays = events.map((e) => {
    const d = new Date(e.start.dateTime || e.start.date + "T12:00:00");
    return d.getDate();
  });

  const cells = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

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
            const hasEvent = eventDays.includes(day);
            return (
              <div
                key={i}
                className={`rounded-full py-2 text-sm font-medium
                ${!day ? "" : "hover:bg-[#D5E4F2] cursor-default"}
                ${hasEvent ? "bg-[#0A1826] text-white hover:bg-[#0A1826]" : ""}
              `}
              >
                {day || ""}
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-12 space-y-6">
        {loading && <p className="text-slate-500">Loading events...</p>}
        {!loading && events.length === 0 && (
          <div className="rounded-3xl bg-white p-8 shadow-lg text-center text-slate-500">
            No events this month.
          </div>
        )}
        {events.map((event, i) => {
          const start = new Date(
            event.start.dateTime || event.start.date + "T12:00:00",
          );
          return (
            <div key={i} className="rounded-3xl bg-white p-8 shadow-lg">
              <p className="text-xs uppercase tracking-[0.24em] text-[#5D87A1]">
                {start.toLocaleDateString("default", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </p>
              <h2 className="mt-2 text-xl font-semibold">{event.summary}</h2>
              {event.description && (
                <p className="mt-3 text-sm leading-7 text-slate-600">
                  {event.description}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Announcements;
