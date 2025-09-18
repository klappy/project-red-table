import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix for default markers in Leaflet with Vite
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

// Fix the default icon issue with Leaflet and bundlers
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
});

// Basic country coordinates - we'll expand this
const countryCoordinates: { [key: string]: [number, number] } = {
  // Africa
  Nigeria: [9.082, 8.6753],
  Ethiopia: [9.145, 40.4897],
  Egypt: [26.8206, 30.8025],
  Kenya: [-0.0236, 37.9062],
  "South Africa": [-30.5595, 22.9375],
  Ghana: [7.9465, -1.0232],
  Tanzania: [-6.369, 34.8888],
  Uganda: [1.3733, 32.2903],

  // Asia
  India: [20.5937, 78.9629],
  China: [35.8617, 104.1954],
  Indonesia: [-0.7893, 113.9213],
  Pakistan: [30.3753, 69.3451],
  Bangladesh: [23.685, 90.3563],
  Philippines: [12.8797, 121.774],
  Vietnam: [14.0583, 108.2772],
  Thailand: [15.87, 100.9925],
  Myanmar: [21.9162, 95.956],
  Japan: [36.2048, 138.2529],
  Nepal: [28.3949, 84.124],

  // Americas
  Brazil: [-14.235, -51.9253],
  Mexico: [23.6345, -102.5528],
  "United States": [37.0902, -95.7129],
  Colombia: [4.5709, -74.2973],
  Argentina: [-38.4161, -63.6167],
  Peru: [-9.19, -75.0152],
  Venezuela: [6.4238, -66.5897],
  Chile: [-35.6751, -71.543],
  Ecuador: [-1.8312, -78.1834],
  Guatemala: [15.7835, -90.2308],

  // Europe
  Russia: [61.524, 105.3188],
  Germany: [51.1657, 10.4515],
  "United Kingdom": [55.3781, -3.436],
  France: [46.2276, 2.2137],
  Italy: [41.8719, 12.5674],
  Spain: [40.4637, -3.7492],
  Poland: [51.9194, 19.1451],
  Romania: [45.9432, 24.9668],
  Netherlands: [52.1326, 5.2913],
  Belgium: [50.5039, 4.4699],

  // Middle East
  "Saudi Arabia": [23.8859, 45.0792],
  Iran: [32.4279, 53.688],
  Iraq: [33.2232, 43.6793],
  Yemen: [15.5527, 48.5164],
  Syria: [34.8021, 38.9968],
  Jordan: [30.5852, 36.2384],
  Israel: [31.0461, 34.8516],

  // Oceania
  Australia: [-25.2744, 133.7751],
  "New Zealand": [-40.9006, 174.886],
  "Papua New Guinea": [-6.315, 143.9555],
  Fiji: [-17.7134, 178.065],

  // Add common alternative names
  USA: [37.0902, -95.7129],
  UK: [55.3781, -3.436],
  UAE: [23.4241, 53.8478],
  DRC: [-4.0383, 21.7587],
  "Democratic Republic of the Congo": [-4.0383, 21.7587],
};

interface LanguageMapProps {
  languages: any[];
  allLanguages?: any[];
  color?: string;
}

export function LanguageMap({ languages, allLanguages, color = "#c1d72e" }: LanguageMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    // Initialize the map
    const map = L.map(mapRef.current, {
      center: [20, 0],
      zoom: 2,
      minZoom: 2,
      maxZoom: 8,
      worldCopyJump: true,
    });

    // Add base tiles
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19,
    }).addTo(map);

    mapInstanceRef.current = map;

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (!mapInstanceRef.current) return;

    const map = mapInstanceRef.current;

    // Clear existing markers
    map.eachLayer((layer) => {
      if (layer instanceof L.Marker || layer instanceof L.CircleMarker) {
        map.removeLayer(layer);
      }
    });

    // First, group ALL languages by country to get total counts
    const allLanguagesByCountry = (allLanguages || languages).reduce((acc: any, lang) => {
      const country = lang["Country"] || lang["country"] || "Unknown";
      if (!acc[country]) {
        acc[country] = {
          total: 0,
          totalPopulation: 0,
        };
      }
      acc[country].total++;
      acc[country].totalPopulation += Number(lang["First Language Population"]) || 0;
      return acc;
    }, {});

    // Then group FILTERED languages by country for current view
    const languagesByCountry = languages.reduce((acc: any, lang) => {
      const country = lang["Country"] || lang["country"] || "Unknown";
      if (!acc[country]) {
        acc[country] = {
          languages: [],
          totalPopulation: 0,
          atRisk: 0,
          completed: 0,
          totalCount: allLanguagesByCountry[country]?.total || 0,
          totalCountryPopulation: allLanguagesByCountry[country]?.totalPopulation || 0,
        };
      }

      acc[country].languages.push(lang);
      acc[country].totalPopulation += Number(lang["First Language Population"]) || 0;

      // Check if at risk or completed
      const status = lang["All Access Status"] || lang["Access Status"] || "";
      if (status.toLowerCase().includes("goal met")) {
        acc[country].completed++;
      } else {
        acc[country].atRisk++;
      }

      return acc;
    }, {});

    // Add markers for each country
    Object.entries(languagesByCountry).forEach(([country, data]: [string, any]) => {
      const coords = countryCoordinates[country];

      if (coords) {
        // Calculate marker size based on number of languages
        const size = Math.min(Math.max(10, data.languages.length * 2), 40);

        // Create a circle marker instead of default marker for better visualization
        const marker = L.circleMarker(coords, {
          radius: size / 2,
          fillColor: data.atRisk > 0 ? color : "#52b202",
          color: "#fff",
          weight: 2,
          opacity: 1,
          fillOpacity: 0.7,
        }).addTo(map);

        // Create popup content
        const popupContent = `
          <div style="min-width: 200px; font-family: 'IBM Plex Sans', sans-serif;">
            <h3 style="margin: 0 0 10px 0; font-size: 16px; font-weight: 600;">${country}</h3>
            <div style="display: flex; flex-direction: column; gap: 5px; font-size: 14px;">
              <div><strong>Total Languages:</strong> ${data.totalCount}</div>
              ${
                data.languages.length < data.totalCount 
                  ? `<div style="font-size: 12px; color: #525252;"><em>Showing ${data.languages.length} (filtered)</em></div>`
                  : ""
              }
              ${
                data.atRisk > 0
                  ? `<div style="color: #da1e28;"><strong>At Risk:</strong> ${data.atRisk}</div>`
                  : ""
              }
              ${
                data.completed > 0
                  ? `<div style="color: #24a148;"><strong>Goal Met:</strong> ${data.completed}</div>`
                  : ""
              }
              <div><strong>Population (filtered):</strong> ${data.totalPopulation.toLocaleString()}</div>
            </div>
            <hr style="margin: 10px 0; border: none; border-top: 1px solid #e0e0e0;">
            <details style="cursor: pointer;">
              <summary style="font-weight: 600; margin-bottom: 5px;">Languages Shown (${
                data.languages.length
              }${data.languages.length < data.totalCount ? ` of ${data.totalCount}` : ''})</summary>
              <div style="max-height: 200px; overflow-y: auto; margin-top: 5px;">
                ${data.languages
                  .map((lang: any) => {
                    const status = lang["All Access Status"] || lang["Access Status"] || "Unknown";
                    const statusColor = status.toLowerCase().includes("goal met")
                      ? "#24a148"
                      : "#da1e28";
                    return `
                    <div style="padding: 5px 0; border-bottom: 1px solid #f4f4f4;">
                      <div style="font-weight: 500;">${
                        lang["Language"] || lang["Language Name"] || "Unknown"
                      }</div>
                      <div style="font-size: 12px; color: #525252;">
                        Pop: ${(Number(lang["First Language Population"]) || 0).toLocaleString()}
                      </div>
                      <div style="font-size: 12px; color: ${statusColor};">
                        ${status}
                      </div>
                    </div>
                  `;
                  })
                  .join("")}
              </div>
            </details>
          </div>
        `;

        marker.bindPopup(popupContent, {
          maxWidth: 300,
          maxHeight: 400,
        });

        // Add tooltip for hover
        marker.bindTooltip(
          `${country}: ${data.totalCount} language${data.totalCount !== 1 ? "s" : ""}${
            data.languages.length < data.totalCount ? ` (showing ${data.languages.length})` : ""
          }`,
          {
            permanent: false,
            direction: "top",
          }
        );
      }
    });

    // Add a legend
    const legend = new L.Control({ position: "bottomright" });
    (legend as any).onAdd = function () {
      const div = L.DomUtil.create("div", "info legend");
      div.style.background = "white";
      div.style.padding = "10px";
      div.style.borderRadius = "5px";
      div.style.boxShadow = "0 0 15px rgba(0,0,0,0.2)";
      div.innerHTML = `
        <div style="font-family: 'IBM Plex Sans', sans-serif; font-size: 12px;">
          <div style="margin-bottom: 5px;"><strong>Language Status</strong></div>
          <div style="display: flex; align-items: center; gap: 5px; margin-bottom: 3px;">
            <span style="display: inline-block; width: 12px; height: 12px; background: ${color}; border-radius: 50%;"></span>
            <span>At Risk</span>
          </div>
          <div style="display: flex; align-items: center; gap: 5px;">
            <span style="display: inline-block; width: 12px; height: 12px; background: #52b202; border-radius: 50%;"></span>
            <span>Goal Met</span>
          </div>
          <div style="margin-top: 8px; padding-top: 8px; border-top: 1px solid #e0e0e0;">
            <div style="color: #8d8d8d;">Circle size = # of languages</div>
          </div>
        </div>
      `;
      return div;
    };
    legend.addTo(map);

    // Clean up legend on next render
    return () => {
      map.removeControl(legend);
    };
  }, [languages, allLanguages, color]);

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        minHeight: "600px",
        borderRadius: "4px",
        overflow: "hidden",
      }}
    >
      <div ref={mapRef} style={{ width: "100%", height: "100%" }} />
      {languages.length === 0 && (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            background: "rgba(255, 255, 255, 0.9)",
            padding: "20px",
            borderRadius: "8px",
            textAlign: "center",
          }}
        >
          <p style={{ margin: 0, fontSize: "16px", color: "#525252" }}>
            No languages to display on map
          </p>
          <p style={{ margin: "5px 0 0 0", fontSize: "14px", color: "#8d8d8d" }}>
            Try adjusting your filters
          </p>
        </div>
      )}
    </div>
  );
}
