import React, { useEffect, useState } from "react";
import AppBar from "../components/Appbar";
import ExperienceCard from "../components/ExperienceCard";

const ExperiencesPage: React.FC = () => {
  const [experiences, setExperiences] = useState<any[]>([]);
  const [filtered, setFiltered] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        const res = await fetch("http://localhost:3000/experiences");
        const data = await res.json();
        setExperiences(data);
        setFiltered(data);
      } catch (err) {
        console.error("Failed to fetch experiences:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchExperiences();
  }, []);

  const handleSearch = (query: string) => {
    if (!query) {
      setFiltered(experiences);
    } else {
      const results = experiences.filter((exp) =>
        exp.title.toLowerCase().includes(query)
      );
      setFiltered(results);
    }
  };

  if (loading) return <div className="text-center py-10">Loading...</div>;

  return (
    <div className="min-h-screen bg-white">
      <AppBar onSearch={handleSearch} />

      <div className="max-w-6xl mx-auto px-6 py-10">
        <h1 className="text-2xl font-semibold text-gray-800 mb-6">
          Explore Experiences
        </h1>

        {filtered.length === 0 ? (
          <p className="text-gray-500">No matching experiences found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((exp) => (
              <ExperienceCard
                key={exp._id}
                id={exp._id}
                title={exp.title}
                description={exp.description}
                location={exp.location}
                price={exp.price}
                image={exp.image}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ExperiencesPage;
