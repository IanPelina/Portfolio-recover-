import { useState } from 'react';

import './Collapse.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';

export default function Collapse({content, title}) {
    
    const [collapsed, setCollapsed] = useState(true);
    
    const [active, setActive] = useState(false);

    const displayContent = () => {
        setCollapsed(!collapsed);
        setActive(!active);
    }
    
    return (
        <div className='collapse-container'>
            <div className='title'>
                <div className='title-text' style={{marginBottom: 6}} onClick={displayContent}>
                    {title}
                </div>
                <FontAwesomeIcon className={`icon ${active && 'actived'}`} icon={faCaretDown} onClick={displayContent} />
                </div>
                {!collapsed && <div className='content'>{content}
            </div>}
        </div>
    )
}