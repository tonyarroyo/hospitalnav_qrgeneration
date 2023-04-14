# HospitalNav QR Code Generator

This stand-alone application generates QR Codes that link to the main [HospitalNav](https://github.com/l3n1b/HospitalNav) application. This is intended for use by Kentucky Clinic staff to easily generate QR Codes that visitors can scan to navigate themselves throughout the hospital. 
![Screenshot of webpage](https://i.imgur.com/3YZXkWX.png)

## Usage
Run the application with `yarn next run`. This defaults to starting a webserver on `localhost:3000`.

## 
Use the dropdowns to select a designated entrance and destination. If no entrance is selected, the QR code links to the mainpage of the webapp where the visitor can select their entrance/destination manually. By selecting specific entrances and exits, the QR code will link to specific directions in the main webapp.





## TODO

PDF Generation is not yet implemented. This can be done by designing a generic template and using the [pdf-lib](https://www.npmjs.com/package/pdf-lib) library to add text and image, then download the result to the local machine in the same manner as the "Download QR Code" button functions.

The list of entrances, destinations, and the homepage url pulls from `public/locations.json`. This seperate repo should eventually be merged with the main application, and this should be updated to pull from the same json that the main project uses for locations. This way, if new locations need to be added or existing ones need to be modified, they only need to be updated in one file rather than multiple.

Make it look pretty! Match the style of the main webapp.
