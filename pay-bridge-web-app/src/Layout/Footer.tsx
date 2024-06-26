import React, { useEffect, useState } from 'react'

function Footer() {
   
  const [currentYear, setCurrentYear] = useState(0);
  
  useEffect(() => {
    setCurrentYear(new Date(Date.now()).getFullYear())
  }, []);
    
  return (
    <div id="footer" className='footer text-center mt-4 p-3 bg-dark' style={{color: "#0DA378"}}>
        PayBridge Web Service &copy; Made by freebie in {currentYear}
    </div>
  )
}

export default Footer