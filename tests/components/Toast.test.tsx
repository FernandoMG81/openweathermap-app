import React from 'react';
import { render, screen } from '@testing-library/react';
import { Toast } from '../../src/components/Toast';

describe('Toast Component', () => {
  const errorMessage = {
    message: 'Error occurred',
    isError: true
  };

  it('renders Toast with the correct error message', () => {
    render(<Toast errorMessage={errorMessage} />);

    // Verifica que el mensaje de error se renderice correctamente
    expect(screen.getByText(`${errorMessage.message} - Check your API`)).toBeTruthy();


    // Verifica que el Toast esté presente
    expect(screen.getByRole('alert')).toBeTruthy();
  });
});
