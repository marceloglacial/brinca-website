import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { getCloudinaryFolderPaths } from '@/lib/cloudinary'

const originalCloudName = process.env.CLOUDINARY_CLOUD_NAME
const originalApiKey = process.env.CLOUDINARY_API_KEY
const originalApiSecret = process.env.CLOUDINARY_API_SECRET

describe('Cloudinary folders', () => {
  beforeEach(() => {
    process.env.CLOUDINARY_CLOUD_NAME = 'test-cloud'
    process.env.CLOUDINARY_API_KEY = 'test-key'
    process.env.CLOUDINARY_API_SECRET = 'test-secret'
  })

  afterEach(() => {
    process.env.CLOUDINARY_CLOUD_NAME = originalCloudName
    process.env.CLOUDINARY_API_KEY = originalApiKey
    process.env.CLOUDINARY_API_SECRET = originalApiSecret
    vi.unstubAllGlobals()
  })

  it('loads, normalizes, deduplicates, sorts, and paginates folder paths', async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce(
        new Response(
          JSON.stringify({
            folders: [{ path: 'root/nested' }, { path: '/root/' }, { path: null }],
            next_cursor: 'next-page',
          }),
        ),
      )
      .mockResolvedValueOnce(
        new Response(
          JSON.stringify({
            folders: [{ path: 'another' }, { path: 'root/nested' }],
          }),
        ),
      )
    vi.stubGlobal('fetch', fetchMock)

    await expect(getCloudinaryFolderPaths()).resolves.toEqual(['another', 'root', 'root/nested'])

    expect(fetchMock).toHaveBeenCalledTimes(2)

    const [firstURL, firstOptions] = fetchMock.mock.calls[0] as [string, RequestInit]
    expect(firstURL).toBe(
      'https://api.cloudinary.com/v1_1/test-cloud/folders/search?max_results=500',
    )
    expect(firstOptions).toMatchObject({
      cache: 'no-store',
      headers: {
        Authorization: `Basic ${Buffer.from('test-key:test-secret').toString('base64')}`,
      },
    })

    const [secondURL] = fetchMock.mock.calls[1] as [string]
    expect(new URL(secondURL).searchParams.get('next_cursor')).toBe('next-page')
  })

  it('throws when Cloudinary returns an error', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response('rate limited', { status: 429 })))

    await expect(getCloudinaryFolderPaths()).rejects.toThrow(
      'Failed to load Cloudinary folders: rate limited',
    )
  })

  it('throws before requesting Cloudinary when credentials are missing', async () => {
    delete process.env.CLOUDINARY_API_SECRET
    const fetchMock = vi.fn()
    vi.stubGlobal('fetch', fetchMock)

    await expect(getCloudinaryFolderPaths()).rejects.toThrow(
      'Cloudinary environment variables are not configured.',
    )
    expect(fetchMock).not.toHaveBeenCalled()
  })
})
