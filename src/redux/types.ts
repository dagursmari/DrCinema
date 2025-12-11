// ==========================================
// MAIN API TYPES - Based on actual API response
// ==========================================

export interface Movie {
  _id: string;
  id: number;
  ids: {
    imdb: string;
    rotten: string | null;
    tmdb: string | null;
  };
  title: string;
  alternativeTitles: string;
  year: string;
  durationMinutes: number;
  genres: Genre[];
  poster: string;
  actors_abridged: Person[];
  directors_abridged: Person[];
  ratings: Ratings;
  showtimes: Showtime[];
  certificate: Certificate;
  trailers: TrailerCollection[];
  omdb: OmdbData[];
  plot: string;
}

export interface Genre {
  ID: number;
  Name: string;           // Icelandic name: "Spennumynd"
  "NameEN\t": string;     // English name with tab: "Action"
}

export interface Person {
  name: string;
}

export interface Ratings {
  imdb: string;                    // "8.5"
  rotten_audience: string | null;
  rotten_critics: string | null;
}

export interface Showtime {
  cinema: {
    id: number;
    name: string;
  };
  schedule: ShowtimeSchedule[];
}

export interface ShowtimeSchedule {
  time: string;              // "18:00 (3D )"
  purchase_url: string;
}

export interface Certificate {
  is: string;      // "12 ára"
  color: string;   // "yellow"
  number: string;  // "12"
}

export interface TrailerCollection {
  id: number;
  results: TrailerResult[];
}

export interface TrailerResult {
  id: string;
  iso_639_1: string;
  iso_3166_1: string;
  key: string;           // YouTube video ID: "43NWzay3W4s"
  name: string;          // "Official Trailer 1"
  site: string;          // "YouTube"
  size: number;          // 1080
  type: string;          // "Trailer"
}

export interface OmdbData {
  Title: string;
  Year: string;
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Language: string;
  Country: string;
  Awards: string;
  Poster: string;
  Metascore: string;
  imdbRating: string;
  imdbVotes: string;
  imdbID: string;
  Type: string;
  tomatoMeter: string;
  tomatoImage: string;
  tomatoRating: string;
  tomatoReviews: string;
  tomatoFresh: string;
  tomatoRotten: string;
  tomatoConsensus: string;
  tomatoUserMeter: string;
  tomatoUserRating: string;
  tomatoUserReviews: string;
  tomatoURL: string;
  DVD: string;
  BoxOffice: string;
  Production: string;
  Website: string;
  Response: string;
}

// ==========================================
// CINEMA TYPES
// ==========================================

export interface Cinema {
  id: number;
  name: string;
  address: string;
  city: string;
  phone: string;
  website: string;
  description: string;
  google_map: string;
}

// ==========================================
// UPCOMING MOVIE TYPES
// ==========================================

export interface UpcomingMovie {
  _id: string;
  id: number;
  ids: {
    imdb: string;
    rotten: string | null;
    tmdb: string | null;
  };
  title: string;
  alternativeTitles: string;
  year: string;
  "release-dateIS": string;  // ISO date: "2016-06-08"
  genres: Genre[];
  actors_abridged: Person[];
  directors_abridged: Person[];
  trailers?: TrailerCollection[];
  omdb?: OmdbData[];
  plot?: string;
  poster: string;
}

// ==========================================
// ADDITIONAL IMAGE TYPES (from /images endpoint)
// ==========================================

export interface ImageData {
  imdbid: string;
  results: {
    id: number;
    backdrops: ImageItem[];
    posters: ImageItem[];
  };
}

export interface ImageItem {
  aspect_ratio: number;
  file_path: string;
  height: number;
  iso_639_1: string | null;
  vote_average: number;
  vote_count: number;
  width: number;
}

// ==========================================
// SEARCH TYPES
// ==========================================

export interface SearchResult {
  success: boolean;
  query: string;
  count: number;
  returned: number;
  results: (Movie | UpcomingMovie)[];
}

// ==========================================
// REDUX STATE TYPES
// ==========================================

export interface MoviesState {
  movies: Movie[];
  loading: boolean;
  error: string | null;
}

export interface CinemasState {
  cinemas: Cinema[];
  loading: boolean;
  error: string | null;
}

export interface UpcomingState {
  upcomingMovies: UpcomingMovie[];
  loading: boolean;
  error: string | null;
}

export interface GenresState {
  genres: Genre[];
  loading: boolean;
  error: string | null;
}

export interface FavoritesState {
  favorites: Movie[];
  loading: boolean;
}

// ==========================================
// FILTER TYPES (for Home screen filtering)
// ==========================================

export interface MovieFilters {
  title?: string;
  imdbRating?: number;
  showtimeFrom?: string;    // "20:00"
  showtimeTo?: string;      // "22:00"
  actor?: string;
  director?: string;
  certificate?: string;     // "12"
}

// Auth Types
export interface User {
  id: string;
  email: string;
  name: string;
  profileImage?: string;
  createdAt?: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  name: string;
  confirmPassword?: string;
  profileImage?: string;
}

export interface UpdateProfileData {
  name?: string;
  profileImage?: string;
}

export interface UserStats {
  favoritesCount: number;
  bookingsCount: number;
}