import React from 'react';

export default function DeleteImageButton({ sku, imageId }) {
    const handleDelete = async () => {
        const response = await fetch(`/api/products/${sku}/images/${imageId}`, {
            method: 'DELETE'
        });

        const result = await response.json();
        if (result.message === 'Image deleted successfully') {
            // Refresh product data
            mutate();
        } else {
            alert(result.message);
        }
    };

    return (
        <button onClick={handleDelete} className="text-red-600 hover:text-red-800">
            Delete Image
        </button>
    );
}
