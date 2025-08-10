import Link from "next/link";
import Image from "next/image";
import { MapPinIcon } from "@heroicons/react/24/outline";
import { StarIcon } from "@heroicons/react/24/solid";

export default function LawyerCard({ lawyer }) {
  const getAvailabilityColor = (availability) => {
    switch (availability) {
      case "Available":
        return "bg-green-100 text-green-800";
      case "Busy":
        return "bg-yellow-100 text-yellow-800";
      case "Offline":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 border border-gray-200">
      <div className="flex items-start flex-col space-y-4">
        {/* Profile Image */}
        <div className="relative">
          <Image
            src={lawyer.image}
            alt={lawyer.name}
            width={80}
            height={80}
            className="rounded-full object-cover"
          />
          {lawyer.verified && (
            <div className="absolute -bottom-1 -right-1 bg-blue-500 rounded-full p-1">
              <svg
                className="w-4 h-4 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          )}
        </div>

        {/* Lawyer Info */}
        <div className="w-full">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 truncate">
                {lawyer.name}
              </h3>
              <p className="text-sm text-gray-600">{lawyer.title}</p>
              <p className="text-sm text-gray-500 flex items-center mt-1">
                <MapPinIcon className="w-5" />
                {lawyer.location}
              </p>
            </div>
            <span
              className={`px-2 py-1 text-xs font-medium rounded-full ${getAvailabilityColor(
                lawyer.availability
              )}`}
            >
              {lawyer.availability}
            </span>
          </div>

          {/* Rating and Experience */}
          <div className="flex items-center space-x-4 mt-3">
            <div className="flex items-center">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <StarIcon
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(lawyer.rating)
                        ? "text-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="ml-1 text-sm text-gray-600">
                {lawyer.rating} ({lawyer.reviewCount} reviews)
              </span>
            </div>
            <span className="text-sm text-gray-600">
              {lawyer.experience} years exp.
            </span>
          </div>

          {/* Practice Areas */}
          <div className="mt-3">
            <div className="flex flex-wrap gap-1">
              {lawyer.practiceAreas.slice(0, 3).map((area, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-navy-50 text-navy-700 text-xs rounded-full"
                >
                  {area}
                </span>
              ))}
              {lawyer.practiceAreas.length > 3 && (
                <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                  +{lawyer.practiceAreas.length - 3} more
                </span>
              )}
            </div>
          </div>
          {/* Rate and Actions */}
          <div className="flex items-center  justify-between mt-4">
            <div className="text-lg font-semibold text-gray-900">
              ${lawyer.hourlyRate}/hr
            </div>
            <div className="flex space-x-2">
              <Link
                href={`/lawyer/${lawyer.id}`}
                className="px-4 py-2 text-blue-600 border border-navy-600 rounded-lg hover:bg-navy-50 transition-colors text-sm font-medium"
              >
                View Profile
              </Link>
              <Link
                href={`/booking/${lawyer.id}`}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-navy-700 transition-colors text-sm font-medium"
              >
                Book Now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
