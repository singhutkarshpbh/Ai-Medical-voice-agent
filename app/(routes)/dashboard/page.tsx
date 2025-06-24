import React from 'react'
import HistoryList from './_components/HistoryList';
import { Button } from '@/components/ui/button';

function Dashboard() {
    return (
        <div>
            <div>
            <h2 font-bold text-2xl>My Dashboard</h2>
            <Button> +Consult with a doctor</Button>
            </div>
            <HistoryList />
        </div>
    )
}

export default Dashboard;