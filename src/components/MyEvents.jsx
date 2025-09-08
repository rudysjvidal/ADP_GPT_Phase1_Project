import springbootimg from "../images/springboot.jpg";
import React, { useEffect, useMemo, useState } from "react";
import * as eventsApi from "../api/events";
import { getMe } from "../api/customers";
import NavigationBar from "./NavigationBar";

export default function MyEvents() {
  const [events, setEvents] = useState([]);
  const [user, setUser]     = useState(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        setErr(""); setLoading(true);
        const [all, me] = await Promise.all([eventsApi.getAll(), getMe()]);
        if (cancelled) return;
        setEvents(Array.isArray(all) ? all : []);
        setUser(me || null);
      } catch (e) {
        if (!cancelled) setErr(e.message || "Failed to load events");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  // grabbing events by names that are stored in a specific user document (the user that is logged in that is)
  const myEvents = useMemo(() => {
    if (!user || !Array.isArray(user.registered_events)) return [];
    const wanted = new Set(user.registered_events.map(String));
    return events.filter(e => wanted.has(e.name));
  }, [events, user]);

  if (!user)      return <div className="p-4">Log in to see your registered events.</div>;
  if (loading)    return <div className="p-4">Loading…</div>;
  if (err)        return <div className="p-4 text-red-600">{err}</div>;

  return (
    <>
    <h2 className="text-2xl font-bold text-gray-800 mb-2">My Events</h2>

    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      
      {myEvents.length === 0 ? (
        <div className="col-span-full text-sm text-gray-500">
          You haven’t registered for any events yet.
        </div>
      ) : myEvents.map(ev => (
        <div key={ev._id || ev.id || ev.name}
             className="max-w-md rounded-2xl shadow-lg bg-white p-6 hover:shadow-xl transition-shadow duration-300">
          <img src={springbootimg} alt="" className="rounded-md mb-3" />
          <h2 className="text-xl font-bold text-gray-800 mb-2">{ev.name}</h2>
          <p className="text-sm text-gray-500 mb-1">
            📅 {ev.time} • 📍 Roseland, NJ
          </p>
          <p className="text-gray-700">{ev.description}</p>
        </div>
      ))}
    </div>
    </>
  );
}
