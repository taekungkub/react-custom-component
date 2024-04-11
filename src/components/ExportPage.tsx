import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import html2canvas from "html2canvas";
import html2pdf from "html2pdf.js";

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import html2canvas from "html2canvas";
import html2pdf from "html2pdf.js";

export default function ExportPage() {
  const doc = new jsPDF();

  function handleExportAuto() {
    autoTable(doc, { html: "#my-table" });

    doc.save("table.pdf");
  }

  async function handleExportAuto2() {
    const doc = document.getElementById("my-table");
    const canvas = await html2canvas(doc);

    const pdf = new jsPDF();

    var width = pdf.internal.pageSize.getWidth();
    const startH = 10;
    const marginL = 5;
    let countHt = startH;
    const single = "";
    const csvData = null;
    const optionPDF = null;

    if (!single && (csvData || optionPDF == "cards")) {
      const title = doc.querySelector(`#${`title`}`);
      if (title) {
        const canvasT = await html2canvas(title);
        const ratioT = (width - 10) / canvasT.width;
        const wT = canvasT.width * ratioT;
        const hT = canvasT.height * ratioT;
        const imgTitle = canvasT.toDataURL("title/jpg");
        pdf.addImage(imgTitle, "JPEG", marginL, startH, wT, hT);
        countHt += hT;
      }

      const th = doc.getElementsByTagName("thead")[0];
      let h = 0,
        w;
      if (th) {
        const thead = await html2canvas(th);
        const canvasThead = thead.toDataURL("image/jpg");
        const ratio = (width - 10) / thead.width;
        w = thead.width * ratio;
        h = thead.height * ratio;
        pdf.addImage(canvasThead, "JPEG", marginL, countHt, w, h);
        countHt += h;
      }
      const myRank = document.getElementById("trow_0");
      if (dataStart != 0 && myRank) {
        const canvasM = await html2canvas(myRank);
        const myJPG = canvasM.toDataURL("image/jpg");
        const ratioM = (width - 10) / canvasM.width;
        const wM = canvasM.width * ratioM;
        const hM = canvasM.height * ratioM;
        if (hM) pdf.addImage(myJPG, "JPEG", marginL, countHt, wM, hM);
        countHt += hM;
      }

      const dataOfLength = dataStart ? dataStart + dataLength : dataLength;

      for (let idx = dataStart || 0; idx <= dataOfLength; idx++) {
        const tr = doc.querySelector(
          responsive ? `#part${idx}` : `#trow_${idx}`
        );

        if (tr) {
          const canvasRow = await html2canvas(tr);
          let ratio_ = (width - 10) / canvasRow.width;
          let margin = 3,
            x = (idx + 1) % 3,
            isEven = (idx + 1) % 2,
            col;
          if (responsive) {
            if (window.innerWidth < responsive[1]) {
              col = 2;
              ratio_ = ratio_ / 2;
            } else {
              col = 3;
              ratio_ = ratio_ / 3;
            }
          }
          if (responsive) {
            if (col == 2) {
              margin = !isEven
                ? marginL
                : 2.5 + pdf.internal.pageSize.getWidth() / 2;
            } else if (col == 3) {
              if (!x) margin = 2 + pdf.internal.pageSize.getWidth() / 3;
              if (x == 1)
                margin = 1 + (pdf.internal.pageSize.getWidth() / 3) * 2;
            }
          }
          const wt = canvasRow.width * ratio_;
          const ht = canvasRow.height * ratio_;
          const img = canvasRow.toDataURL("image/png");
          if (countHt + (h ? h : ht) + 8 > pdf.internal.pageSize.getHeight()) {
            pdf.addPage();
            countHt = startH;
            // console.log('-------------',idx)
            if (th) {
              const thead = await html2canvas(th);
              const canvasThead = thead.toDataURL("image/jpg");
              pdf.addImage(canvasThead, "JPEG", marginL, countHt, w, h);
              countHt += h;
            }
          }
          if (ht && wt) {
            pdf.addImage(
              img,
              "JPEG",
              responsive ? margin : marginL,
              countHt,
              wt,
              ht
            );
          }
          if (responsive) {
            if (col == 3 && x == 1) countHt += ht + 3;
            if (col == 2 && isEven) countHt += ht + 3;
          } else {
            countHt += ht;
          }
        }
      }
      pdf.save(`asdasd.pdf`);
      return;
    } else {
      const data = canvas.toDataURL("image/jpg");
      var height = pdf.internal.pageSize.getHeight();

      let ratio = (width - 5) / canvas.width;
      let wt = canvas.width * ratio;
      let ht = canvas.height * ratio;
      if (single == "page") {
        ratio = height / canvas.height;
        wt = canvas.width * ratio;
        ht = canvas.height * ratio;
        pdf.addImage(data, "JPEG", 10, 2, wt, ht);
      } else if (optionPDF?.height) {
        const ratioR = (height * optionPDF.height) / canvas.height;
        const wR = canvas.width * ratioR;
        const hR = canvas.height * ratioR;
        const pdfCrop = new jsPDF();
        if (wR > pdfCrop.internal.pageSize.width) {
          pdfCrop.addImage(data, "JPEG", 0, 0, wt, ht);
        } else {
          pdfCrop.addImage(data, "JPEG", 0, 0, wR, hR);
        }
        pdfCrop.save(`table.pdf`);
        return;
      } else if (optionPDF == "fit" || !optionPDF) {
        // fit width
        pdf.addImage(data, "JPEG", 5, 2, wt, ht);
      }
      pdf.save(`table.pdf`);
    }
  }

  async function downloadPDF() {
    const content = document.getElementById("All");
    // document.querySelector('#export').style.display = 'none'
    const opt = {
      margin: 1,
      filename: "Test.pdf",
      image: { type: "jpeg", quality: 1 },
      html2canvas: { scale: 1 },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    };

    var options = {
      jsPDF: { format: [267, 500] },
      margin: [7, 0, 8, 0], // t l b r
      image: { type: "jpeg", quality: 1 },
    };

    html2pdf()
      .set(opt)
      .from(content)
      .toPdf()
      .save(`table.pdf`)
      .then(() => {
        // document.querySelector('#export').style.display = ''
      });
  }

  async function downloadPDF2() {
    const content = document.getElementById("my-table");
    const canvas = await html2canvas(content);
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", [267, 210]);
    pdf.addImage(imgData, "JPEG", 0, 0, 210, 267);
    pdf.save("table.pdf");
  }

  return <div>ExportPage</div>;
}
