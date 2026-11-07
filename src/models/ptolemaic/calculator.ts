import { PlanetParams } from "../../data/planets";

export interface PlanetPosition {
  earthX: number;
  earthY: number;
  deferentCenterX: number;
  deferentCenterY: number;
  epicycleCenterX: number;
  epicycleCenterY: number;
  planetX: number;
  planetY: number;
  longitude: number; // degrees from vernal equinox
}

export function calculatePtolemaicPosition(
  params: PlanetParams,
  daysSinceEpoch: number
): PlanetPosition {
  // 1. Mean Longitude (Center of epicycle on the deferent)
  const meanLongitude = (params.initialLongitude + params.meanDailyMotion * daysSinceEpoch) % 360;
  const meanLongRad = (meanLongitude * Math.PI) / 180;

  // 2. Mean Anomaly (Position of planet on the epicycle)
  const meanAnomaly = (params.initialAnomaly + params.epicycleDailyMotion * daysSinceEpoch) % 360;
  const meanAnomRad = (meanAnomaly * Math.PI) / 180;

  // For the MVP, we implement a simplified Ptolemaic model:
  // Deferent centered at (eccentricity, 0) relative to Earth (0,0)
  // This approximates the effect of the equant/eccentric.
  const deferentCenterX = params.eccentricity;
  const deferentCenterY = 0;

  // Position of the center of the epicycle
  const epicycleCenterX = deferentCenterX + params.deferentRadius * Math.cos(meanLongRad);
  const epicycleCenterY = deferentCenterY + params.deferentRadius * Math.sin(meanLongRad);

  // Position of the planet on the epicycle
  // Note: In Ptolemy's model for superior planets, the epicycle radius is parallel to the line from Earth to the mean sun.
  // For simplicity in the MVP visualizer, we use the mean anomaly relative to the deferent arm.
  const planetX = epicycleCenterX + params.epicycleRadius * Math.cos(meanLongRad + meanAnomRad);
  const planetY = epicycleCenterY + params.epicycleRadius * Math.sin(meanLongRad + meanAnomRad);

  // Calculate apparent longitude from Earth (0,0)
  let longitude = (Math.atan2(planetY, planetX) * 180) / Math.PI;
  if (longitude < 0) longitude += 360;

  return {
    earthX: 0,
    earthY: 0,
    deferentCenterX,
    deferentCenterY,
    epicycleCenterX,
    epicycleCenterY,
    planetX,
    planetY,
    longitude,
  };
}
