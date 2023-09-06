import React from 'react'
import Nav from 'react-bootstrap/Nav'
import { useNavigate, useLocation } from 'react-router-dom'
import { Route } from './routes'

import './Menu.scss'

enum MenuItemKey {
    LATEST_PHOTOS = 'latest-photos',
    ALBUMS = 'albums',
    ABOUT = 'about',
}

type MenuProps = {
    displayAlbums: boolean
}

export const Menu = (props: MenuProps): React.JSX.Element => {
    const { displayAlbums } = props
    const navigate = useNavigate()
    const location = useLocation()

    const onSelectHandler = (
        selectedKey: string | null,
        _: React.SyntheticEvent<unknown>,
    ): void => {
        switch (selectedKey) {
            case MenuItemKey.LATEST_PHOTOS:
                navigate(Route.HOME)
                break
            case MenuItemKey.ALBUMS:
                navigate(Route.ALBUMS)
                break
            case MenuItemKey.ABOUT:
                navigate(Route.ABOUT)
                break
            default:
                navigate(Route.HOME)
        }
    }

    // const getNavbar = (activeItem: string): React.JSX.Element => {
    //   return (
    //     <div className="menu">
    //       <Nav
    //         className="justify-content-center pt-2"
    //         activeKey={activeItem}
    //         onSelect={onSelectHandler}
    //       >
    //         <Nav.Item>
    //           <Nav.Link eventKey="latest-photos">Latest Photos</Nav.Link>
    //         </Nav.Item>
    //         {displayAlbums && (
    //           <Nav.Item>
    //             <Nav.Link eventKey="albums">Albums</Nav.Link>
    //           </Nav.Item>
    //         )}
    //         <Nav.Item>
    //           <Nav.Link eventKey="about">About</Nav.Link>
    //         </Nav.Item>
    //       </Nav>
    //     </div>
    //   );
    // };

    return (
        <div className='category-selector'>
            {/* <Routes>
        <Route path="/photos/:photoId" element={getNavbar('latest-photos')} />
        <Route path="/albums/*" element={getNavbar('albums')} />
        <Route path="/about" element={getNavbar('about')} />
        <Route path="/" element={getNavbar('latest-photos')} />
      </Routes> */}
            <Nav
                className='justify-content-center pt-2'
                activeKey={location.pathname}
                onSelect={onSelectHandler}
            >
                <Nav.Item>
                    <Nav.Link eventKey='latest-photos'>Latest Photos</Nav.Link>
                </Nav.Item>
                {displayAlbums && (
                    <Nav.Item>
                        <Nav.Link eventKey='albums'>Albums</Nav.Link>
                    </Nav.Item>
                )}
                <Nav.Item>
                    <Nav.Link eventKey='about'>About</Nav.Link>
                </Nav.Item>
            </Nav>
        </div>
    )
}
