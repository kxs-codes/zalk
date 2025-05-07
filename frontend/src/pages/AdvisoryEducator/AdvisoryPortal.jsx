import React from 'react'
import PortalLogoBar from '../../components/PortalLogoBar.jsx';
import "../../styles/Student/pages/StudentPortal.css";


const AdvisoryPortal = () => {
  return (
    <div className="container">
        <PortalLogoBar />

        <div className="main">
            <div className="zalkCont">
                <img src="transparent-reading-zebra.png" className="smartZebra"/>
            </div>
            <h1 className="headPortal">
                    Welcome Advisory Board!
                </h1>
          
        </div>
    </div>
  )
}

export default AdvisoryPortal
