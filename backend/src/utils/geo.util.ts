export function haversineDistance([lat1, lng1]: [number, number], [lat2, lng2]: [number, number]) {
const toRad = (v: number) => (v * Math.PI) / 180;
const R = 6371; // km
const dLat = toRad(lat2 - lat1);
const dLon = toRad(lng2 - lng1);
const a = Math.sin(dLat / 2) ** 2 + Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
return 2 * R * Math.asin(Math.sqrt(a));
}