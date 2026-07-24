import { beforeEach, describe, expect, it, vi } from 'vitest'

const getCloudinaryFolderPaths = vi.hoisted(() => vi.fn())

vi.mock('@/lib/cloudinary', () => ({
  getCloudinaryFolderPaths,
}))

import { cloudinaryFoldersEndpoint } from '@/endpoints/cloudinaryFolders'

describe('Cloudinary folders endpoint', () => {
  beforeEach(() => {
    getCloudinaryFolderPaths.mockReset()
  })

  it('rejects anonymous requests without calling Cloudinary', async () => {
    const response = await cloudinaryFoldersEndpoint.handler({
      user: null,
    } as never)

    expect(response.status).toBe(401)
    await expect(response.json()).resolves.toEqual({ error: 'Unauthorized.' })
    expect(getCloudinaryFolderPaths).not.toHaveBeenCalled()
  })

  it('returns folders to authenticated Payload users', async () => {
    getCloudinaryFolderPaths.mockResolvedValue(['root', 'root/nested'])

    const response = await cloudinaryFoldersEndpoint.handler({
      user: { id: 'user-id' },
    } as never)

    expect(response.status).toBe(200)
    await expect(response.json()).resolves.toEqual({
      folders: ['root', 'root/nested'],
    })
  })

  it('logs upstream failures and returns a sanitized error', async () => {
    const loggerError = vi.fn()
    getCloudinaryFolderPaths.mockRejectedValue(new Error('secret upstream detail'))

    const response = await cloudinaryFoldersEndpoint.handler({
      payload: {
        logger: {
          error: loggerError,
        },
      },
      user: { id: 'user-id' },
    } as never)

    expect(response.status).toBe(502)
    const body = await response.json()
    expect(body).toEqual({
      error: 'Unable to load Cloudinary folders.',
    })
    expect(loggerError).toHaveBeenCalledOnce()
    expect(JSON.stringify(body)).not.toContain('secret upstream detail')
  })
})
