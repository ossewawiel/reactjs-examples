import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { ApiLookupFormControl } from './ApiLookupFormControl';
import MockIntlProvider from '../../test-utils/MockIntlProvider';

// create jest tests for ApiLookupFormControl
describe('ApiLookupFormControl', () => {
  // Mock formik handleChange and handleBlur functions
  const mockHandleChange = jest.fn();
  const mockHandleBlur = jest.fn();

  const controlProperties = {
    id: 'testId',
    label: 'Test Label',
    disable: jest.fn(),
    properties: {
      keyId: 'keyId',
      valueId: 'valueId',
      allowEmpty: true,
      hook: jest.fn(() => ({
        data: [{ keyId: '1', valueId: 'Value 1' }],
        isLoading: false,
        isSuccess: true,
        isError: false,
      })),
      getHookParams: jest.fn(),
      lookupTranslationId: 'translationId',
    },
  };

  const formik = {
    values: { testId: '1' },
    handleChange: mockHandleChange,
    handleBlur: mockHandleBlur,
    touched: { testId: true },
    errors: { testId: 'Field is required' },
  };

  it('renders correctly', () => {
    render(
      <MockIntlProvider>
        <ApiLookupFormControl
          controlProperties={controlProperties}
          formik={formik}
        />
      </MockIntlProvider>,
    );
    expect(screen.getByLabelText('Test Label')).toBeInTheDocument();
  });

  it('handles onChange event', () => {
    render(
      <MockIntlProvider>
        <ApiLookupFormControl
          controlProperties={controlProperties}
          formik={formik}
        />
      </MockIntlProvider>,
    );
    const selectElement = screen.getByLabelText('Test Label');
    fireEvent.change(selectElement, { target: { value: '2' } });
    expect(mockHandleChange).toHaveBeenCalled();
  });

  it('displays translated value', () => {
    render(
      <MockIntlProvider>
        <ApiLookupFormControl
          controlProperties={controlProperties}
          formik={formik}
        />
      </MockIntlProvider>,
    );
    expect(screen.getByText('translationId')).toBeInTheDocument();
  });
});
