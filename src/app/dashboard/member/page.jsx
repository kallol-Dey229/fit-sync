import { authClient } from '@/lib/auth-client';
import React from 'react';

const MemberDashboardPage = () => {
    const { data: session } = authClient.useSession();
    const user = session?.user;
    return (
        <div>
            <h2>Member page</h2>
        </div>
    );
};

export default MemberDashboardPage;