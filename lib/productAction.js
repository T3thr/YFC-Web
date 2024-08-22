import useSWR from 'swr';

// fetcher function
async function fetcher(url) {
    const res = await fetch(url, { cache: 'no-store' });
    if (!res.ok) {
        throw new Error("Error cannot get data: products from API");
    }
    return res.json();
}

// fetch สินค้าด้วย SKU
export function useProductBySKU(sku) {
    const { data, error, mutate } = useSWR(`/api/products/${sku}`, fetcher);

    return {
        data,
        isLoading: !data && !error,
        mutate,
        error
    };
}

// fetch สินค้าให้โชว์ในเว็บ
export function useAllProducts() {
    const { data, error } = useSWR('/api/products', fetcher);

    return {
        data,
        isLoading: !data && !error,
        error
    };
}
