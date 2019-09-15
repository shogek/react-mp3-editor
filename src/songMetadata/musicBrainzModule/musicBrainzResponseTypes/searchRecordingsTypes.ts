/**
 * Generated interface types, should be correct for most cases, if needed, edit manually.
 * Got around thousand responses of search results, concatenated to single array.
 * Ran through https://app.quicktype.io/?l=ts to generate typescript interfaces.
 */

export interface SearchRecordingsResult {
    created: string;
    count: number;
    offset: number;
    recordings: Recording[];
}

export interface Recording {
    id: string;
    score: number;
    title: string;
    length?: number;
    video: boolean | null;
    'artist-credit': ArtistCredit[];
    releases?: Release[];
    isrcs?: string[];
    tags?: Tag[];
    disambiguation?: string;
}

export interface ArtistCredit {
    artist: Artist;
    joinphrase?: string;
    name?: string;
}

export interface Artist {
    id: string;
    name: string;
    'sort-name': string;
    disambiguation?: string;
    aliases?: Alias[];
    'iso-3166-1-codes'?: string[];
}

export interface Alias {
    'sort-name': string;
    name: string;
    locale: null | string;
    type: Type | null;
    primary: boolean | null;
    'begin-date': null | string;
    'end-date': null | string;
    'type-id'?: string;
}

export enum Type {
    ArtistName = 'Artist name',
    LegalName = 'Legal name',
    SearchHint = 'Search hint',
}

export interface Release {
    id: string;
    count: number;
    title: string;
    status?: Status;
    'release-group': ReleaseGroup;
    'track-count': number;
    media: Media[];
    'artist-credit'?: ArtistCredit[];
    date?: string;
    country?: string;
    'release-events'?: ReleaseEvent[];
    disambiguation?: string;
}

export interface Media {
    position: number;
    format?: Format;
    track: Track[];
    'track-count': number;
    'track-offset': number;
}

export enum Format {
    CD = 'CD',
    CDR = 'CD-R',
    Cassette = 'Cassette',
    DVD = 'DVD',
    DVDVideo = 'DVD-Video',
    DigitalMedia = 'Digital Media',
    Hdcd = 'HDCD',
    Hqcd = 'HQCD',
    MiniDisc = 'MiniDisc',
    ShmCD = 'SHM-CD',
    The10Vinyl = '10" Vinyl',
    The12Vinyl = '12" Vinyl',
    The7Vinyl = '7" Vinyl',
    Vinyl = 'Vinyl',
    WaxCylinder = 'Wax Cylinder',
}

export interface Track {
    id: string;
    number: string;
    title: string;
    length?: number;
}

export interface ReleaseEvent {
    date: string;
    area: Artist;
}

export interface ReleaseGroup {
    id: string;
    'type-id'?: string;
    title: string;
    'primary-type'?: PrimaryType;
    'secondary-types'?: SecondaryType[];
    disambiguation?: string;
}

export enum PrimaryType {
    Album = 'Album',
    Broadcast = 'Broadcast',
    Ep = 'EP',
    Other = 'Other',
    Single = 'Single',
}

export enum SecondaryType {
    Audiobook = 'Audiobook',
    Compilation = 'Compilation',
    DJMix = 'DJ-mix',
    Live = 'Live',
    MixtapeStreet = 'Mixtape/Street',
    Remix = 'Remix',
    Soundtrack = 'Soundtrack',
    Spokenword = 'Spokenword',
}

export enum Status {
    Bootleg = 'Bootleg',
    Official = 'Official',
    Promotion = 'Promotion',
    PseudoRelease = 'Pseudo-Release',
}

export interface Tag {
    count: number;
    name: string;
}
