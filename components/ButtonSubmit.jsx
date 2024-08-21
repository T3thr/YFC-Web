'use client'
import { useFormStatus} from 'react-dom'

const ButtonSubmit = ({ value ,...props }) => {
    const { pending } = useFormStatus();

    const buttonStyle = {
        backgroundColor: pending ? '#ccc' : '#007bff',
        color: '#fff', // Text color
        border: 'none',
        padding: '10px 20px',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '16px',
        transition: 'background-color 0.3s',
    };

    return (
        <div className='items-center'>
        <button style={buttonStyle} disabled={pending} {...props}>
            { pending ? 'Loading...' : value }
        </button>
        </div>
    )
}

export default ButtonSubmit