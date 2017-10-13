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
    .showSidebar(renderSidebarHTML());
}


/**
 * Render and return sidebar HTML.
 */
function renderSidebarHTML() {
  var allPairsSheet = 
    SpreadsheetApp.getActiveSpreadsheet().getSheetByName('All Pairs') ||
    SpreadsheetApp.getActiveSpreadsheet().insertSheet('All Pairs');

  var allPairsByName = allPairsSheet.getDataRange().getValues();

  var renderedHTML = HtmlService.createHtmlOutputFromFile('pairs-sidebar')
    .append(renderPairsHTML(allPairsByName))
    .append('</div></body></html>')  // close remaining tags (see pairs-sidebar)
    .setTitle('Previous pairs')
    .setWidth(300);
  
  return renderedHTML;
}


/**
 * Render HTML to display a student's name and the names of their
 * pairs, by week.
 * 
 * Takes a rectangular array of pair data, with the first column
 * being the name of the student. It assumes that the first row is a
 * header.
 */
function renderPairsHTML(pairsDataByName) {
  var html = '';
 
  pairsDataByName.slice(1, pairsDataByName.length)
    .forEach(function (pairData) {
      var student = pairData.shift();
      
      html += openTag('div', student.toLowerCase().replace(' ', '-')) +
              student + "'s previous pairs:" +
              renderPreviousPairs(pairData) +
              closeTag('div');
    } 
  );
  return html;
}


/**
 * Get data from active cell as an HTML id.
 * 
 * Ex: 'Hello World' -> 'hello-world'
 */
function getCurrCellDataAsID() {
  var allPairsSheet =
    SpreadsheetApp.getActiveSpreadsheet().getSheetByName('All Pairs') ||
    SpreadsheetApp.getActiveSpreadsheet().insertSheet('All Pairs');

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
