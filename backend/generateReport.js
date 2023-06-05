import pdfkit from 'pdfkit';
import axios from 'axios';

let doc = null;

async function preparePdf (res) {
    // set the response headers
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename= STALS_Bookmarked.pdf');    // pipe the document to the response
    doc.pipe(res);
    
    // generate the report
    doc.image('./assets/report_header.png', 50, 0, {scale: 0.25});
}

async function generateReport (bookmarks, res) {
    let y = 300;
    let z = 140;
    for (let i = 0; i < bookmarks.length ; i++) {
        if(i > 0) {
            doc.addPage();
            z = 70;
            y = 220;
        }

        const accommodation = bookmarks[i];
        
        const isAvailable = accommodation.availability ? "Available" : "Not Available";
        const pricePeso = new Intl.NumberFormat('en-PH', {
            style: 'currency',
            currency: 'PHP',
        }).format(accommodation.rates);
        
        // if (y == 0) {
        //     y = y + 140;
        // } else {
        //     y = y + 200;
        // }
     
        doc.font('Helvetica-Bold')
        .fontSize(24)
        .text(`${i+1}. ${accommodation.name}`, 60, z);

        // y = y + 30;

        doc.font('Helvetica')
        .fontSize(14)
        .text(`Address: ${accommodation.location}, Brgy. ${accommodation.barangay}`, 70, z+30);
        // doc.text(`Owner: ${owner.fname} ${owner.lname}`);
        // doc.text(`Rates: ${pricePeso}`);
        doc.text(`Rates: ${accommodation.rates[0]} - ${accommodation.rates[1]}`);
        doc.text(`Ratings: ${accommodation.overallratings} out of 5`);
        doc.text(`Availability: ${isAvailable}`);
        doc.text(`Amenities: ${accommodation.amenities}`);
        doc.text(`Description: ${accommodation.description}`);
        // async function fetchImage(src) {
        //     const image = await axios
        //         .get(src, {
        //             responseType: 'arraybuffer'
        //         })
        //     return image.data;
        // }
        
        // let x = 60;
        // let count = 0;
        // for(let j = 0; j < accommodation.images.length; j++) {
        //     if(["jpg", "peg", "png"].includes(accommodation.images[j].substring(accommodation.images[j].length-3))) {
        //     const logo = await fetchImage(accommodation.images[j]);
        //     if(count < 2) {
        //         doc.image(logo, x, y, {width: 150, height: 150});
        //         x = x + 160;
        //         count++;
        //     } else {
        //         doc.image(logo, x, y, {width: 150, height: 150});
        //         x = 60;
        //         y = y + 150;
        //         count = 0;
        //     }
        //     }
            // y += 200;
            // doc.text(accommodation.images[j]);
        // }
    }
    doc.end();
}

// Function to for generating report on Accommodation
// Description: Finds instance of accomodation and generates a downloadable PDF file using the generateReport function
const getReport = (req, res) => {
    doc = new pdfkit();
    preparePdf(res);
    console.log(doc);
    generateReport(req.body.items, res);
}

export { getReport }