import { useEffect } from 'react'
import ReactGA from 'react-ga4'
import { useLocation } from 'react-router-dom'

type GATrackerProps = {
    children: JSX.Element | JSX.Element[] | (() => JSX.Element)
}

export const GATracker = (props: GATrackerProps): JSX.Element => {
    const location = useLocation()
    const trackPage = (page: string): void => {
        ReactGA.send({ hitType: 'pageview', page })
    }

    useEffect((): void => {
        trackPage(location.pathname)
    }, [location])

    return <>{props.children}</>
}
