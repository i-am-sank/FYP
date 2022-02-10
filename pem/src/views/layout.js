import React from 'react';
import Topbar from '../components/Topbar/topbar';
import Footer from '../components/Footer/footer';
import {Segment } from 'semantic-ui-react';

function Layout(props) {
    
    return (
        <div>
            <div style={{marginBottom: '130px'}}>
              <Topbar/>
            </div>
            <Segment basic>
              <div style={{minHeight: '70vh', marginTop: '50px'}}>
              {props.children}
              </div>
            </Segment>

            <Footer/> 
        </div>
    )
}

export default Layout;