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
    let y = 0;

    for (let i = 0; i < bookmarks.length ; i++) {
        const accommodation = bookmarks[i];
        
        const isAvailable = accommodation.availability ? "Available" : "Not Available";
        const pricePeso = new Intl.NumberFormat('en-PH', {
            style: 'currency',
            currency: 'PHP',
        }).format(accommodation.rates);
        
        if (y == 0) {
            y = y + 140;
        } else {
            y = y + 100;
        }
     
        doc.font('Helvetica-Bold')
        .fontSize(20)
        .text(`${i+1}. ${accommodation.name}`, 50, y);

        y = y + 25;

        doc.font('Helvetica')
        .fontSize(12)
        .text(`Address: ${accommodation.location}, Brgy. ${accommodation.barangay}`, 70, y);
        // doc.text(`Owner: ${owner.fname} ${owner.lname}`);
        // doc.text(`Rates: ${pricePeso}`);
        doc.text(`Rates: ${accommodation.rates[0]} - ${accommodation.rates[1]}`);
        doc.text(`Ratings: ${accommodation.overallratings} out of 5`);
        doc.text(`Availability: ${isAvailable}`);
        doc.text(`Amenities: ${accommodation.amenities}`);
        doc.text(`Description: ${accommodation.description}`);
        // doc.text(`Images: ${accommodation.images[0]}`);
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