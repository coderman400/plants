import { useEffect, useState } from "react";

const SHEET_ID = "145YqWXm5nreJfdfcPKn7OAirEAVUvm3--jtDsQDkxB8";
const API_KEY = import.meta.env.VITE_API_KEY as string;
const RANGE = "Data!A1:R1000"; // Include header row for correct mapping

export interface Plant {
  id: string;
  name: string;
  scientific: string;
  image: string;
  soilType: string;
  location: string;
  description?: string;
  moreInfo?: string;
  moreInfoLink?: string;
  gpsLocation?: string;
  genus?: string;
  genotype?: string;
  phenotype?: string;
  importance?: string;
  localNames?: string;
  serial?: string;
  status?: string;
  category?: string;
  floweringTime?: string;
}

export function usePlantsFromGoogleSheet() {
  const [plants, setPlants] = useState<Plant[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${RANGE}?key=${API_KEY}`;
      const res = await fetch(url);
      const data = await res.json();
      if (!data.values || data.values.length === 0) {
        setPlants([]);
        setLoading(false);
        return;
      }
      // First row is headers
      const headers = data.values[0].map((h: string) => h.trim());
      const rows = data.values.slice(2);
      const mapped = rows
        .map((row: string[], idx: number) => {
          const obj: any = {};
          headers.forEach((header: string, i: number) => {
            obj[header] = row[i] || "";
          });
          return {
            id: obj["SERIAL NUMBER"] || String(idx + 1),
            name: obj["PLANT"] || "",
            scientific: obj["SCIENTIFC NAME"] || "",
            image: obj["IMAGE"] || "",
            soilType: obj["SOIL TYPE"] || "",
            location: obj["LOCATION"] || "",
            description: obj["IDENTIFICATION"] || "",
            moreInfo: obj["Moreinfo"] || "",
            moreInfoLink: obj["Moreinfo link"] || "",
            gpsLocation: obj["GPS LOCATION"] || "",
            genus: obj["GENUS"] || "",
            genotype: obj["GENOTYPE"] || "",
            phenotype: obj["PHENOTYPE"] || "",
            importance: obj["IMPORTANCE "] || "",
            localNames: obj["LOCAL NAMES"] || "",
            serial: obj["SERIAL NUMBER"] || "",
            status: obj["STATUS"] || "",
            category: obj["CATEGORY"] || "",
            floweringTime: obj["FLOWERING TIME"] || "",
          };
        })
        .filter((row: Plant) => row.name && row.scientific);
      setPlants(mapped);
      setLoading(false);
    }
    fetchData();
  }, []);

  return { plants, loading };
}
