import React from "react";
import Image from "next/image"
import ReactDOM from "react-dom";
import QRCode from "react-qr-code";
import { useState } from 'react';
import { useRef } from 'react';
import locations from '../public/locations.json';
import { toPng } from 'html-to-image';
import download from "downloadjs";

export default function QRGenerationPage() {
  const [entranceValue, setEntranceValue] = useState('');
  const [destinationValue, setDestinationValue] = useState('');
  
  const qr_label_ref = useRef(null)
  const qr_subtitle_ref = useRef(null)
  const qr_ref = useRef(null)
  const destination_dropdown_ref = useRef(null)


  function handleEntranceChange(event) {
    setEntranceValue(event.target.value);
    if(event.target.value != "")
        destination_dropdown_ref.current.disabled = false;
    else
    {
        destination_dropdown_ref.current.disabled = true;
        destination_dropdown_ref.current.value = ""
        destination_dropdown_ref.current.option = "(none)"
    }
  }

  function handleDestinationChange(event) {
    setDestinationValue(event.target.value);
  }

  function handleQRCodeClick() {
    //Update QR Code label and generate url 
    var qrlabel = "Clinic Directions"
    var qrvalue = locations.homepage_url
    if(entranceValue != "")
    {
        qrlabel += ` from ${entranceValue}`
        qrvalue += `/${entranceValue}`
        if(destinationValue != "")
        {
            qrlabel += ` to ${destinationValue}`
            qrvalue += `/${destinationValue}`
        }
    }
    qrvalue = qrvalue.replace(/ /g, "%20")
    qr_label_ref.current.innerHTML = qrlabel
    qr_subtitle_ref.current.innerHTML = qrvalue

    //Render QR Code
    ReactDOM.render(<QRCode value={qrvalue} />, document.getElementById("qr_div"))
    return(qrlabel)
  }

  function handleQRJPGClick()
  {
    //render qrcode
    var qrlabel = handleQRCodeClick()
    toPng(document.getElementById('qr_container'))
    .then(function (dataUrl) {
        download(dataUrl, `${qrlabel}.png`);
    });
  }
  function handlePDFClick() {
    // Generate PDF logic goes here
    alert("TODO: i dont work! make me work using pdf-lib!")
  }

  return (
    <>
        <div>
        <h1>HospitalNav QR Code Generator</h1>
        <p>Use this tool to generate QR codes that will be used by visitors to quickly navigate themselves through the Kentucky Clinic.</p>
        <label htmlFor="entrances">Entrances:</label>
        <select id="entrances" value={entranceValue} onChange={handleEntranceChange}>
            <option value="">--Please choose an entrance--</option>
            {locations.entrances.map((entrance) => (
            <option key={entrance} value={entrance}>
                {entrance}
            </option>
            ))}
        </select>
        <br />
        <label htmlFor="destinations">Destinations:</label>
        <select ref={destination_dropdown_ref} id="destinations" value={destinationValue} onChange={handleDestinationChange} disabled={true}>
            <option value="">(none)</option>
            {locations.destinations.map((destination) => (
            <option key={destination} value={destination}>
                {destination}
            </option>
            ))}
        </select>
        <br />
        <button onClick={handleQRCodeClick}>Generate QR Code</button>
        <button onClick={handleQRJPGClick}>Download QR Code</button>
        <button onClick={handlePDFClick}>Download PDF</button>
        </div>

        <div id="qr_container">
            <h3 ref={qr_label_ref}> </h3>
            <h6 ref={qr_subtitle_ref}> </h6>
            <div id="qr_div" ref={qr_ref} />
                
        </div>
    </>
  );
}