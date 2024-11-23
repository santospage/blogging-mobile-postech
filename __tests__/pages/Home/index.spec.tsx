import React from 'react';
import { render } from '@testing-library/react-native';
import Home from '../../../src/pages/Home';
import { NavigationContainer } from '@react-navigation/native';

describe('Home', () => {
  const mockNavigation = {
    navigate: jest.fn(),
    dispatch: jest.fn(),
    goBack: jest.fn(),
    addListener: jest.fn(),
    removeListener: jest.fn(),
    isFocused: jest.fn(),
    getParent: jest.fn(),
    reset: jest.fn(),
    setParams: jest.fn(),
    setOptions: jest.fn(),
    getState: jest.fn(),
    dangerouslyGetParent: jest.fn(),
    dangerouslyGetState: jest.fn(),
    navigateDeprecated: jest.fn(),
    preload: jest.fn(),
    canGoBack: jest.fn(),
    getId: jest.fn(),
    setStateForNextRouteNamesChange: jest.fn(),
    replace: jest.fn(),
    push: jest.fn(),
    pop: jest.fn(),
    popToTop: jest.fn(),
    popTo: jest.fn(),
  };

  const renderWithNavigation = () => {
    return render(
      <NavigationContainer>
        <Home navigation={mockNavigation} />
      </NavigationContainer>,
    );
  };

  it('should render the title and subtitle', () => {
    const { getByText } = renderWithNavigation();

    expect(getByText('Welcome!')).toBeTruthy();
    expect(getByText('Dynamic Blogging Classes')).toBeTruthy();
  });
});
