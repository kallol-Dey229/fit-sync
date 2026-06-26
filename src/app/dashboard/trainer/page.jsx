

import TrainerDashboardPage from '@/components/dashboard/TrainerDashboardPage';
import { getClass } from '@/lib/api/classes';
import { getUserSession } from '@/lib/core/session';


const TrainerDashboardHomePage = async () => {
    
    const user = await getUserSession() ;
    
    const classes = await getClass(user.id);

    

    return <TrainerDashboardPage user={user} classes={classes}/>
};

export default TrainerDashboardHomePage;