import { useEffect } from 'react'

export default function page() {
    const obj = { name: 'Shah alam' };

    useEffect(() => {
        console.log(obj);
    }, [obj]);

    return (
        <div>Choose Workspace</div>
    )
}