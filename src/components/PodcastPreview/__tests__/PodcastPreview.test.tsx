import { render, screen, fireEvent } from '@testing-library/react';
import { PodcastPreview } from '../PodcastPreview';

describe('PodcastPreview', () => {
  it('renders podcast information correctly', () => {
    render(<PodcastPreview />);
    expect(screen.getByText('Lab | Studio | Fund')).toBeInTheDocument();
    expect(screen.getByText('Tomes of Arcana')).toBeInTheDocument();
  });

  // Add more tests
}); 