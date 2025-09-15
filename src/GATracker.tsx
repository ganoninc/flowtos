import { ReactNode, useEffect } from 'react'
import ReactGA from 'react-ga4'
import { useLocation } from 'react-router-dom'

type GATrackerProps = {
    children: ReactNode
}

export const GATracker = ({ children }: GATrackerProps) => {
    const location = useLocation()
    const trackPage = (page: string) => {
        ReactGA.send({ hitType: 'pageview', page })
    }

    useEffect(() => {
        trackPage(location.pathname)
    }, [location])

    return <>{children}</>
}
