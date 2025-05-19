import dayjs from 'dayjs';
import { MockDownloadProcessor } from './mocks/download.processor.mock';
import { mockTMDBService } from './mocks/tmdb.service.mock';

// Mock logger
const mockLogger = {
  info: jest.fn(),
  error: jest.fn(),
  warn: jest.fn(),
  debug: jest.fn(),
  child: () => mockLogger,
  verbose: jest.fn(),
} as any;

describe('DownloadProcessor', () => {
  let processor: MockDownloadProcessor;

  beforeEach(() => {
    // Réinitialiser les mocks avant chaque test
    jest.clearAllMocks();
    
    // Créer une nouvelle instance du mock avec les dépendances simulées
    processor = new MockDownloadProcessor(
      mockTMDBService,
      {}, // libraryService
      {}, // jackettService
      {}, // movieDAO
      { findOne: jest.fn() }, // tvSeasonDAO
      {}, // tvEpisodeDAO
      mockLogger
    );
  });

  describe('isReleased', () => {
    it('devrait retourner true si le film n\'a pas de date de sortie', async () => {
      // Given
      mockTMDBService.getMovie.mockResolvedValue({ id: 1, release_date: '' });
      
      // When
      const result = await processor.isReleased({ movieId: 1 });
      
      // Then
      expect(result).toBe(true);
      expect(mockTMDBService.getMovie).toHaveBeenCalledWith(1);
    });

    it('devrait retourner true si le film est déjà sorti', async () => {
      // Given
      const yesterday = dayjs().subtract(1, 'day').format('YYYY-MM-DD');
      mockTMDBService.getMovie.mockResolvedValue({ id: 1, release_date: yesterday });
      
      // When
      const result = await processor.isReleased({ movieId: 1 });
      
      // Then
      expect(result).toBe(true);
      expect(mockTMDBService.getMovie).toHaveBeenCalledWith(1);
    });

    it('devrait retourner false si le film n\'est pas encore sorti', async () => {
      // Given
      const tomorrow = dayjs().add(1, 'day').format('YYYY-MM-DD');
      mockTMDBService.getMovie.mockResolvedValue({ id: 1, release_date: tomorrow });
      
      // When
      const result = await processor.isReleased({ movieId: 1 });
      
      // Then
      expect(result).toBe(false);
      expect(mockTMDBService.getMovie).toHaveBeenCalledWith(1);
    });

    it('devrait retourner true si la date de sortie est invalide', async () => {
      // Given
      mockTMDBService.getMovie.mockResolvedValue({ id: 1, release_date: 'date-invalide' });
      
      // When
      const result = await processor.isReleased({ movieId: 1 });
      
      // Then
      expect(result).toBe(true);
      expect(mockTMDBService.getMovie).toHaveBeenCalledWith(1);
    });
  });
});
