/* eslint-env jest */
import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { TextFormControl } from './TextFormControl';
import MockIntlProvider from '../../test-utils/MockIntlProvider';

describe('TextFormControl', () => {
  const mockHandleChange = jest.fn();
  const mockHandleBlur = jest.fn();

  const controlProperties = {
    id: 'testId',
    label: 'Test Label',
    disable: jest.fn(),
    properties: {},
  };

  const formik = {
    values: { testId: 'Test Value' },
    handleChange: mockHandleChange,
    handleBlur: mockHandleBlur,
    touched: { testId: true },
    errors: { testId: 'Field is required' },
  };

  it('renders correctly with provided value', () => {
    render(
      <MockIntlProvider>
        <TextFormControl
          controlProperties={controlProperties}
          formik={formik}
        />
      </MockIntlProvider>,
    );
    expect(screen.getByLabelText('Test Label')).toBeInTheDocument();
    expect(screen.getByLabelText('Test Label')).toHaveValue('Test Value');
  });

  it('handles onChange event', () => {
    render(
      <MockIntlProvider>
        <TextFormControl
          controlProperties={controlProperties}
          formik={formik}
        />
      </MockIntlProvider>,
    );
    const inputElement = screen.getByLabelText('Test Label');
    fireEvent.change(inputElement, { target: { value: 'New Value' } });
    expect(mockHandleChange).toHaveBeenCalled();
  });

  it('displays error message when field is touched and error exists', () => {
    render(
      <MockIntlProvider>
        <TextFormControl
          controlProperties={controlProperties}
          formik={formik}
        />
      </MockIntlProvider>,
    );
    expect(screen.getByText('Field is required')).toBeInTheDocument();
  });

  it('does not display error message when field is not touched', () => {
    const formikWithoutTouched = { ...formik, touched: { testId: false } };
    render(
      <MockIntlProvider>
        <TextFormControl
          controlProperties={controlProperties}
          formik={formikWithoutTouched}
        />
      </MockIntlProvider>,
    );
    expect(screen.queryByText('Field is required')).not.toBeInTheDocument();
  });
});
