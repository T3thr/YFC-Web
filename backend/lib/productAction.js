import useSWR from 'swr';

// Fetcher function
async function fetcher(url) {
    const res = await fetch(url, { cache: 'no-store' });
    if (!res.ok) {
        throw new Error("Error cannot get data: products from API");
    }
    return res.json();
}

// Fetch product by SKU
export function useProductBySKU(sku) {
    const { data, error, mutate } = useSWR(sku ? `/api/products/${sku}` : null, fetcher);

    return {
        data: data || { productName: '', images: [] }, // Ensure data is defined with a default shape
        isLoading: !data && !error,
        mutate,
        error
    };
}

// Fetch all products
export function useAllProducts() {
    const { data, error } = useSWR('/api/products', fetcher);

    return {
        data: data || [], // Ensure data is defined
        isLoading: !data && !error,
        error
    };
}
