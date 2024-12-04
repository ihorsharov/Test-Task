import { useEffect, useState } from "react";

export const UseFetch = (url: string) => {

    const [data, setData] = useState<any>(null);
    const [isPending, setIsPending] = useState(false);
    const [error, setError] = useState<unknown>(null)

    const fetchData = async () => {
        setIsPending(true)
        try {
            const response = await fetch(url)

            console.log(response)
            if (!response.ok) throw new Error(response.statusText)
            const json = await response.json();
            setData(json)

        } catch (err: unknown) {

            setError(err)
        } finally {
            setIsPending(false)
        }
    }


    useEffect(() => {
        fetchData()

    }, [url])


    return { data, isPending, error }

}