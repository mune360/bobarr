import { sanitize } from './sanitize';

describe('sanitize', () => {
  // Basic transformations
  it('should convert string to lowercase', () => {
    expect(sanitize('HELLO WORLD')).toBe('hello world');
    expect(sanitize('Mixed CASE text')).toBe('mixed case text');
  });

  it('should handle punctuation marks', () => {
    const punctuationTests = [
      { input: 'hello,world', expected: 'hello world', desc: 'commas' },
      { input: 'hello.world', expected: 'hello world', desc: 'periods' },
      { input: 'hello-world', expected: 'hello world', desc: 'hyphens' },
      { input: 'hello(world)', expected: 'helloworld', desc: 'parentheses' },
      { input: 'hello[world]', expected: 'helloworld', desc: 'square brackets' },
      // Note: Apostrophes between letters are preserved as they might be part of words
      { input: "hello'world", expected: 'helloworld', desc: 'apostrophes between letters' },
      { input: 'hello:world', expected: 'hello world', desc: 'colons' },
      { input: "don't", expected: 'dont', desc: 'apostrophe in contractions' },
    ];

    punctuationTests.forEach(({ input, expected, desc }) => {
      expect(sanitize(input)).toBe(expected);
    });
  });

  // Edge cases
  it('should handle edge cases', () => {
    const edgeCases = [
      { input: '', expected: '', desc: 'empty string' },
      { input: ' ', expected: '', desc: 'single space' },
      { input: '[]():.,-', expected: '', desc: 'only special characters' },
      { input: '   ', expected: '', desc: 'multiple spaces' },
      { input: '\t\n', expected: '', desc: 'whitespace characters' },
      { input: '12345', expected: '12345', desc: 'numbers only' },
      { input: '!@#$%^&*', expected: '', desc: 'special characters not in replacement list' },
    ];

    edgeCases.forEach(({ input, expected, desc }) => {
      expect(sanitize(input)).toBe(expected);
    });
  });

  // Tests for file naming patterns
  it('should handle file naming patterns', () => {
    const fileNamingTests = [
      {
        input: 'The.Matrix.1999.1080p.BluRay.x264',
        expected: 'the matrix 1999 1080p bluray x264',
        desc: 'torrent style naming'
      },
      {
        input: 'Game.of.Thrones.S01E01.720p[HDTV]',
        expected: 'game of thrones s01e01 720phdtv',
        desc: 'TV show episode with quality'
      },
      {
        input: 'Star.Wars.Episode.IV.A.New.Hope.1977.1080p',
        expected: 'star wars episode iv a new hope 1977 1080p',
        desc: 'movie with technical info'
      },
      {
        input: 'F.R.I.E.N.D.S.S01E01.720p',
        expected: 'f r i e n d s s01e01 720p',
        desc: 'title with multiple periods and quality'
      }
    ];

    fileNamingTests.forEach(({ input, expected, desc }) => {
      expect(sanitize(input)).toBe(expected);
    });
  });

  // Tests for real-world movie and TV show titles
  it('should handle real movie and TV show titles', () => {
    const realWorldTests = [
      {
        input: 'Spider-Man: No Way Home [2021]',
        expected: 'spider man no way home 2021',
        desc: 'modern movie title'
      },
      {
        input: 'The Lord of the Rings: The Fellowship of the Ring (2001)',
        expected: 'the lord of the rings the fellowship of the ring 2001',
        desc: 'long movie title'
      },
      {
        input: 'Rick & Morty S06E01',
        expected: 'rick morty s06e01',
        desc: 'TV show with ampersand'
      }
    ];

    realWorldTests.forEach(({ input, expected, desc }) => {
      expect(sanitize(input)).toBe(expected);
    });
  });

  // Tests for special characters and apostrophes
  it('should handle special characters and apostrophes', () => {
    const specialCharTests = [
      {
        input: 'hello...world',
        expected: 'hello world',
        desc: 'multiple periods'
      },
      {
        input: 'hello,,world',
        expected: 'hello world',
        desc: 'multiple commas'
      },
      {
        input: 'hello--world',
        expected: 'hello world',
        desc: 'multiple hyphens'
      },
      {
        input: "O'Neill's",
        expected: 'oneills',
        desc: 'multiple apostrophes'
      },
      {
        input: "don't stop 'til you're done",
        expected: 'dont stop til youre done',
        desc: 'apostrophes in phrases'
      },
      {
        input: "rock 'n' roll",
        expected: 'rock n roll',
        desc: 'apostrophes in expressions'
      },
      {
        input: "mother's day",
        expected: 'mothers day',
        desc: 'possessive form'
      },
      {
        input: "o'clock",
        expected: 'oclock',
        desc: 'time expression'
      }
    ];

    specialCharTests.forEach(({ input, expected, desc }) => {
      expect(sanitize(input)).toBe(expected);
    });
  });

  // Tests for year abbreviations with apostrophes
  describe('abbreviated years', () => {
    it('should handle years with apostrophes correctly', () => {
      const yearTests = [
        { input: "'97", expected: '97', desc: 'year abbreviation' },
        { input: "x-men '97", expected: 'x men 97', desc: 'title with year abbreviation' },
        { input: "rock 'n' roll '97", expected: 'rock n roll 97', desc: 'phrase with year abbreviation' },
        { input: "'97 x-men", expected: '97 x men', desc: 'year at start of string' },
        { input: "x-men '97: The Animated Series", expected: 'x men 97 the animated series', desc: 'title with year and subtitle' },
        { input: "x-men '97 - The Animated Series", expected: 'x men 97 the animated series', desc: 'title with year and subtitle with dash' },
        { input: "x-men '97 (2023)", expected: 'x men 97 2023', desc: 'title with year abbreviation and full year' },
        { input: "'97-'98 season", expected: '97 98 season', desc: 'year range with apostrophes' },
        { input: "back in '97, the show started", expected: 'back in 97 the show started', desc: 'year in the middle of a sentence' },
        { input: "the year was '97.", expected: 'the year was 97', desc: 'year at the end of a sentence' }
      ];

      yearTests.forEach(({ input, expected, desc }) => {
        expect(sanitize(input)).toBe(expected);
      });
    });
  });
});
