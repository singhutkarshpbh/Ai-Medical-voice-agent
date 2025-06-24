import React from 'react'
import HistoryList from './_components/HistoryList';
import { Button } from '@/components/ui/button';
import DoctorsAgentList from './_components/DoctorsAgentList';

function Dashboard() {
    return (
        <div>
            <div className='flex justify-between'>
            <h2 font-bold text-2xl>My Dashboard</h2>
            <Button> +Consult with a doctor</Button>
            </div>
            <HistoryList />
            <DoctorsAgentList />
        </div>
    )
}

export default Dashboard;