// Define the Candidate interface based on the GitHub API response
interface Candidate {
  id: number;
  login: string;
  avatar_url: string; // GitHub user avatar URL
  html_url: string; // GitHub profile URL
  name?: string; // Optional: User's name
  location?: string; // Optional: User's location
  email?: string; // Optional: User's email
  company?: string; // Optional: User's company
}

// Fetch a list of GitHub users
const searchGithub = async (): Promise<Candidate[]> => {
  const start = Math.floor(Math.random() * 100000000) + 1; // Random starting user ID
  const url = `https://api.github.com/users?=${start}`;
  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`, // Ensure token is correct
      },
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    // Validate and return the data
    if (Array.isArray(data)) {
      return data.map((user) => ({
        id: user.id,
        login: user.login,
        avatar_url: user.avatar_url,
        html_url: user.html_url,
      }));
    }

    throw new Error("Invalid API response structure");
  } catch (err) {
    console.error("Error fetching GitHub users:", err);
    return [];
  }
};

// Example usage
searchGithub().then((users) => console.log(users));

// Fetch a specific GitHub user by username
const searchGithubUser = async (username: string): Promise<Candidate> => {
  const url = `https://api.github.com/users/${username}`;
  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`, // Ensure token is correct
      },
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    // Validate and return the data
    return {
      id: data.id,
      login: data.login,
      avatar_url: data.avatar_url,
      html_url: data.html_url,
      name: data.name || null,
      location: data.location || null,
      email: data.email || null,
      company: data.company || null,
    };
  } catch (err) {
    console.error(`Error fetching GitHub user "${username}":`, err);
    return {} as Candidate; // Return an empty object of type Candidate
  }
};

export { searchGithub, searchGithubUser };