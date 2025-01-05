// interface for the Candidate objects returned by the API

export interface Candidate {
    id: number;
    login: string; // GitHub username
    name?: string;
    location?: string;
    avatar_url: string; // Avatar image URL
    email?: string;
    html_url: string; // URL to the GitHub profile
    company?: string;
    bio?: string;
  }
  