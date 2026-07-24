import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react'
import type { ComponentType } from 'react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

const useField = vi.hoisted(() => vi.fn())

vi.mock('@payloadcms/ui', async () => {
  const React = await import('react')

  return {
    Banner: ({ children }: { children: React.ReactNode }) =>
      React.createElement('div', { role: 'alert' }, children),
    Button: ({
      children,
      onClick,
    }: {
      children: React.ReactNode
      onClick?: React.MouseEventHandler<HTMLButtonElement>
    }) => React.createElement('button', { onClick }, children),
    FieldDescription: () => null,
    FieldError: () => null,
    FieldLabel: ({ label }: { label?: React.ReactNode }) =>
      React.createElement('label', null, label),
    ReactSelect: ({
      isLoading,
      onChange,
      options,
      value,
    }: {
      isLoading?: boolean
      onChange: (option: { label: string; value: string }) => void
      options: Array<{ label: string; value: string }>
      value?: { value?: string }
    }) =>
      React.createElement(
        'div',
        {
          'data-loading': String(Boolean(isLoading)),
          'data-options': options.map((option) => option.value).join(','),
          'data-testid': 'folder-selector',
          'data-value': value?.value ?? '',
        },
        React.createElement(
          'button',
          {
            onClick: () => onChange({ label: 'root/nested', value: 'root/nested' }),
          },
          'Select nested folder',
        ),
        React.createElement(
          'button',
          {
            onClick: () => onChange({ label: 'manual/path', value: 'manual/path' }),
          },
          'Enter manual folder',
        ),
      ),
    fieldBaseClass: 'field-type',
    useField,
  }
})

import { CloudinaryFolderField } from '@/components/CloudinaryFolderField'

const FolderField = CloudinaryFolderField as ComponentType<Record<string, unknown>>

describe('Cloudinary folder field', () => {
  const setValue = vi.fn()

  beforeEach(() => {
    setValue.mockReset()
    useField.mockReset()
    useField.mockReturnValue({
      disabled: false,
      path: 'components.0.cloudinaryFolder',
      setValue,
      showError: false,
      value: 'legacy/unlisted',
    })
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue(
        new Response(
          JSON.stringify({
            folders: ['root', 'root/nested'],
          }),
        ),
      ),
    )
  })

  afterEach(() => {
    cleanup()
    vi.unstubAllGlobals()
  })

  it('restores an unlisted saved value and updates from Cloudinary results', async () => {
    render(
      <FolderField
        field={{
          admin: { description: 'Choose a folder' },
          label: 'Cloudinary Folder Path',
          name: 'cloudinaryFolder',
          required: true,
          type: 'text',
        }}
        path="components.0.cloudinaryFolder"
      />,
    )

    await waitFor(() => {
      expect(screen.getByTestId('folder-selector').getAttribute('data-loading')).toBe('false')
    })

    const selector = screen.getByTestId('folder-selector')
    expect(selector.getAttribute('data-value')).toBe('legacy/unlisted')
    expect(selector.getAttribute('data-options')).toBe('legacy/unlisted,root,root/nested')

    fireEvent.click(screen.getByRole('button', { name: 'Select nested folder' }))
    expect(setValue).toHaveBeenCalledWith('root/nested')
  })

  it('allows a manual fallback path', async () => {
    render(
      <FolderField
        field={{
          label: 'Cloudinary Folder Path',
          name: 'cloudinaryFolder',
          required: true,
          type: 'text',
        }}
        path="components.0.cloudinaryFolder"
      />,
    )

    await waitFor(() => {
      expect(screen.getByTestId('folder-selector').getAttribute('data-loading')).toBe('false')
    })

    fireEvent.click(screen.getByRole('button', { name: 'Enter manual folder' }))
    expect(setValue).toHaveBeenCalledWith('manual/path')
  })
})
