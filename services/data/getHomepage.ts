import { API_HOMEPAGE_PARAMS, API_URL } from 'constants/api'
import { getBlocks } from 'services/data'

const getHomePage = async () => {
    const results = await fetch(`${API_URL}/${API_HOMEPAGE_PARAMS}`)
    const page = await results.json()
    const pageAttributes = page?.data?.attributes
    return {
        blocks: getBlocks(pageAttributes?.frontpage) || [],
    }
}

export default getHomePage
