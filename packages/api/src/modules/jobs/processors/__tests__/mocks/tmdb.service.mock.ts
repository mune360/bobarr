export class MockTMDBService {
  getMovie = jest.fn();
  getTVShow = jest.fn();
}

export const mockTMDBService = new MockTMDBService();
