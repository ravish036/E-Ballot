import React from 'react'
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Html5QrcodeScanner } from 'html5-qrcode'

function Qr(){

    const [scanResult, setScanResult] = useState(null);

    const [voterList, SetVoterList] = useState([
        0xA254A1c0fC6e6AAcD2C0e6bB271f15876bA10882, //test3
        0x3E7cBE861787618d6825793Ec2f0378486612eEd, //test4
        0xa1B2CDa36C3271fc7aB5746c285D25df25e87668, //test5
    ]);
    const navigate = useNavigate();

    useEffect(() => {
        const Scanner =  new Html5QrcodeScanner('reader', {
            qrbox:{
                width: 250,
                height: 250,
            },
        fps: 10,
    });

    Scanner.render(success,error);

    function success(e){
        Scanner.clear();
        setScanResult(e);
    }
    function error(err){
        console.warn(err);
    }
},[]);

    return (
        <div className='qr'>
        <h1 className='qrtitle'>This is Qr section</h1>
        {
            scanResult 
                ? ( scanResult === voterList.includes(scanResult) ? navigate('/voting') : navigate('/voting') )
            : <div id='reader' className='reader'></div>
        }
    </div>
  )
}

export default Qr;