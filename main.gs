const url = "<your google sheet URL>"

function doGet() {
  var template = HtmlService.createTemplateFromFile('sell_page');
  return template.evaluate().setSandboxMode(HtmlService.SandboxMode.IFRAME);
}

function include(filename){
  return HtmlService.createHtmlOutputFromFile(filename).getContent()
}

// standard function 
// return active spreadsheet and active sheet 
function initSheet(url, sheetname){
  let sheet = SpreadsheetApp.openByUrl(url)
  return sheet.getSheetByName(sheetname)
}
// generate unique ID 
function setID(){
  let id = Utilities.getUuid().split("-").join("")
  return id.slice(0, 9)
}
// -------------------------------------------

// 1.Create
function create(addToSheet,addData) {
  let data = []
  data.push(setID())
  data.push(Date())
  for(let i in addData){
    data.push(addData[i])
  }
  initSheet(url,addToSheet).appendRow(data)
}

// 2.Read
function read(readFromSheet){
  let data = initSheet(url,readFromSheet).getDataRange().getValues()
  data.shift()
  data.reverse()
  return data 
}

// 3.Update
function update(updateToSheet, id, updateData){
  let sheet = initSheet(url, updateToSheet)
  for(let i=1; i<=sheet.getLastRow();i++){
    if(sheet.getRange(i,1).getValue() == id){
      for(let j=3; j<= sheet.getLastColumn();j++){
        sheet.getRange(i,j).setValue(updateData[j-3])
      }
      break
    }
  }
}

// 4.delete
function remove(deleteAtSheet, id){
  let sheet = initSheet(url, deleteAtSheet)
  for(let i=1; i<=sheet.getLastRow();i++){
    if(sheet.getRange(i,1).getValue() == id){
      sheet.deleteRow(i)
      break
    }
  }
}

function getProductName(productSheeet){
  let sheet = initSheet(url, productSheeet)
  let data = []
  for(let i=1; i<=sheet.getLastRow();i++){
    data.push(sheet.getRange(i,3).getValue())
  }
  data.shift()
  return data
}
