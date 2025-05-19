import { Logger } from 'winston';
import dayjs from 'dayjs';

export class MockDownloadProcessor {
  private readonly tmdbService: {
    getMovie: (id: number) => Promise<{ release_date?: string }>;
    getTVShow: (id: number) => Promise<{ seasons: Array<{ season_number: number; air_date?: string }> }>;
  };
  private readonly logger: Logger;

  constructor(
    tmdbService: any,
    private readonly libraryService: any,
    private readonly jackettService: any,
    private readonly movieDAO: any,
    private readonly tvSeasonDAO: any,
    private readonly tvEpisodeDAO: any,
    logger: Logger
  ) {
    this.tmdbService = tmdbService;
    this.logger = logger;
  }

  async isReleased(media: { movieId?: number; seasonId?: number; episodeId?: number }): Promise<boolean> {
    try {
      if (media.movieId) {
        return this.checkMovieRelease(media.movieId);
      }
      if (media.seasonId) {
        return this.checkSeasonRelease(media.seasonId);
      }
      return true;
    } catch (error) {
      this.logger.error('failed to check if media is released', { error });
      return true; // En cas d'erreur, on considère que le média est sorti
    }
  }

  private async checkMovieRelease(movieId: number): Promise<boolean> {
    try {
      const movie = await this.tmdbService.getMovie(movieId);
      if (!movie?.release_date) return true;
      
      const releaseDate = dayjs(movie.release_date);
      if (!releaseDate.isValid()) return true;
      
      return releaseDate.isBefore(dayjs());
    } catch (error) {
      this.logger.error('failed to check movie release', { error });
      return true;
    }
  }

  private async checkSeasonRelease(seasonId: number): Promise<boolean> {
    const season = await this.tvSeasonDAO.findOne({
      where: { id: seasonId },
      relations: ['tvShow'],
    });

    if (!season) return false;

    const tvShow = await this.tmdbService.getTVShow(season.tvShow.tmdbId);
    const seasonInfo = tvShow?.seasons?.find((s) => s.season_number === season.seasonNumber);
    
    if (!seasonInfo?.air_date) return true;
    
    const airDate = dayjs(seasonInfo.air_date);
    return airDate.isBefore(dayjs());
  }
}
