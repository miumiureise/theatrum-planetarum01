export interface ZodiacSign {
  name: string;
  symbol: string;
  startDegree: number;
}

export const ZODIAC_SIGNS: ZodiacSign[] = [
  { name: "Aries", symbol: "♈", startDegree: 0 },
  { name: "Taurus", symbol: "♉", startDegree: 30 },
  { name: "Gemini", symbol: "♊", startDegree: 60 },
  { name: "Cancer", symbol: "♋", startDegree: 90 },
  { name: "Leo", symbol: "♌", startDegree: 120 },
  { name: "Virgo", symbol: "♍", startDegree: 150 },
  { name: "Libra", symbol: "♎", startDegree: 180 },
  { name: "Scorpio", symbol: "♏", startDegree: 210 },
  { name: "Sagittarius", symbol: "♐", startDegree: 240 },
  { name: "Capricorn", symbol: "♑", startDegree: 270 },
  { name: "Aquarius", symbol: "♒", startDegree: 300 },
  { name: "Pisces", symbol: "♓", startDegree: 330 },
];
