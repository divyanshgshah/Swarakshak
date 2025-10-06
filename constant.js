// --- Page Constants ---
export const PAGES = {
  ONBOARDING: 'onboarding',
  LOGIN: 'login',
  HOME: 'home',
  ALERTS: 'alerts',
  SOS: 'sos',
  MAP: 'map',
  LEARN: 'learn',
  PROFILE: 'profile',
};

export const PAGE_TITLE_MAP = {
    [PAGES.HOME]: 'Home',
    [PAGES.ALERTS]: 'Alerts',
    [PAGES.SOS]: 'Emergency SOS',
    [PAGES.MAP]: 'Evacuation Map',
    [PAGES.LEARN]: 'Community Training',
    [PAGES.PROFILE]: 'Profile',
    [PAGES.LOGIN]: 'Log in or Sign Up',
};

// --- Mock Data ---
import { Zap, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';

export const MOCK_ALERTS = [
  {
    id: 1, type: 'Critical', icon: Zap, title: 'Severe Thunderstorm Warning',
    time: '10:30 AM, Today', location: 'Metro Area, Central City',
    details: 'Heavy rain, lightning, and strong winds expected.',
    isNew: true
  },
  {
    id: 2, type: 'Warning', icon: AlertTriangle, title: 'Tornado Watch in Effect',
    time: '09:00 AM, Today', location: 'Northern Districts, Green Hills Region',
    details: 'Conditions are favorable for tornado development.'
  },
  {
    id: 3, type: 'Info', icon: CheckCircle, title: 'Road Closure Update: Main Street Reopened',
    time: '08:45 AM, Today', location: 'Downtown District, Main Street Corridor',
    details: 'Road is safe for travel.'
  },
  {
    id: 4, type: 'Critical', icon: XCircle, title: 'Emergency Flood Alert: Evacuate Low-Lying Areas',
    time: '07:15 AM, Today', location: 'Riverbank Community, Flood Zone A',
    details: 'Rising floodwaters detected. Evacuate immediately.'
  },
];

export const MOCK_TRAINING = [
  { type: 'Earthquake Preparedness', title: 'Drop, Cover, Hold', description: 'Essential steps to take during an earthquake.', image: 'https://placehold.co/200x120/E8F5E9/1E88E5?text=EQ+Safety' },
  { type: 'Earthquake Preparedness', title: 'Emergency Kit', description: 'Create a survival kit for your household.', image: 'https://placehold.co/200x120/FFEBEE/D32F2F?text=First+Aid' },
  { type: 'Flood Safety', title: 'Evacuation Routes', description: 'Plan and practice routes to prepare for evacuation.', image: 'https://placehold.co/200x120/E3F2FD/1565C0?text=Flood+Plan' },
  { type: 'Flood Safety', title: 'Protecting Your Home', description: 'Steps to safeguard your property from flood damage.', image: 'https://placehold.co/200x120/FFF3E0/FF6F00?text=Property+Prep' },
  { type: 'Fire Prevention', title: 'Fire Extinguisher', description: 'Learn how to operate a fire extinguisher safely.', image: 'https://placehold.co/200x120/FFCDD2/E53935?text=Fire+Safe' },
  { type: 'Fire Prevention', title: 'Smoke Detector', description: 'Maintain and test your smoke detector regularly.', image: 'https://placehold.co/200x120/F0F4C3/AFB42B?text=Detector' },
];

export const MOCK_BADGES = [
  { name: 'Earthquake Master', status: 'Completed', color: 'bg-green-500', icon: '⛰️' },
  { name: 'Flood Hero', status: 'Completed', color: 'bg-green-500', icon: '💧' },
  { name: 'Fire Safety Pro', status: 'Locked', color: 'bg-gray-400', icon: '🔥' },
  { name: 'First Aid Certified', status: 'Locked', color: 'bg-gray-400', icon: '🚑' },
];
