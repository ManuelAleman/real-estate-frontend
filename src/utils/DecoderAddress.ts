export const DecoderAddressTs = async(address: string) => {
    try{
        const response = await fetch(
            `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
              address
            )}&key=AIzaSyDNFT-GiUiKAAJA5zCPDFFXX7DO36PUJ5M`
          );
          const data = await response.json();
          if (data.results && data.results.length > 0) {
            const location = data.results[0].geometry.location;
            return { lat: location.lat, lng: location.lng };
          } else {
            return null;
          }
        } catch (error) {
          console.error("Error geocoding address:", error);
          return null;
    }
}

export const decodeEstatesInRange = async (latActual: number, lngActual: number, lat: number, lng: number, range: number) => {
  const distance = calculateDistance(latActual, lngActual, lat, lng);
  console.log("Distance:", distance);
  return distance <= range;
}

const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
  const R = 6371; 
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;
  return distance;
}

const deg2rad = (deg: number) => {
  return deg * (Math.PI / 180);
}