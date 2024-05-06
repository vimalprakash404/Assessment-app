const { jsPDF } = require("jspdf");

function dataPaster(user, number, doc) {
    doc.setLineWidth(1);
    doc.line(0, number + 10, 250, number + 10);
    doc.setFontSize(48);
    doc.setFont("courier", "normal");
    doc.text("ACCESS CARD", 50, number + 30);
    doc.setFontSize(20);
    doc.text("URL: " + user.url, 65, number + 50);
    doc.text("UN: " + user.un, 65, number + 60);
    doc.text("PW: " + user.pw, 65, number + 70);
    doc.rect(199.1, number + 20, 10, 60);
    doc.text("ROLL NO: " + user.roll, 207, number + 77, null, 90);
    doc.line(0, number + 90, 250, number + 90);
}

function createPDF(users) {
    const doc = new jsPDF({
        orientation: "p",
        unit: "mm",
        format: "a4"
    });
    doc.setFont("helvetica");
    doc.setFontSize(12);

    var i = 0;
    users.forEach((user, index) => {
        if (i === 0) {
            dataPaster(user, 0, doc);
        } else if (i === 1) {
            dataPaster(user, 100, doc);
        } else {
            dataPaster(user, 200, doc);
        }
        if (i === 2) {
            if (!(users.length === users.indexOf(user) + 1)) {
                doc.addPage();
                i = 0;
            }else{
                i += 1;
            }
        }
        else{
            i += 1;
        }
       
    });

    const pdfData = doc.output('arraybuffer');
    return Buffer.from(pdfData);
}


module.exports  =  createPDF;