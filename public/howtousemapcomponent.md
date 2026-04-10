we need to integrate the regions in the map this is how to use the markers "import {
  Map,
  MapMarker,
  MarkerContent,
  MarkerLabel,
  MarkerPopup,
} from "@/components/ui/map";
import { Button } from "@/components/ui/button";
import { Star, Navigation, Clock, ExternalLink } from "lucide-react";
import Image from "next/image";

const places = [
  {
    id: 1,
    name: "The Metropolitan Museum of Art",
    label: "Museum",
    category: "Museum",
    rating: 4.8,
    reviews: 12453,
    hours: "10:00 AM - 5:00 PM",
    image:
      "https://images.unsplash.com/photo-1575223970966-76ae61ee7838?w=300&h=200&fit=crop",
    lng: -73.9632,
    lat: 40.7794,
  },
  {
    id: 2,
    name: "Brooklyn Bridge",
    label: "Landmark",
    category: "Landmark",
    rating: 4.9,
    reviews: 8234,
    hours: "Open 24 hours",
    image:
      "https://images.unsplash.com/photo-1496588152823-86ff7695e68f?w=300&h=200&fit=crop",
    lng: -73.9969,
    lat: 40.7061,
  },
  {
    id: 3,
    name: "Grand Central Terminal",
    label: "Transit",
    category: "Transit",
    rating: 4.7,
    reviews: 5621,
    hours: "5:15 AM - 2:00 AM",
    image:
      "https://images.unsplash.com/photo-1534430480872-3498386e7856?w=300&h=200&fit=crop",
    lng: -73.9772,
    lat: 40.7527,
  },
];

export function PopupExample() {
  return (
    <div className="h-[500px] w-full">
      <Map center={[-73.98, 40.74]} zoom={11}>
        {places.map((place) => (
          <MapMarker key={place.id} longitude={place.lng} latitude={place.lat}>
            <MarkerContent>
              <div className="size-5 rounded-full bg-rose-500 border-2 border-white shadow-lg cursor-pointer hover:scale-110 transition-transform" />
              <MarkerLabel position="bottom">{place.label}</MarkerLabel>
            </MarkerContent>
            <MarkerPopup className="p-0 w-62">
              <div className="relative h-32 overflow-hidden rounded-t-md">
                <Image
                  fill
                  src={place.image}
                  alt={place.name}
                  className="object-cover"
                />
              </div>
              <div className="space-y-2 p-3">
                <div>
                  <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                    {place.category}
                  </span>
                  <h3 className="font-semibold text-foreground leading-tight">
                    {place.name}
                  </h3>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <div className="flex items-center gap-1">
                    <Star className="size-3.5 fill-amber-400 text-amber-400" />
                    <span className="font-medium">{place.rating}</span>
                    <span className="text-muted-foreground">
                      ({place.reviews.toLocaleString()})
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                  <Clock className="size-3.5" />
                  <span>{place.hours}</span>
                </div>
                <div className="flex gap-2 pt-1">
                  <Button size="sm" className="flex-1 h-8">
                    <Navigation className="size-3.5 mr-1.5" />
                    Directions
                  </Button>
                  <Button size="sm" variant="outline" className="h-8">
                    <ExternalLink className="size-3.5" />
                  </Button>
                </div>
              </div>
            </MarkerPopup>
          </MapMarker>
        ))}
      </Map>
    </div>
  );
}
" use the @beautifulMentionto add all the markers; to use popups use this code ""use client";

import { useState } from "react";
import { Map, MapPopup } from "@/components/ui/map";
import { Button } from "@/components/ui/button";

export function StandalonePopupExample() {
  const [showPopup, setShowPopup] = useState(true);

  return (
    <div className="h-[400px] w-full relative">
      <Map center={[-74.006, 40.7128]} zoom={13}>
        {showPopup && (
          <MapPopup
            longitude={-74.006}
            latitude={40.7128}
            onClose={() => setShowPopup(false)}
            closeButton
            focusAfterOpen={false}
            closeOnClick={false}
            className="w-62"
          >
            <div className="space-y-2">
              <h3 className="font-semibold text-foreground">New York City</h3>
              <p className="text-sm text-muted-foreground">
                The city that never sleeps. Population: 8.3 million
              </p>
              <Button
                size="sm"
                variant="outline"
                className="w-full"
                onClick={() => setShowPopup(false)}
              >
                Close
              </Button>
            </div>
          </MapPopup>
        )}
      </Map>

      {!showPopup && (
        <Button
          size="sm"
          className="absolute bottom-4 left-4 z-10"
          onClick={() => setShowPopup(true)}
        >
          Show Popup
        </Button>
      )}
    </div>
  );
}
" for clusters ""use client";

import { useState } from "react";
import { Map, MapClusterLayer, MapPopup, MapControls } from "@/components/ui/map";

interface EarthquakeProperties {
  mag: number;
  place: string;
  tsunami: number;
}

export default function ClusterExample() {
  const [selectedPoint, setSelectedPoint] = useState<{
    coordinates: [number, number];
    properties: EarthquakeProperties;
  } | null>(null);

  return (
    <div className="h-[400px] w-full">
      <Map center={[-103.59, 40.66]} zoom={3.4} fadeDuration={0}>
        <MapClusterLayer<EarthquakeProperties>
          data="https://maplibre.org/maplibre-gl-js/docs/assets/earthquakes.geojson"
          clusterRadius={50}
          clusterMaxZoom={14}
          clusterColors={["#1d8cf8", "#6d5dfc", "#e23670"]}
          pointColor="#1d8cf8"
          onPointClick={(feature, coordinates) => {
            setSelectedPoint({
              coordinates,
              properties: feature.properties,
            });
          }}
        />

        {selectedPoint && (
          <MapPopup
            key={`${selectedPoint.coordinates[0]}-${selectedPoint.coordinates[1]}`}
            longitude={selectedPoint.coordinates[0]}
            latitude={selectedPoint.coordinates[1]}
            onClose={() => setSelectedPoint(null)}
            closeOnClick={false}
            focusAfterOpen={false}
            closeButton
          >
            <div className="space-y-1 p-1">
              <p className="text-sm">
                Magnitude: {selectedPoint.properties.mag}
              </p>
              <p className="text-sm">
                Tsunami:{" "}
                {selectedPoint.properties?.tsunami === 1 ? "Yes" : "No"}
              </p>
            </div>
          </MapPopup>
        )}

        <MapControls />
      </Map>
    </div>
  );
}
" for othere advanced feature ""use client";

import { useEffect, useState } from "react";
import { Map, useMap } from "@/components/ui/map";
import { Button } from "@/components/ui/button";
import { RotateCcw, Mountain } from "lucide-react";

function MapController() {
  const { map, isLoaded } = useMap();
  const [pitch, setPitch] = useState(0);
  const [bearing, setBearing] = useState(0);

  useEffect(() => {
    if (!map || !isLoaded) return;

    const handleMove = () => {
      setPitch(Math.round(map.getPitch()));
      setBearing(Math.round(map.getBearing()));
    };

    map.on("move", handleMove);
    return () => {
      map.off("move", handleMove);
    };
  }, [map, isLoaded]);

  const handle3DView = () => {
    map?.easeTo({
      pitch: 60,
      bearing: -20,
      duration: 1000,
    });
  };

  const handleReset = () => {
    map?.easeTo({
      pitch: 0,
      bearing: 0,
      duration: 1000,
    });
  };

  if (!isLoaded) return null;

  return (
    <div className="absolute top-3 left-3 z-10 flex flex-col gap-2">
      <div className="flex gap-2">
        <Button size="sm" variant="secondary" onClick={handle3DView}>
          <Mountain className="size-4 mr-1.5" />
          3D View
        </Button>
        <Button size="sm" variant="secondary" onClick={handleReset}>
          <RotateCcw className="size-4 mr-1.5" />
          Reset
        </Button>
      </div>
      <div className="rounded-md bg-background/90 backdrop-blur px-3 py-2 text-xs font-mono border">
        <div>Pitch: {pitch}°</div>
        <div>Bearing: {bearing}°</div>
      </div>
    </div>
  );
}

export function AdvancedUsageExample() {
  return (
    <div className="h-[400px] w-full">
      <Map center={[-73.9857, 40.7484]} zoom={15}>
        <MapController />
      </Map>
    </div>
  );
}
"