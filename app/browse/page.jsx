"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LawyerCard from "@/components/LawyerCard";
import { mockLawyers, legalAreas } from "@/mockData";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

export default function BrowseLawyers() {
  const searchParams = useSearchParams();
  const [lawyers, setLawyers] = useState(mockLawyers);
  const [filters, setFilters] = useState({
    legalArea: searchParams.get("area") || "all",
    location: searchParams.get("location") || "",
    minRating: 0,
    maxRate: 1000,
    availability: "any",
    experience: 0,
  });
  const [sortBy, setSortBy] = useState("rating");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    let filteredLawyers = [...mockLawyers];

    // Apply filters
    if (filters.legalArea !== "all") {
      filteredLawyers = filteredLawyers.filter((lawyer) =>
        lawyer.practiceAreas.some(
          (area) =>
            area.toLowerCase().includes(filters.legalArea.toLowerCase()) ||
            legalAreas
              .find((la) => la.id === filters.legalArea)
              ?.name.toLowerCase()
              .includes(area.toLowerCase())
        )
      );
    }

    if (filters.location) {
      filteredLawyers = filteredLawyers.filter((lawyer) =>
        lawyer.location.toLowerCase().includes(filters.location.toLowerCase())
      );
    }

    if (filters.minRating > 0) {
      filteredLawyers = filteredLawyers.filter(
        (lawyer) => lawyer.rating >= filters.minRating
      );
    }

    if (filters.maxRate < 1000) {
      filteredLawyers = filteredLawyers.filter(
        (lawyer) => lawyer.hourlyRate <= filters.maxRate
      );
    }

    if (filters.availability !== "any") {
      filteredLawyers = filteredLawyers.filter(
        (lawyer) => lawyer.availability === filters.availability
      );
    }

    if (filters.experience > 0) {
      filteredLawyers = filteredLawyers.filter(
        (lawyer) => lawyer.experience >= filters.experience
      );
    }

    // Apply sorting
    switch (sortBy) {
      case "rating":
        filteredLawyers.sort((a, b) => b.rating - a.rating);
        break;
      case "experience":
        filteredLawyers.sort((a, b) => b.experience - a.experience);
        break;
      case "rate-low":
        filteredLawyers.sort((a, b) => a.hourlyRate - b.hourlyRate);
        break;
      case "rate-high":
        filteredLawyers.sort((a, b) => b.hourlyRate - a.hourlyRate);
        break;
      case "reviews":
        filteredLawyers.sort((a, b) => b.reviewCount - a.reviewCount);
        break;
    }

    setLawyers(filteredLawyers);
    setCurrentPage(1); // Reset to first page when filters or sort change
  }, [filters, sortBy]);

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({
      legalArea: "all",
      location: "",
      minRating: 0,
      maxRate: 1000,
      availability: "any",
      experience: 0,
    });
  };

  // Pagination logic
  const totalPages = Math.ceil(lawyers.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentLawyers = lawyers.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const nextPage = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Page Header */}
      <div className="bg-blue-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Browse Lawyers
          </h1>
          <p className="text-xl text-blue-100">
            Find the perfect lawyer for your legal needs from our verified
            professionals.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-1/4">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
                <Button
                  variant="outline"
                  onClick={clearFilters}
                  className="text-sm text-blue-600 hover:text-blue-700"
                >
                  Clear All
                </Button>
              </div>

              {/* Legal Area Filter */}
              <div className="mb-6">
                <Label
                  htmlFor="legalArea"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Legal Area
                </Label>
                <Select
                  value={filters.legalArea}
                  onValueChange={(value) =>
                    handleFilterChange("legalArea", value)
                  }
                >
                  <SelectTrigger id="legalArea" className="w-full">
                    <SelectValue placeholder="All Areas" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Areas</SelectItem>
                    {legalAreas.map((area) => (
                      <SelectItem key={area.id} value={area.id}>
                        {area.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Location Filter */}
              <div className="mb-6">
                <Label
                  htmlFor="location"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Location
                </Label>
                <Input
                  id="location"
                  type="text"
                  value={filters.location}
                  onChange={(e) =>
                    handleFilterChange("location", e.target.value)
                  }
                  placeholder="City, State"
                  className="w-full"
                />
              </div>

              {/* Rating Filter */}
              <div className="mb-6">
                <Label
                  htmlFor="minRating"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Minimum Rating
                </Label>
                <Select
                  value={filters.minRating.toString()}
                  onValueChange={(value) =>
                    handleFilterChange("minRating", Number(value))
                  }
                >
                  <SelectTrigger id="minRating" className="w-full">
                    <SelectValue placeholder="Any Rating" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0">Any Rating</SelectItem>
                    <SelectItem value="4">4+ Stars</SelectItem>
                    <SelectItem value="4.5">4.5+ Stars</SelectItem>
                    <SelectItem value="4.8">4.8+ Stars</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Rate Filter */}
              <div className="mb-6">
                <Label
                  htmlFor="maxRate"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Maximum Hourly Rate
                </Label>
                <Select
                  value={filters.maxRate.toString()}
                  onValueChange={(value) =>
                    handleFilterChange("maxRate", Number(value))
                  }
                >
                  <SelectTrigger id="maxRate" className="w-full">
                    <SelectValue placeholder="Any Rate" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1000">Any Rate</SelectItem>
                    <SelectItem value="200">Under $200/hr</SelectItem>
                    <SelectItem value="300">Under $300/hr</SelectItem>
                    <SelectItem value="400">Under $400/hr</SelectItem>
                    <SelectItem value="500">Under $500/hr</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Availability Filter */}
              <div className="mb-6">
                <Label
                  htmlFor="availability"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Availability
                </Label>
                <Select
                  value={filters.availability}
                  onValueChange={(value) =>
                    handleFilterChange("availability", value)
                  }
                >
                  <SelectTrigger id="availability" className="w-full">
                    <SelectValue placeholder="Any Availability" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">Any Availability</SelectItem>
                    <SelectItem value="Available">Available</SelectItem>
                    <SelectItem value="Busy">Busy</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Experience Filter */}
              <div className="mb-6">
                <Label
                  htmlFor="experience"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Minimum Experience
                </Label>
                <Select
                  value={filters.experience.toString()}
                  onValueChange={(value) =>
                    handleFilterChange("experience", Number(value))
                  }
                >
                  <SelectTrigger id="experience" className="w-full">
                    <SelectValue placeholder="Any Experience" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0">Any Experience</SelectItem>
                    <SelectItem value="5">5+ Years</SelectItem>
                    <SelectItem value="10">10+ Years</SelectItem>
                    <SelectItem value="15">15+ Years</SelectItem>
                    <SelectItem value="20">20+ Years</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="lg:w-3/4">
            {/* Results Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  {lawyers.length} Lawyers Found
                </h2>
                <p className="text-gray-600 mt-1">
                  Showing results based on your criteria
                </p>
              </div>

              <div className="mt-4 sm:mt-0">
                <Label
                  htmlFor="sortBy"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Sort by
                </Label>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger id="sortBy" className="w-full">
                    <SelectValue placeholder="Highest Rated" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="rating">Highest Rated</SelectItem>
                    <SelectItem value="experience">Most Experienced</SelectItem>
                    <SelectItem value="reviews">Most Reviews</SelectItem>
                    <SelectItem value="rate-low">Lowest Rate</SelectItem>
                    <SelectItem value="rate-high">Highest Rate</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Lawyers Grid */}
            {currentLawyers.length > 0 ? (
              <div className="space-y-6">
                {currentLawyers.map((lawyer) => (
                  <LawyerCard key={lawyer.id} lawyer={lawyer} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <svg
                  className="w-16 h-16 text-gray-400 mx-auto mb-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No lawyers found
                </h3>
                <p className="text-gray-600 mb-4">
                  Try adjusting your filters to see more results.
                </p>
                <button
                  onClick={clearFilters}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            )}

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-8">
                <button
                  onClick={prevPage}
                  disabled={currentPage === 1}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300 transition-colors"
                >
                  Previous
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <button
                      key={page}
                      onClick={() => paginate(page)}
                      className={`px-4 py-2 rounded-lg ${
                        currentPage === page
                          ? "bg-blue-600 text-white"
                          : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                      } transition-colors`}
                    >
                      {page}
                    </button>
                  )
                )}
                <button
                  onClick={nextPage}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300 transition-colors"
                >
                  Next
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
