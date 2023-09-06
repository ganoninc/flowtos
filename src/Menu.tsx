import React from 'react'
import Nav from 'react-bootstrap/Nav'
import { useNavigate } from 'react-router-dom'
import { Route } from './routes'

import './Menu.scss'

export enum MenuItemKey {
    LATEST_PHOTOS = 'latest-photos',
    ALBUMS = 'albums',
    ABOUT = 'about',
}

export type MenuProps = {
    displayAlbums: boolean
    activeItemKey: MenuItemKey
}

export const Menu = (props: MenuProps): React.JSX.Element => {
    const { displayAlbums, activeItemKey } = props
    const navigate = useNavigate()

    const onSelectHandler = (
        selectedKey: string | null,
        _: React.SyntheticEvent<unknown>,
    ): void => {
        switch (selectedKey) {
            case MenuItemKey.LATEST_PHOTOS:
                navigate(Route.HOME)
                break
            case MenuItemKey.ALBUMS:
                if (activeItemKey !== MenuItemKey.ALBUMS) {
                    navigate(Route.ALBUMS)
                }
                break
            case MenuItemKey.ABOUT:
                navigate(Route.ABOUT)
                break
            default:
                navigate(Route.HOME)
        }
    }

    return (
        <Nav
            className='justify-content-center pt-2 pb-4'
            activeKey={activeItemKey}
            onSelect={onSelectHandler}
        >
            <Nav.Item>
                <Nav.Link eventKey={MenuItemKey.LATEST_PHOTOS}>Latest Photos</Nav.Link>
            </Nav.Item>
            {displayAlbums && (
                <Nav.Item>
                    <Nav.Link eventKey={MenuItemKey.ALBUMS}>Albums</Nav.Link>
                </Nav.Item>
            )}
            <Nav.Item>
                <Nav.Link eventKey={MenuItemKey.ABOUT}>About</Nav.Link>
            </Nav.Item>
        </Nav>
    )
}
