import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { fireEvent, render } from '@testing-library/react';
// import { prettyDOM } from '@testing-library/dom';
import Note from './Note';

test('renders content', () => {
  const note = {
    content: 'This is a test',
    important: true
  };

  const component = render(<Note content={note.content} important={note.important}/>);

  component.getByText('This is a test');
  component.getByText('Mark as not important');

  // expect(component.container).toHaveTextContent('This is a test');
  // const li = component.container.querySelector('li');
  // console.log(prettyDOM(li));
});

test('clicking the button calls event handler once', () => {
  const note = {
    content: 'This is a test',
    important: true
  };
  
  const mockHandler = jest.fn();

  const component = render(
    <Note
      content={note.content}
      important={note.important}
      onClick={mockHandler} />
  );

  const button = component.getByText('Mark as not important');
  fireEvent.click(button);

  expect(mockHandler).toHaveBeenCalledTimes(1);
})
