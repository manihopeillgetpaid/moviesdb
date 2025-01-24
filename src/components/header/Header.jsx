import React, { Children } from "react";
import { Tabs } from 'antd';
import SearchPanel from '../searchPanel/SearchPanel.jsx'
const Header = () => {
    const onChange = (key) => {
        console.log(key);
      };
    const items = [
        {
          key: '1',
          label: 'Search',
          children: <SearchPanel/>,
        },
        {
          key: '2',
          label: 'Rated',
          children: 'Content of Tab Pane 2',
        }]
    return(
        <>
<Tabs defaultActiveKey="1" items={items} onChange={onChange} centered/>

</>
    )
}
export default Header;