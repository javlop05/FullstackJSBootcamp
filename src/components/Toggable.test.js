import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { fireEvent, render } from '@testing-library/react';
import Toggable from './Toggable';

describe('<Toggable />', () => {
  const buttonLabel = 'show';
  const childTextContent = 'testDivContent';
  let component;

  beforeEach(() => {
    component = render(
      <Toggable buttonLabel={buttonLabel}>
        <div>{childTextContent}</div>
      </Toggable>
    );
  });

  test('renders its children', () => {
    component.getByText(childTextContent);
  });

  test('children are not visible', () => {
    const el = component.getByText(childTextContent);
    expect(el.parentNode).toHaveStyle('display: none');
  });

  test('after clicking its children must be shown', () => {
    const button = component.getByText(buttonLabel);
    fireEvent.click(button);

    const el = component.getByText(childTextContent);
    expect(el.parentNode).not.toHaveStyle('display: none');
  });

  test('toggler content can be closed', () => {
    const button = component.getByText(buttonLabel);
    fireEvent.click(button);
    const el = component.getByText(childTextContent);
    expect(el.parentNode).not.toHaveStyle('display: none');
    const cancelButton = component.getByText('Cancel');

    fireEvent.click(cancelButton);

    expect(el.parentNode).toHaveStyle('display: none');
  })
})
