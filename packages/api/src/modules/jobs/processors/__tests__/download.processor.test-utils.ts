import { Injectable } from '@nestjs/common';
import { TMDBService } from '../../tmdb/tmdb.service';

export class MockTMDBService extends TMDBService {
  getMovie = jest.fn();
  getTVShow = jest.fn();
}

export class MockTVSeasonDAO {
  findOne = jest.fn();
}

export class MockLibraryService {
  downloadMovie = jest.fn();
  downloadTVSeason = jest.fn();
  downloadTVEpisode = jest.fn();
}

export class MockJackettService {
  searchMovie = jest.fn();
  searchSeason = jest.fn();
  searchEpisode = jest.fn();
}

export const createTestingModule = (providers: any[]) => {
  return {
    get: jest.fn((token) => {
      const provider = providers.find(p => p.provide === token);
      return provider?.useValue || provider?.useClass ? new provider.useClass() : null;
    }),
  };
};

export const mockLogger = {
  info: jest.fn(),
  error: jest.fn(),
  child: () => ({
    info: jest.fn(),
    error: jest.fn(),
  }),
};
