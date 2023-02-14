import { useState, useEffect } from 'react'

function Dashboard(){
    const [isLoading, setIsLoading] = useState(true) //estado inicial
    const [dashboardData, setDashboardData] = useState(null)

    useEffect(() => {
        async function fetchDashboardData(){
            const response = await fetch('http://localhost:4000/dashboard')
            const data = await response.json()
            setDashboardData(data)
            setIsLoading(false)
        }
        fetchDashboardData()
    }, [])

    if(isLoading){
        return <h2>Loading...</h2>
    }

    return(
        <div>
            <h2>Dashboard</h2>
            <h3>Posts - {dashboardData.posts}</h3>
            <h3>Likes - {dashboardData.likes}</h3>
            <h3>Followers - {dashboardData.following}</h3>
            <h3>Following - {dashboardData.followers}</h3>
        </div>
    )
}
export default Dashboard