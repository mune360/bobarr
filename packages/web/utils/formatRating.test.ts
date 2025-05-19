import { formatRating } from './formatRating';

describe('formatRating', () => {
  it('should format integer rating without decimal', () => {
    expect(formatRating(85)).toBe('85');
  });

  it('should format rating with one decimal place', () => {
    expect(formatRating(85.3)).toBe('85.3');
  });

  it('should round to one decimal place', () => {
    expect(formatRating(85.35)).toBe('85.4');
  });

  it('should handle zero rating', () => {
    expect(formatRating(0)).toBe('0');
  });

  it('should handle rating with multiple decimal places', () => {
    expect(formatRating(92.789)).toBe('92.8');
  });
});
