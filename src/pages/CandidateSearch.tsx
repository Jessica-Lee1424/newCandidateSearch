import { useState, useEffect } from "react";
import { searchGithub } from "../api/API";
import { Candidate } from "../interfaces/Candidate.interface"; // Ensure Candidate is imported

const CandidateSearch = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [currentCandidate, setCurrentCandidate] = useState<Candidate | null>(null);
  const [savedCandidates, setSavedCandidates] = useState<Candidate[]>([]);
  const [loading, setLoading] = useState(false);
  const [noMoreCandidates, setNoMoreCandidates] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("savedCandidates");
    if (saved) {
      try {
        setSavedCandidates(JSON.parse(saved));
      } catch (error) {
        console.error("Error parsing saved candidates from localStorage", error);
      }
    }
    fetchCandidates();
  }, []);

  const fetchCandidates = async () => {
    setLoading(true);
    try {
      const apiResponse = await searchGithub();
      if (!Array.isArray(apiResponse)) {
        throw new Error("Invalid API response: Expected an array of candidates");
      }

      const data: Candidate[] = apiResponse.map((item: any) => ({
        id: item.id,
        login: item.login,
        avatar_url: item.avatar_url,
        html_url: item.html_url,
        name: item.name || null,
        location: item.location || null,
        email: item.email || null,
        company: item.company || null,
      }));

      setCandidates(data);
      setCurrentCandidate(data[0] || null);
      setNoMoreCandidates(data.length === 0);
    } catch (error) {
      console.error("Error fetching candidates:", error);
    } finally {
      setLoading(false);
    }
  };

  const saveCandidate = () => {
    if (currentCandidate) {
      const updatedSavedCandidates = [...savedCandidates, currentCandidate];
      setSavedCandidates(updatedSavedCandidates);
      localStorage.setItem("savedCandidates", JSON.stringify(updatedSavedCandidates));
    }
    moveToNextCandidate();
  };

  const skipCandidate = () => {
    moveToNextCandidate();
  };

  const moveToNextCandidate = () => {
    const nextIndex = candidates.indexOf(currentCandidate!) + 1;
    if (nextIndex < candidates.length) {
      setCurrentCandidate(candidates[nextIndex]);
    } else {
      setCurrentCandidate(null);
      setNoMoreCandidates(true);
    }
  };

  return (
    <div>
      <h1>Candidate Search</h1>
      <main>
        {loading && <p>Loading...</p>}
        {noMoreCandidates && <p>No more candidates available for review.</p>}

        {currentCandidate && (
          <div>
            <img
              src={currentCandidate.avatar_url}
              alt={currentCandidate.login}
              width={100}
            />
            <p>
              <strong>Name:</strong> {currentCandidate.name || "N/A"}
            </p>
            <p>
              <strong>Username:</strong> {currentCandidate.login}
            </p>
            <p>
              <strong>Location:</strong> {currentCandidate.location || "N/A"}
            </p>
            <p>
              <strong>Email:</strong> {currentCandidate.email || "N/A"}
            </p>
            <p>
              <strong>Company:</strong> {currentCandidate.company || "N/A"}
            </p>
            <button onClick={saveCandidate}>Save Candidate</button>
            <button onClick={skipCandidate}>Skip Candidate</button>
          </div>
        )}
      </main>
    </div>
  );
};

export default CandidateSearch;
