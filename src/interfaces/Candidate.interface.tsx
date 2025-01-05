export interface Candidate {
    login: string; // GitHub username
    id: number;
    avatar_url: string; // Avatar image URL
    html_url: string; // URL to the GitHub profile
    name?: string; // Optional, as it may not be available
    location?: string; // Optional, as it may not be available
    email?: string; // Optional, as it may not be available
    company?: string; // Optional, as it may not be available
    bio?: string; // Optional, as it may not be available
}