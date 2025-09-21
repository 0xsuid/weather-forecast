"use client";

import React, { useState, useEffect } from "react";
import { MapPin, ChevronDown } from "lucide-react";
import { Input } from "./ui/input";
import { useDebouncedCallback } from 'use-debounce';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';

interface GeocodeResult {
  name: string;
  latitude: number;
  longitude: number;
  country?: string;
  admin1?: string;
}

interface WeatherSearchProps {
  locationName: string;
}

const DEBOUNCE_DELAY = 300;

export const WeatherSearch: React.FC<WeatherSearchProps> = ({ locationName }) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const [query, setQuery] = useState("");
  const [locationLabel, setLocationLabel] = useState(locationName);
  const [suggestions, setSuggestions] = useState<GeocodeResult[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState(false);

  const handleLocationSelect = React.useCallback(
    async ( latitude: number, longitude: number, locationName: string ) => {
      // For now, just reload the page with new coordinates
      // This is a simple solution that follows Next.js patterns
      const params = new URLSearchParams(searchParams);

      if(latitude && longitude) {
        params.set('latitude', latitude.toString());
        params.set('longitude', longitude.toString());
      }

      if(locationName) {
        params.set('locationName', locationName);
      }

      replace(`${pathname}?${params.toString()}`);
    },
    [searchParams, pathname, replace]
  );

  // Debounced geocoding search function
  const debouncedSearch = useDebouncedCallback(async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setSuggestions([]);
      setShowDropdown(false);
      return;
    }

    try {
      const res = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
          searchQuery
        )}&count=5&language=en&format=json`
      );
      const data = await res.json();

      if (data.results) {
        setSuggestions(data.results as GeocodeResult[]);
        setShowDropdown(true);
      }
    } catch (err) {
      console.error("Geocoding error:", err);
    }
  }, DEBOUNCE_DELAY); 

  // Trigger debounced search when query changes
  useEffect(() => {
    debouncedSearch(query);
  }, [query, debouncedSearch]);

  const selectSuggestion = (suggestion: GeocodeResult) => {
    const label = `${suggestion.name}${
      suggestion.admin1 ? ", " + suggestion.admin1 : ""
    }${suggestion.country ? ", " + suggestion.country : ""}`;
    
    setQuery("");
    setLocationLabel(label);
    setShowDropdown(false);
    setSuggestions([]);
    
    handleLocationSelect(
      suggestion.latitude,
      suggestion.longitude,
      label
    );
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    if (suggestions.length > 0) {
      selectSuggestion(suggestions[0]);
      return;
    }

    try {
      const res = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
          query
        )}&count=1&language=en&format=json`
      );
      const data = await res.json();

      if (!data.results || data.results.length === 0) {
        throw new Error("Location not found");
      }
      
      selectSuggestion(data.results[0] as GeocodeResult);
    } catch (err) {
      console.error("Search error:", err);
      // Error will be handled by parent component
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent, suggestion: GeocodeResult) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      selectSuggestion(suggestion);
    }
  };

  return (
    <div className="flex items-center justify-center mb-4">
      <form onSubmit={handleSearch} className="relative">
        <div className="relative flex items-center bg-white/10 rounded-full px-4 py-2 backdrop-blur-lg border border-white/20 shadow-lg w-fit max-w-none">
          <MapPin className="w-4 h-4 text-white/80 mr-2" aria-hidden="true" />
          <Input
            value={isInputFocused ? query : locationLabel}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search location..."
            onFocus={() => {
              setIsInputFocused(true);
              setQuery("");
              if (suggestions.length > 0) {
                setShowDropdown(true);
              }
            }}
            onBlur={() => {
              setIsInputFocused(false);
            }}
            className="bg-transparent border-none text-white text-sm px-0 py-0 focus:ring-0 focus:outline-none whitespace-nowrap h-auto placeholder:text-white/60"
            style={{
              width: `${Math.max(
                20,
                (isInputFocused
                  ? query
                  : locationLabel
                ).length
              )}ch`,
            }}
            role="combobox"
            aria-label="Search for a location"
            aria-expanded={showDropdown}
            aria-haspopup="listbox"
            aria-autocomplete="list"
            aria-controls="location-suggestions"
          />
          <ChevronDown className="w-4 h-4 text-white/80 ml-2" aria-hidden="true" />
          
          {showDropdown && suggestions.length > 0 && (
            <ul
              id="location-suggestions"
              className="absolute top-full left-0 right-0 mt-1 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl shadow-2xl max-h-60 overflow-y-auto z-20 min-w-max"
              role="listbox"
              aria-label="Location suggestions"
            >
              {suggestions.map((suggestion, index) => (
                <li
                  key={`${suggestion.latitude}-${suggestion.longitude}-${index}`}
                  onClick={() => selectSuggestion(suggestion)}
                  onKeyDown={(e) => handleKeyDown(e, suggestion)}
                  className="px-4 py-3 hover:bg-white/20 cursor-pointer text-sm transition-colors duration-150 whitespace-nowrap text-white focus:bg-white/20 focus:outline-none"
                  role="option"
                  aria-selected="false"
                  tabIndex={0}
                >
                  <span className="text-white font-medium">{suggestion.name}</span>
                  {suggestion.admin1 && (
                    <span className="text-white/70">, {suggestion.admin1}</span>
                  )}
                  {suggestion.country && (
                    <span className="text-white/70">, {suggestion.country}</span>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      </form>
    </div>
  );
};

export default WeatherSearch;
