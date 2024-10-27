import '@testing-library/jest-dom'; 
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Pagination from '../components/ui/pagination'; 
import { useStore } from '../store/store'; 

// Mocking the useStore hook to isolate component tests
jest.mock('../store/store', () => ({
  useStore: jest.fn(), // Create a mock version of the useStore hook
}));

describe('Pagination Component', () => {
  const setPageMock = jest.fn(); // Mock function for setting the page

  beforeEach(() => {
    // Clear all mocks before each test to ensure test isolation
    jest.clearAllMocks();
  });

  it('renders current page and checks button functionality', () => {
    // Mock the return value of useStore for the test
    (useStore as unknown as jest.Mock).mockReturnValue({
      nextPageExist: true, // Indicate that there is a next page
      loading: false,
    });

    // Render the Pagination component with initial props
    render(<Pagination page={1} setPage={setPageMock} />);
    
    // Check that the current page number is displayed
    expect(screen.getByText('1')).toBeInTheDocument();

    // Simulate clicking the "next page" button
    fireEvent.click(screen.getByTestId('next'));
    // Verify that setPageMock was called with a function as argument
    expect(setPageMock).toHaveBeenCalledWith(expect.any(Function));

    // Simulate clicking the "previous page" button
    fireEvent.click(screen.getByTestId('prev'));
    // Verify that setPageMock was called with a function as argument
    expect(setPageMock).toHaveBeenCalledWith(expect.any(Function));
  });

  it('does not call setPage for previous page when on the first page', () => {
    // Mock the return value of useStore for the test
    (useStore as unknown as jest.Mock).mockReturnValue({
      nextPageExist: true, // Indicate that there is a next page
      loading: false, // Indicate that the loading state is false
    });

    // Render the Pagination component with initial props
    render(<Pagination page={1} setPage={setPageMock} />);
    
    // Simulate clicking the "previous page" button
    fireEvent.click(screen.getByTestId('prev'));
    
    // Verify that setPageMock was not called
    expect(setPageMock).not.toHaveBeenCalled();
  });

  it('does not call setPage for next page when loading', () => {
    // Mock the return value of useStore for the test
    (useStore as unknown as jest.Mock).mockReturnValue({
      nextPageExist: true, // Indicate that there is a next page
      loading: true, // Indicate that the loading state is true
    });

    // Render the Pagination component with initial props
    render(<Pagination page={1} setPage={setPageMock} />);
    
    // Simulate clicking the "next page" button
    fireEvent.click(screen.getByTestId('next'));
    
    // Verify that setPageMock was not called
    expect(setPageMock).not.toHaveBeenCalled();
  });

  it('does not call setPage for next page when there is no next page', () => {
    // Mock the return value of useStore for the test
    (useStore as unknown as jest.Mock).mockReturnValue({
      nextPageExist: false, // Indicate that there is no next page
      loading: false, // Indicate that the loading state is false
    });

    // Render the Pagination component with initial props
    render(<Pagination page={1} setPage={setPageMock} />);
    
    // Simulate clicking the "next page" button
    fireEvent.click(screen.getByTestId('next'));
    
    // Verify that setPageMock was not called
    expect(setPageMock).not.toHaveBeenCalled();
  });
});
