import React from 'react';
import { render, screen } from '@testing-library/react-native';
import { useRoute } from '@react-navigation/native';
import ClassRoom from '../../../src/pages/ClassRoom';

jest.mock('@react-navigation/native', () => ({
  useRoute: jest.fn(),
}));

describe('ClassRoom Component', () => {
  const mockParams = {
    params: {
      title: 'Sample Class',
      detail: 'This is a sample class detail.',
      image: 'https://example.com/sample-image.jpg',
      user: { user: 'John Doe' },
      updatedAt: '2024-01-01',
    },
  };

  beforeEach(() => {
    (useRoute as jest.Mock).mockReturnValue(mockParams);
  });

  it('should render the class title, detail, and user', () => {
    render(<ClassRoom />);

    expect(screen.getByText('Sample Class')).toBeTruthy();
    expect(screen.getByText('This is a sample class detail.')).toBeTruthy();
    expect(screen.getByText('Responsible: John Doe')).toBeTruthy();
  });

  it('should render the image if provided', () => {
    render(<ClassRoom />);
    const imageElement = screen.getByTestId('image');
    expect(imageElement.props.source.uri).toBe(mockParams.params.image);
  });

  it('should render "No image available" if image is not provided', () => {
    (useRoute as jest.Mock).mockReturnValue({
      params: {
        ...mockParams.params,
        image: null,
      },
    });

    render(<ClassRoom />);

    expect(screen.getByText('No image available')).toBeTruthy();
  });

  it('should render "No date available" if updatedAt is not provided', () => {
    (useRoute as jest.Mock).mockReturnValue({
      params: {
        ...mockParams.params,
        updatedAt: null,
      },
    });

    render(<ClassRoom />);

    expect(screen.getByText('Date: No date available')).toBeTruthy();
  });
});
