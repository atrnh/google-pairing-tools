/**
 * by ashley trinh 2017
 * 
 * IMPORTANT - IF YOU ARE HERE BECAUSE YOU NEED THIS TO WORK ON ANOTHER SPREADSHEET:
 * 1. Copy and paste all this stuff into your sheet's own Code.gs
 * 2. Click on File > New > Html and name it pairs-sidebar.html
 * 3. Copy and paste the code from this sheet's pairs-sidebar.html
 * 4. Go to your spreadsheet and a menu called 'Pairing Tools' should appear (you
 *    may need to open and reopen the sheet to see it)
 * 
 * This tool will not work unless you have a sheet called All Pairs.
 * For info on how to do this, see https://github.com/atrnh/hbpair-cli
 */


/**
 * Sets up menu when spreadsheet is opened.
 *
 * Only works when script is installed so for now run this function 
 * manually when you have made changes to the 'All Pairs' sheet.
 */
function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu('Pairing Tools')
    .addItem('Show previous pairs', 'showPairsSidebar')
    .addToUi();
}


/**
 * Attach sidebar to the Google Sheets UI.
 */
function showPairsSidebar() {
  SpreadsheetApp.getUi()
    .showSidebar(renderSidebarHtml());
}


/**
 * Render and return sidebar HTML.
 */
function renderSidebarHtml() {
  var allPairsSheet = getSheet('All Pairs'); 

  var allPairsByName = allPairsSheet.getDataRange().getValues();

  var renderedHtml = HtmlService.createHtmlOutputFromFile('pairs-sidebar')
    .append(renderPairsHtml(allPairsByName))
    .setTitle('Previous pairs')
    .setWidth(300);
  
  return renderedHtml;
}


/**
 * Render HTML to display a student's name and the names of their
 * pairs, by week.
 * 
 * Takes a rectangular array of pair data, with the first column
 * being the name of the student. It assumes that the first row is a
 * header.
 */
function renderPairsHtml(pairsDataByName) {
  var html = '';
 
  pairsDataByName.slice(1, pairsDataByName.length)
    .forEach(function (pairData) {
      var student = pairData.shift();
      
      // Uses student name as the id for the div
      html += openTag('div', student.toLowerCase().replace(' ', '-')) +
              student + "'s previous pairs:" +
              renderPreviousPairs(pairData) +
              closeTag('div') + closeTag('div') + closeTag('body') +
              closeTag('html');
    } 
  );
  return html;
}


/**
 * Get data from active cell as an HTML id.
 * 
 * Ex: 'Hello World' -> 'hello-world'
 */
function getCurrCellDataAsId() {
  var allPairsSheet = getSheet('All Pairs');
  
  return allPairsSheet.getActiveCell()
    .getValue()
    .toLowerCase()
    .replace(' ', '-');
}


/**
 * Take a list of lab partners and render them as an ordered list in HTML.
 */
function renderPreviousPairs(pairs) {
  var html = openTag('ol', null);
  
  pairs.forEach(function(pair) {
    html += openTag('li') + pair + closeTag('li');
  });
  
  html += closeTag('ol');
  
  return html;
}


/**
 * Return a sheet in CSV format.
 */
function getSheetAsCsv(sheetName) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);
  var sheetData = sheet.getDataRange().getValues();
  var rows = [];
  
  for (var i = 0; i < sheetData.length; i++) {
    var row = [];
    for (var j = 0; j < sheetData[i].length; j++) {
      if (sheetData[i][j]) {
        row.push(sheetData[i][j]);
      }
    }
    rows.push(row.join(","));
  }
  
  return rows.join("\n");
}


/**
 * Import an array of data, overwriting the sheet.
 */
function writeToSheet(sheetName, data) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet()
    .getSheetByName(sheetName)
    .clear();
  
  data.forEach(function (el) {
    sheet.appendRow(el);
  });
}


function getSheet(sheetName) {
  return
    SpreadsheetApp.getActiveSpreadsheet().getSheetByName('All Pairs') ||
    SpreadsheetApp.getActiveSpreadsheet().insertSheet('All Pairs');
}


/**
 * Return HTML tags.
 *
 * These are here because App Script doesn't appear to support
 * ES5 and ES6 string templating.
 */
function openTag(tag, id) {
  return id ? 
    '<' + tag + ' id="' + id + '">' : 
    '<' + tag + '>';
}


function closeTag(tag) {
  return '</' + tag + '>';
}
