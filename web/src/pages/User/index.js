import React from 'react';
import { useParams, useLocation } from 'react-router-dom';
import './user.css';

function UserPage() {

    const { userId } = useParams();
    const location = useLocation();

    return (
        <div>
            <h1>Tasks Page</h1>
            <p>Bem vindo a nossa página de users</p>
            <section>
                <h2>Seção 1</h2>
                <p>Texto da seção 1</p>
            </section>
            <>{userId}</>
        </div>
    )
}

export default UserPage;