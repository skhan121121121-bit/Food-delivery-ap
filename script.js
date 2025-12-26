function doPost(e) {
  try {
    var ss = SpreadsheetApp.openById(
      "16S1YVv7AcgpSaEIBrDXpmYQgB3Fjh6vzBXukVoGMnXI"
    );
    var sheet = ss.getSheetByName("food order");

    var data = JSON.parse(e.postData.contents);

    sheet.appendRow([
      new Date(),
      data.name,
      data.phone,
      data.address,
      data.items,
      data.total
    ]);

    return ContentService.createTextOutput("SUCCESS");
  } catch (err) {
    return ContentService.createTextOutput("ERROR: " + err);
  }
}

function doGet() {
  return ContentService.createTextOutput("WORKING");
}
