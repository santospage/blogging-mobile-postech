import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Card } from '../../../../src/pages/Classes/Card';

describe('Card Component', () => {
  const mockNavigation = {
    navigate: jest.fn(),
  };

  const mockClass = {
    title: 'Class 1',
    detail: 'Details about Class 1',
    resume: 'Resume 1',
    image: 'https://example.com/image1.jpg',
    category: { name: 'Category 1' },
    updatedAt: '2024-01-01',
    user: { user: 'User 1' },
    navigation: mockNavigation,
  };

  it('should render the Card with the correct data', () => {
    const { getByText } = render(<Card {...mockClass} />);

    expect(getByText('Resume 1')).toBeTruthy();
  });

  it('should navigate to ClassRoom when pressed', () => {
    const { getByTestId } = render(<Card {...mockClass} />);

    const touchable = getByTestId('TouchableOpacity');
    fireEvent.press(touchable);

    expect(mockNavigation.navigate).toHaveBeenCalledWith('ClassRoom', {
      title: 'Class 1',
      detail: 'Details about Class 1',
      resume: 'Resume 1',
      image: 'https://example.com/image1.jpg',
      category: { name: 'Category 1' },
      updatedAt: '2024-01-01',
      user: { user: 'User 1' },
    });
  });
});
