/**
 * This represents an internal library used for communication between services.
 * That is a common pattern, and a great place to customize some telemetry.
 */

const SERVICES = {
    meminator: 'http://meminator:10114/applyPhraseToPicture', // this one is a POST
    'phrase-picker': 'http://phrase-picker:10114/phrase',
    'image-picker': 'http://image-picker:10114/imageUrl',
}

type FetchOptions = {
    method?: "GET" | "POST" | "PUT" | "DELETE",
    body?: any // will be stringified
}

/**
 * Make an HTTP request to one of our services.
 * 
 * 
 * @param service one of our known services
 * @param options choose method and/or send a body
 * @returns 
 */
export async function fetchFromService(service: keyof typeof SERVICES, options?: FetchOptions) {
    const { method, body: bodyObject } = options || { method: "GET" };
    let body: string | null = null;
    if (bodyObject) {
        body = JSON.stringify(bodyObject);
    }
    const headers: Record<string, string> = {
        "Content-Type": "application/json"
    }

    const url = SERVICES[service];

    const response = await fetch(url, { headers, method, body });

    return response;
}