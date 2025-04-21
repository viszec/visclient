import { getAssetFromKV } from '@cloudflare/kv-asset-handler';

/**
 * The DEBUG flag will do two things that help during development:
 * 1. we will skip caching on the edge, which makes it easier to debug
 * 2. we will return more verbose errors from the worker
 */
const DEBUG = false;

/**
 * Handle requests to your domain
 */
addEventListener('fetch', (event) => {
    try {
        event.respondWith(handleEvent(event));
    } catch (e) {
        if (DEBUG) {
            return event.respondWith(
                new Response(e.message || e.toString(), {
                    status: 500,
                }),
            );
        }
        event.respondWith(new Response('Internal Error', { status: 500 }));
    }
});

/**
 * Handle requests
 * @param {FetchEvent} event
 */
async function handleEvent(event) {
    const url = new URL(event.request.url);

    try {
        // Get assets from KV storage
        return await getAssetFromKV(event, {
            mapRequestToAsset: (req) => {
                // SPA routing - for client-side routing
                // If path doesn't include a dot (likely not a file), serve index.html
                if (!url.pathname.includes('.')) {
                    return new Request(`${new URL(req.url).origin}/index.html`, req);
                }
                return req;
            }
        });
    } catch (e) {
        // If an error is thrown try to serve the asset at 404.html
        if (!DEBUG) {
            try {
                let notFoundResponse = await getAssetFromKV(event, {
                    mapRequestToAsset: (req) => new Request(`${new URL(req.url).origin}/404.html`, req),
                });

                return new Response(notFoundResponse.body, {
                    ...notFoundResponse,
                    status: 404,
                });
            } catch (e) { }
        }

        return new Response(e.message || e.toString(), { status: 500 });
    }
} 