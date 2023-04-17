import React, { useState } from 'react';

import './tabs.scss'

function Tabs({ children }) {
    const [activeTab, setActiveTab] = useState(0);

    const handleTabClick = (index) => {
        setActiveTab(index);
    };

    return (
        <div className="tabs">
            <ul className="tabs-nav">
                {React.Children.map(children, (child, index) => (
                    <li
                        className={`tab-nav-item ${
                            activeTab === index ? 'active' : ''
                        }`}
                        onClick={() => handleTabClick(index)}
                    >
                        {child.props.label}
                    </li>
                ))}
            </ul>
            <div className="tabs-content">
                {React.Children.map(children, (child, index) => (
                    <div
                        className={`tab-item ${activeTab === index ? 'active' : ''}`}
                    >
                        {child.props.children}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Tabs;