import { render, screen } from '@tests/utils';

import { Form } from '../../Form';
import { InputRenderer } from '../Renderer';

describe('BooleanInput (via InputRenderer)', () => {
  const booleanField = {
    label: 'Published',
    name: 'published',
    type: 'boolean' as const,
    required: false,
  };

  it('shows Clear when the value is set and the field is editable', () => {
    render(<InputRenderer {...booleanField} />, {
      renderOptions: {
        wrapper: ({ children }) => (
          <Form method="PUT" initialValues={{ published: true }}>
            {children}
          </Form>
        ),
      },
    });

    expect(screen.getByRole('button', { name: /clear/i })).toBeInTheDocument();
  });

  it('hides Clear when the value is unset (undefined) on a new entry', () => {
    render(<InputRenderer {...booleanField} />, {
      renderOptions: {
        wrapper: ({ children }) => (
          <Form method="POST" initialValues={{}}>
            {children}
          </Form>
        ),
      },
    });

    expect(screen.queryByRole('button', { name: /clear/i })).not.toBeInTheDocument();
  });

  it('hides Clear when the field is disabled (e.g. published review view)', () => {
    render(<InputRenderer {...booleanField} disabled />, {
      renderOptions: {
        wrapper: ({ children }) => (
          <Form method="PUT" initialValues={{ published: true }}>
            {children}
          </Form>
        ),
      },
    });

    expect(screen.queryByRole('button', { name: /clear/i })).not.toBeInTheDocument();
  });
});
