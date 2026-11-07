export interface PlanetParams {
  name: string;
  latinName: string;
  // Deferent radius (arbitrary units for visualization)
  deferentRadius: number;
  // Epicycle radius
  epicycleRadius: number;
  // Mean daily motion in degrees
  meanDailyMotion: number;
  // Epicycle daily motion in degrees
  epicycleDailyMotion: number;
  // Eccentricity (distance from Earth to center of deferent)
  eccentricity: number;
  // Initial longitude at epoch
  initialLongitude: number;
  // Initial anomaly at epoch
  initialAnomaly: number;
  color: string;
}

export const PLANET_DATA: Record<string, PlanetParams> = {
  mars: {
    name: "Mars",
    latinName: "Mars",
    deferentRadius: 100,
    epicycleRadius: 40,
    meanDailyMotion: 0.524, // approx 0.524 deg/day
    epicycleDailyMotion: 0.462, // approx 0.462 deg/day (relative to deferent)
    eccentricity: 10,
    initialLongitude: 0,
    initialAnomaly: 0,
    color: "#B22222",
  },
  // Other planets will be added here later
};
