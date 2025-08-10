"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { legalAreas } from "@/mockData";
import { Button } from "./ui/button";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

export default function SearchBar({ className = "" }) {
  const [legalArea, setLegalArea] = useState("");
  const [location, setLocation] = useState("");
  const router = useRouter();

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (legalArea) params.set("area", legalArea);
    if (location) params.set("location", location);

    router.push(`/browse?${params.toString()}`);
  };

  return (
    <form
      onSubmit={handleSearch}
      className={`bg-white rounded-lg shadow-lg p-6 ${className}`}
    >
      <div className="grid items-center grid-cols-1 md:grid-cols-3 gap-4">
        {/* Legal Area Select */}
        <div>
          <label
            htmlFor="legal-area"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Legal Area
          </label>
          <select
            id="legal-area"
            value={legalArea}
            onChange={(e) => setLegalArea(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-600"
          >
            <option value="">Select Legal Area</option>
            {legalAreas.map((area) => (
              <option key={area.id} value={area.id}>
                {area.name}
              </option>
            ))}
          </select>
        </div>

        {/* Location Input */}
        <div>
          <label
            htmlFor="location"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Location
          </label>
          <input
            type="text"
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="City, State"
            className="w-full px-4 py-3 border text-gray-600 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Search Button */}
        <div className="flex items-center mt-7 ">
          <Button size="lg">
            <MagnifyingGlassIcon />
            <span>Search Lawyers</span>
          </Button>
        </div>
      </div>
    </form>
  );
}
