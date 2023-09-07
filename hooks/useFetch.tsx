import { useState, useEffect } from 'react'

const useFetch = (url: string) => {
    const [data, setData] = useState<object[] | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [isError, setIsError] = useState<string | null>(null)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(url)
                if (!response.ok) {
                    throw new Error('Network response was not ok')
                }
                const jsonData = await response.json()
                setData(jsonData.data)
                setIsLoading(false)
            } catch (error) {
                setIsError('An error occurred while fetching data.')
                setIsLoading(false)
            }
        }

        fetchData()
    }, [url])

    return { data, isLoading, isError }
}

export default useFetch
