/* eslint-disable react/prop-types */
import { useState } from 'react'
import './switchTabs.css';

export const SwitchTabs = ({ data, onTabChange}) => {
    
    const [selectedTab,setSelectedTab] = useState(0)
    /*this state work left property as css, 100px 
    or 0 px and it will change based on index*/ 
    const [left,setLeft] = useState(0)

    const activeTab = (tab, index) => {
        setLeft(index * 100)
        setTimeout(() => {
            setSelectedTab(index)
        }, 300);
        onTabChange(tab,index)
    }
  
  return (
    <div className='switching__tab'>
        <div className="switching__tab-items">
            {
                data.map((tab,index) =>(
                    <span key={index} 
                          className={`switching__tab-item ${selectedTab === index ? "active" : ""}`}
                          onClick={() => activeTab(tab,index)}>
                        {tab}
                    </span>
                ))
            }
            <span className="switching__tab-moving_bg" style={{left}}/>
        </div>
    </div>
  )
}