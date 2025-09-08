import springbootimg from "../images/springboot.jpg"
import { getToken } from "../auth"


const API_BASE = "http://localhost:8000";
const baseURL  = `${API_BASE}/api/events`;


async function authFetch(url, init = {}) {
  const token = getToken(); // grab token from login
  const headers = new Headers(init.headers || {});
  if (!headers.has("Accept")) headers.set("Accept", "application/json");
  if (token) headers.set("Authorization", `Bearer ${token}`);
  return fetch(url, { ...init, headers });
}


async function parse(res) {
  if (!res.ok) {
    const msg = await res.text().catch(() => "");
    const www = res.headers.get("www-authenticate");
    throw new Error(www || msg || `HTTP ${res.status}`);
  }
  const ct = res.headers.get("content-type") || "";
  if (res.status === 204) return null;
  return ct.includes("application/json") ? res.json() : res.text();
}

export default function EventCard(){

    

    fetch('http://localhost:8000/api/events')
        .then(response => response.json())
        .then(data => {
            console.log("data: "+ data)
        })
        .catch(error => {
            console.log("error: " + error)
        })
    return(
        
        <div className="max-w-md rounded-2xl shadow-lg bg-white p-6 hover:shadow-xl transition-shadow duration-300">
            <img src={springbootimg}></img>
            <h2 className="text-xl font-bold text-gray-800 mb-2">SpringBoot Training</h2>
            <p className="text-sm text-gray-500 mb-1">
            📅 12/23/25 3:00PM • 📍 Roseland, NJ
            </p>
            <p className="text-gray-700 mb-4">We are going to learn about springboot and beans</p>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            View Details
            </button>
        </div>
    )
}