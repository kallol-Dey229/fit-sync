

import TrainerDashboardPage from '@/components/dashboard/TrainerDashboardPage';
import { getClass } from '@/lib/api/classes';
import { getForumPosts } from '@/lib/api/posts';
import { getUserSession } from '@/lib/core/session';


const TrainerDashboardHomePage = async () => {
    
    const user = await getUserSession() ;
    
    const [classes, forumResponse] = await Promise.all([
        getClass(user.id),
        getForumPosts(user.id),
    ]);
    const forumPosts = Array.isArray(forumResponse) ? forumResponse : (forumResponse?.data || []);

    

    return <TrainerDashboardPage user={user} classes={classes} forumPosts={forumPosts}/>;
};

export default TrainerDashboardHomePage;