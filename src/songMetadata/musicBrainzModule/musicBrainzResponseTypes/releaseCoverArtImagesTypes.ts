/**
 * Generated interface types, should be correct for most cases, if needed, edit manually.
 * Got a response from the api.
 * Ran through https://app.quicktype.io/?l=ts to generate typescript interfaces.
 */

export interface ReleaseImagesResponse {
    images: Image[];
    release: string;
}

export interface Image {
    types: string[];
    front: boolean;
    back: boolean;
    edit: number;
    image: string;
    comment: string;
    approved: boolean;
    id: string;
    thumbnails: Thumbnails;
}

export interface Thumbnails {
    '250': string;
    '500': string;
    '1200': string;
    small: string;
    large: string;
}
