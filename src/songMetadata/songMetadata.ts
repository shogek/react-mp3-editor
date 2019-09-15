import {
    SearchReleasesFields,
    musicBrainzClient,
    SearchReleasesCriteria,
    coverArtArchiveClient,
    Recording,
} from './musicBrainzModule';

export interface ISongMetadataMatchedResult {
    title: string;
    artists: string[];
    artistsDisplayName: string;
    date: string;
    album: string;
    disambiguation: string;
    releaseId?: string;
}

export interface ICoverArtImageResult {
    image: string;
    type: string;
    description: string;
}

class SongMetadata {
    /**
     * searches for song metadata given song name and artist name.
     * @param songName song name to search for.
     * @param artistName artist name to search for.
     * @returns potential song metatada results.
     */
    public async getPotentialMetadataForSong(
        songName: string,
        artistName?: string,
    ): Promise<ISongMetadataMatchedResult[]> {
        // Initialize criteria to search by.
        const searchFor: SearchReleasesCriteria[] = [];
        searchFor.push({
            field: SearchReleasesFields.recordingName,
            value: songName,
        });
        if (artistName) {
            searchFor.push({
                field: SearchReleasesFields.artistName,
                value: artistName,
            });
        }

        // Get actual search results
        const searchResults = await musicBrainzClient.searchReleases(
            searchFor,
            10,
            0,
        );

        // Prepare results
        const results: ISongMetadataMatchedResult[] = [];
        searchResults.recordings.forEach((recording) => {
            // Convert result to expected type
            const result = this.convertRecordingToSongMetadataResult(recording);
            results.push(result);
        });
        return results;
    }

    /**
     * get cover arts for specified release.
     * @param releaseId release id, returned by {@link SongMetadata#getPotentialMetadataForSong} method.
     * @returns array of cover art results for specified release.
     */
    public async getCoverArt(
        releaseId: string,
    ): Promise<ICoverArtImageResult[]> {
        const images = await coverArtArchiveClient.getCoversForRelease(
            releaseId,
        );
        // Possibly show url to release to user? images.release, link to details of the release.

        const results: ICoverArtImageResult[] = [];
        images.images.forEach((image) => {
            results.push({
                image: image.image,
                type: image.types.join(' '),
                description: image.comment,
            });
        });
        return results;
    }

    /**
     * Converts from MusicBrainz response Recording to ISongMetadataMatchedResult.
     * @param recording recording from client response.
     * @returns potential song match result.
     */
    private convertRecordingToSongMetadataResult(
        recording: Recording,
    ): ISongMetadataMatchedResult {
        let album: string = '';
        let date: string = '';
        /**
         * Contains details on record to clearify decision for user, which album to choose.
         */
        let disambiguations: string[] = [];
        let releaseId: string | undefined;
        if (recording.disambiguation) {
            disambiguations.push(recording.disambiguation);
        }
        if (recording.releases && recording.releases.length > 0) {
            const release = recording.releases[0];
            album = release.title;
            date = release.date ? release.date : '';
            releaseId = release.id;

            const releaseGroupPrimaryType = release['release-group'][
                'primary-type'
            ]
                ? release['release-group']['primary-type']
                : '';
            const releaseAdditionalDisambiguation = `${releaseGroupPrimaryType} - ${
                release['release-group'].title
            }`;
            disambiguations.push(releaseAdditionalDisambiguation);

            if (release.disambiguation) {
                disambiguations.push(release.disambiguation);
            }
        }
        // Map current results to return result type.
        const result: ISongMetadataMatchedResult = {
            title: recording.title,
            artists: !recording['artist-credit']
                ? []
                : recording['artist-credit']
                    .map((value) => {
                        return (value.name ? value.name : value.artist.name)
                    }),
            artistsDisplayName: !recording['artist-credit']
                ? ''
                : recording['artist-credit']
                      .map((value) => {
                          return (
                              (value.name ? value.name : value.artist.name) +
                              (value.joinphrase ? value.joinphrase : '')
                          );
                      })
                      .join(''),
            date,
            album,
            disambiguation: disambiguations.join('; '),
            releaseId,
        };
        return result;
    }
}

export const songMetadata = new SongMetadata();
