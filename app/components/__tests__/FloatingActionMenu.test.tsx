import { fireEvent, render } from '@testing-library/react-native';
import React from 'react';
import FloatingActionMenu from '../FloatingActionMenu';

jest.mock('react-native-safe-area-context', () => ({
  useSafeAreaInsets: () => 0,
}));

describe('FloatingActionMenu', () => {
  const mockActions = [
    {
      label: 'Action 1',
      onPress: jest.fn(),
      color: '#ff0000'
    },
    {
      label: 'Action 2',
      onPress: jest.fn()
    }
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render main FAB button', () => {
    const { getByTestId } = render(
      <FloatingActionMenu actions={mockActions} />
    );

    expect(getByTestId('fab-main')).toBeTruthy();
  });

  it('should show action items when FAB is pressed', () => {
    const { getByTestId, getAllByText } = render(
      <FloatingActionMenu actions={mockActions} />
    );

    // Initially, action items should not be visible
    expect(() => getAllByText('Action 1')).toThrow();
    expect(() => getAllByText('Action 2')).toThrow();

    // Press the main FAB
    fireEvent.press(getByTestId('fab-main'));

    // Action items should be visible
    expect(getAllByText('Action 1')).toBeTruthy();
    expect(getAllByText('Action 2')).toBeTruthy();
  });

  it('should call action onPress and hide items when action item is pressed', () => {
    const { getByTestId, getAllByText, queryByText } = render(
      <FloatingActionMenu actions={mockActions} />
    );

    // Open menu
    fireEvent.press(getByTestId('fab-main'));

    // Press first action item
    const actionItem = getAllByText('Action 1')[0];
    fireEvent.press(actionItem);

    // Action should be called
    expect(mockActions[0].onPress).toHaveBeenCalled();

    // Menu should be closed (items hidden)
    expect(queryByText('Action 1')).toBeNull();
    expect(queryByText('Action 2')).toBeNull();
  });

  it('should hide items when backdrop is pressed', () => {
    const { getByTestId, getAllByText, queryByText } = render(
      <FloatingActionMenu actions={mockActions} />
    );

    // Open menu
    fireEvent.press(getByTestId('fab-main'));

    // Action items should be visible
    expect(getAllByText('Action 1')).toBeTruthy();
    expect(getAllByText('Action 2')).toBeTruthy();

    // Press backdrop
    fireEvent.press(getByTestId('fab-backdrop'));

    // Menu should be closed (items hidden)
    expect(queryByText('Action 1')).toBeNull();
    expect(queryByText('Action 2')).toBeNull();
  });

  it('should apply custom color to action item', () => {
    const { getByTestId, getAllByTestId } = render(
      <FloatingActionMenu actions={mockActions} />
    );

    // Open menu
    fireEvent.press(getByTestId('fab-main'));

    const actionItems = getAllByTestId('fab-item');
    expect(actionItems[0].props.style).toMatchObject({ backgroundColor: '#ff0000' });
    expect(actionItems[1].props.style).not.toMatchObject({ backgroundColor: '#ff0000' });
  });
}); 