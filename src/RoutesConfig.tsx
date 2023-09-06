import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { GATracker } from './GATracker'
import { Route as RoutePath } from './routes'
import { MenuItemKey } from './Menu'

type RoutesConfigProps = {
    MenuFactory: (menuItemKey: MenuItemKey) => React.JSX.Element
    Photos: React.JSX.Element
    Albums: React.JSX.Element
    Album: React.JSX.Element
    About: React.JSX.Element
    SSRRedirect: React.JSX.Element
}

export const RoutesConfig = (props: RoutesConfigProps): React.JSX.Element => {
    const { MenuFactory, Photos, Albums, Album, About, SSRRedirect } = props

    return (
        <Routes>
            <Route
                path={RoutePath.VIEW_PHOTO_IN_ALL_PHOTOS}
                element={
                    <GATracker>
                        {MenuFactory(MenuItemKey.LATEST_PHOTOS)}
                        {Photos}
                    </GATracker>
                }
            />
            <Route
                path={RoutePath.VIEW_ALBUM}
                element={
                    <GATracker>
                        {MenuFactory(MenuItemKey.ALBUMS)}
                        {Album}
                    </GATracker>
                }
            />
            <Route
                path={RoutePath.VIEW_PHOTO_IN_ALBUM}
                element={
                    <GATracker>
                        {MenuFactory(MenuItemKey.ALBUMS)}
                        {Album}
                    </GATracker>
                }
            />
            <Route
                path={RoutePath.ALBUMS}
                element={
                    <GATracker>
                        {MenuFactory(MenuItemKey.ALBUMS)}
                        {Albums}
                    </GATracker>
                }
            />
            <Route
                path={RoutePath.ABOUT}
                element={
                    <GATracker>
                        {MenuFactory(MenuItemKey.ABOUT)}
                        {About}
                    </GATracker>
                }
            />
            <Route
                path={RoutePath.SSR_VIEW_PHOTO_IN_ALL_PHOTOS}
                element={<GATracker>{SSRRedirect}</GATracker>}
            />
            <Route path={RoutePath.SSR_VIEW_ALBUM} element={<GATracker>{SSRRedirect}</GATracker>} />
            <Route
                path={RoutePath.SSR_VIEW_PHOTO_IN_ALBUM}
                element={<GATracker>{SSRRedirect}</GATracker>}
            />
            <Route path={RoutePath.SSR_ALBUMS} element={<GATracker>{SSRRedirect}</GATracker>} />
            <Route path={RoutePath.SSR_ABOUT} element={<GATracker>{SSRRedirect}</GATracker>} />
            <Route path={RoutePath.SSR_HOME} element={<GATracker>{SSRRedirect}</GATracker>} />
            <Route
                path={RoutePath.HOME}
                element={
                    <GATracker>
                        {MenuFactory(MenuItemKey.LATEST_PHOTOS)}
                        {Photos}
                    </GATracker>
                }
            />
        </Routes>
    )
}
