import springbootimg from "../images/springboot.jpg"
import { useState, useEffect } from "react";
import { getToken } from "../auth"
import { getAll } from "../api/events"


export default function EventCard(){

    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
      getAll()
        .then((data) => {
          setEvents(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Failed to fetch events:", err);
          setError(err);
          setLoading(false);
        });
    }, []);

    
    return(
        <>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {events.map((event) => (
            <div className="max-w-md rounded-2xl shadow-lg bg-white p-6 hover:shadow-xl transition-shadow duration-300">
            <img src={springbootimg}></img>
            <h2 className="text-xl font-bold text-gray-800 mb-2">{event.name}</h2>
            <p className="text-sm text-gray-500 mb-1">
            📅 {event.time} • 📍 Roseland, NJ
            </p>
            <p className="text-gray-700 mb-4">{event.description}</p>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Register
            </button>
          </div>
          ))
          }
          </div>
         
          
        </>
        
    )
}