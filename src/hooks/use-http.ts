import { useCallback, useState } from "react";

interface RequestInit {
    body?: BodyInit | null;
    cache?: RequestCache;
    credentials?: RequestCredentials;
    headers?: HeadersInit;
    integrity?: string;
    keepalive?: boolean;
    method?: string;
    mode?: RequestMode;
    redirect?: RequestRedirect;
    referrer?: string;
    referrerPolicy?: ReferrerPolicy;
    signal?: AbortSignal | null;
    window?: null;
}


const useHttp = ({ req }: { req?: RequestInit } = {}) => {
    const [isWaiting, setIsWaiting] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    const fetchFunc = useCallback(async (url: string | string[]) => {
        setIsWaiting(true);
        setError(null);
        let json = null;
        try {
            if (!Array.isArray(url)) {
                const httpget = await fetch(url, req);
                if (httpget.ok) {
                    json = await httpget.json();
                }
            } else { // url is string 
                const all = await Promise.allSettled(
                    url.map(async inner_url => {
                        const inner_req = await fetch(inner_url, req);
                        const json = await inner_req.json();
                        return json;
                    })
                );
                return all.map(val => val.status === "fulfilled" ? val.value : val.reason);

            }
        }
        catch (err) {
            setError(err as Error);
        }
        setIsWaiting(false);
        return json;
    }, [req]);

    return {
        isWaiting,
        error,
        fetchFunc
    }
};

export default useHttp;