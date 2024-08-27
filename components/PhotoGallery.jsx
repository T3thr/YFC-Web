// components/PhotoGallery.js

'use client'
import { useEffect, useState } from 'react';
import Image from 'next/image';

const PhotoGallery = () => {
    const [photos, setPhotos] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch photos from the API
        const fetchPhotos = async () => {
            try {
                const res = await fetch('/api/photos');
                const data = await res.json();
                
                if (res.ok) {
                    setPhotos(data);
                } else {
                    setError(data.errMsg || 'Failed to fetch photos');
                }
            } catch (err) {
                setError('An error occurred while fetching photos');
            }
        };

        fetchPhotos();
    }, []);

    return (
        <div>
            {error && <p style={{ color: 'red', zIndex: 1  }}>{error}</p>}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' , zIndex: 1 }}>
                {photos.map((photo) => (
                    <div key={photo.public_id} style={{ width: '200px', height: '200px', position: 'relative' , overflow: 'hidden' }}>
                        <Image
                            src={photo.secure_url}
                            alt={`Photo ${photo.public_id}`}
                            layout='fill'
                            objectFit='cover'
                            style={{ borderRadius: '8px' }}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PhotoGallery;
