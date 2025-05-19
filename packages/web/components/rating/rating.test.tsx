const React = require('react');
const { render } = require('@testing-library/react');
require('@testing-library/jest-dom');
const { RatingComponent } = require('./rating.component');

describe('RatingComponent', () => {
  it('should render the rating with no decimal when it is an integer', () => {
    const { container } = render(<RatingComponent rating={85} />);
    const percentElement = container.querySelector('.percent');
    expect(percentElement).toHaveTextContent('85%');
  });

  it('should render the rating with one decimal when it is not an integer', () => {
    const { container } = render(<RatingComponent rating={85.3} />);
    const percentElement = container.querySelector('.percent');
    expect(percentElement).toHaveTextContent('85.3%');
  });

  it('should round to one decimal place', () => {
    const { container } = render(<RatingComponent rating={85.35} />);
    const percentElement = container.querySelector('.percent');
    expect(percentElement).toHaveTextContent('85.4%');
  });

  it('should handle zero rating', () => {
    const { container } = render(<RatingComponent rating={0} />);
    const percentElement = container.querySelector('.percent');
    expect(percentElement).toHaveTextContent('0%');
  });
});
