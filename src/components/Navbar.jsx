import React, { useContext } from 'react'
import SearchIcon from '@mui/icons-material/Search';
import LanguageIcon from '@mui/icons-material/Language';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import ViewListIcon from '@mui/icons-material/ViewList';
import Avatar from '@mui/material/Avatar';
import { DarkModeContext } from './darkModeContext';

export default function Navbar() {
    const { dispatch } = useContext(DarkModeContext);
  return (
    <div className='navbar'>
        <div className='wrapper'>
            {/* <div className="search">
                <input type="text" placeholder='Search...' />
                <SearchIcon />
            </div> */}
            <div className='items'>
                {/* <div className="item">
                    <LanguageIcon className='icon'/>
                    <span className='navSpan'>English</span>
                </div> */}
                <div className="item">
                <span className='navSpan'>Dark Mode</span>
                    <DarkModeIcon className='icon' onClick={()=> dispatch({type: "TOGGLE"})}/>
                </div>
                {/* <div className="item">
                    <FullscreenExitIcon className='icon' />
                </div> */}
                {/* <div className="item">
                    <NotificationsNoneIcon className='icon'/>
                    <div className="counter">1</div>
                </div>
                <div className="item">
                    <ChatBubbleOutlineIcon className='icon'/>
                    <div className="counter">2</div>
                </div> */}
                {/* <div className="item">
                    <ViewListIcon className='icon'/>
                </div> */}
                <div className='item'>
                    <Avatar src="https://api.lorem.space/image/face?w=150" alt="" className=''sx={{ width: 56, height: 56 }} />
                </div>
            </div>
        </div>
    </div>
  )
}
