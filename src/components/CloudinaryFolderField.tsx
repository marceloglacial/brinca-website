'use client'

import {
  Banner,
  Button,
  FieldDescription,
  FieldError,
  FieldLabel,
  ReactSelect,
  fieldBaseClass,
  useField,
} from '@payloadcms/ui'
import type { ReactSelectOption } from '@payloadcms/ui'
import type { TextFieldClientComponent, Validate } from 'payload'
import React, { useEffect, useMemo, useState } from 'react'

import './CloudinaryFolderField.scss'

type CloudinaryFoldersResponse = {
  folders?: unknown
}

function toOption(path: string): ReactSelectOption {
  return {
    label: path,
    value: path,
  }
}

export const CloudinaryFolderField: TextFieldClientComponent = ({
  field,
  path: pathFromProps,
  readOnly,
  validate,
}) => {
  const { admin, label, localized, required } = field
  const { disabled, path, setValue, showError, value } = useField<string>({
    potentiallyStalePath: pathFromProps,
    validate: validate as Validate | undefined,
  })
  const [folders, setFolders] = useState<string[]>([])
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(true)
  const [requestKey, setRequestKey] = useState(0)

  useEffect(() => {
    const controller = new AbortController()

    async function loadFolders() {
      setError(false)
      setLoading(true)

      try {
        const response = await fetch('/api/cloudinary-folders', {
          signal: controller.signal,
        })

        if (!response.ok) {
          throw new Error('Unable to load Cloudinary folders.')
        }

        const data = (await response.json()) as CloudinaryFoldersResponse
        if (
          !Array.isArray(data.folders) ||
          !data.folders.every((folder) => typeof folder === 'string')
        ) {
          throw new Error('Cloudinary returned an invalid folder list.')
        }

        setFolders(data.folders)
      } catch (loadError) {
        if (loadError instanceof DOMException && loadError.name === 'AbortError') {
          return
        }

        setError(true)
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false)
        }
      }
    }

    void loadFolders()

    return () => controller.abort()
  }, [requestKey])

  const options = useMemo(() => {
    const availableFolders = value && !folders.includes(value) ? [value, ...folders] : folders
    return availableFolders.map(toOption)
  }, [folders, value])

  const selectedOption = value ? toOption(value) : undefined
  const isDisabled = Boolean(readOnly || disabled)

  return (
    <div
      className={[
        fieldBaseClass,
        'cloudinary-folder-field',
        showError && 'error',
        isDisabled && 'read-only',
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <FieldLabel label={label} localized={localized} path={path} required={required} />
      <div className={`${fieldBaseClass}__wrap`}>
        <FieldError path={path} showError={showError} />
        <ReactSelect
          className={`field-${path.replace(/\./g, '__')}`}
          disabled={isDisabled}
          isClearable={!required}
          isCreatable
          isLoading={loading}
          isSearchable
          noOptionsMessage={() =>
            loading
              ? 'Loading Cloudinary folders…'
              : 'No Cloudinary folders found. Type a folder path to add it manually.'
          }
          onChange={(option) => {
            if (Array.isArray(option)) {
              return
            }

            setValue(typeof option?.value === 'string' ? option.value : null)
          }}
          options={options}
          placeholder="Search or enter a Cloudinary folder path"
          showError={showError}
          value={selectedOption}
        />
        {error && (
          <Banner className="cloudinary-folder-field__error" type="error">
            <span>Cloudinary folders could not be loaded. You can enter a path manually.</span>
            <Button
              buttonStyle="secondary"
              onClick={() => setRequestKey((current) => current + 1)}
              size="small"
              type="button"
            >
              Retry
            </Button>
          </Banner>
        )}
        <FieldDescription description={admin?.description} path={path} />
      </div>
    </div>
  )
}
