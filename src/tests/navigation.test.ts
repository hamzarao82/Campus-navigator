import { render, fireEvent } from '@testing-library/react-native';
import { NavigationScreen } from '../screens/NavigationScreen';
import { useNavigation } from '../hooks/useNavigation';

jest.mock('../hooks/useNavigation');

describe('Navigation Screen', () => {
  beforeEach(() => {
    (useNavigation as jest.Mock).mockReturnValue({
      currentLocation: { lat: 0, lng: 0 },
      destination: null,
      setDestination: jest.fn(),
    });
  });

  it('renders navigation screen', () => {
    const { getByTestId } = render(<NavigationScreen />);
    expect(getByTestId('navigation-map')).toBeTruthy();
  });

  it('updates destination on POI selection', () => {
    const { getByTestId } = render(<NavigationScreen />);
    fireEvent.press(getByTestId('poi-marker'));
    expect(useNavigation().setDestination).toHaveBeenCalled();
  });
});
