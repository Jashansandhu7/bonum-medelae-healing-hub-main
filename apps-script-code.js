// Google Apps Script for Bonum Medelae Healing Hub Order Management
// Optimized for memory and time efficiency

// Cache frequently used values
const SCRIPT_TIMEZONE = Session.getScriptTimeZone();
const CURRENCY_FORMAT = '₹#,##0.00';
const INTEGER_FORMAT = '#,##0';

// Pre-defined constants to avoid repeated calculations
const HEADERS = [
  'Order ID', 'Date', 'Time', 'Customer Name', 'Phone', 'Address',
  'Products Details', 'Order Subtotal', 'Total GST', 'Grand Total',
  'Total Items', 'Status'
];

const COLUMN_WIDTHS = {
  1: 120,   // Order ID
  4: 150,   // Customer Name  
  6: 250,   // Address
  7: 400    // Products Details
};

const CURRENCY_COLUMNS = [8, 9, 10];

// Add CORS headers to all responses
function setCorsHeaders(response) {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Max-Age': '86400'
  };
  
  Object.keys(headers).forEach(key => response.setHeader(key, headers[key]));
  return response;
}

function doPost(e) {
  // Handle CORS preflight requests
  if (e.postData.type === "options" || e.method === "OPTIONS") {
    return ContentService.createTextOutput("")
      .setMimeType(ContentService.MimeType.TEXT)
      .setHeader('Access-Control-Allow-Origin', '*')
      .setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
      .setHeader('Access-Control-Allow-Headers', 'Content-Type, Origin')
      .setHeader('Access-Control-Max-Age', '86400');
  }

  try {
    if (!e?.postData?.contents) {
      return createErrorResponse('Invalid request data');
    }
    
    const requestData = JSON.parse(e.postData.contents);
    
    if (requestData.action === 'addOrder') {
      return processOrder(requestData.data);
    }
    
    return createErrorResponse('Unknown action');
    
  } catch (error) {
    console.error('❌ Server error:', error);
    return createErrorResponse('Server error: ' + error.message);
  }
}

function processOrder(orderData) {
  try {
    const sheet = getOrCreateSheet();
    const timestamp = Date.now();
    const now = new Date(timestamp);
    
    // Pre-calculate all values in single pass
    const { subtotal, totalGst, totalItems, productsDetails } = calculateOrderData(orderData.cartItems);
    const grandTotal = subtotal + totalGst;
    
    // Create row data array directly
    const rowData = [
      'BM' + timestamp,                                                    // Order ID
      Utilities.formatDate(now, SCRIPT_TIMEZONE, 'dd/MM/yyyy'),          // Date
      Utilities.formatDate(now, SCRIPT_TIMEZONE, 'HH:mm:ss'),            // Time
      orderData.customerInfo.name,                                        // Customer Name
      orderData.customerInfo.phone,                                       // Phone
      orderData.customerInfo.address,                                     // Address
      productsDetails,                                                    // Products Details
      subtotal,                                                           // Order Subtotal
      totalGst,                                                          // Total GST
      grandTotal,                                                         // Grand Total
      totalItems,                                                         // Total Items
      'New'                                                              // Status
    ];
    
    // Single batch operation to add row
    sheet.appendRow(rowData);
    const lastRow = sheet.getLastRow();
    
    // Batch format operations
    formatOrderRow(sheet, lastRow);
    
    console.log('✅ Order processed:', 'BM' + timestamp);
    
    return createSuccessResponse({
      orderId: 'BM' + timestamp,
      total: grandTotal,
      totalItems: totalItems,
      timestamp: now.toISOString()
    });
    
  } catch (error) {
    console.error('❌ Error processing order:', error);
    return createErrorResponse('Failed to process order: ' + error.message);
  }
}

function calculateOrderData(cartItems) {
  let subtotal = 0;
  let totalGst = 0;
  let totalItems = 0;
  const productDetails = [];
  
  // Single loop to calculate everything
  for (let i = 0; i < cartItems.length; i++) {
    const item = cartItems[i];
    const qty = item.quantity;
    const price = item.tradePrice;
    const productTotal = price * qty;
    const gstRate = parseFloat(item.gst.replace('%', '')) * 0.01;
    const gstAmount = productTotal * gstRate;
    
    subtotal += productTotal;
    totalGst += gstAmount;
    totalItems += qty;
    
    // Build formatted string efficiently
    productDetails.push(
      `• ${item.name}\n  Qty: ${qty} | Rate: ₹${price.toFixed(2)} | GST: ${item.gst}\n  Total: ₹${productTotal.toFixed(2)} (+ ₹${gstAmount.toFixed(2)} GST)`
    );
  }
  
  return {
    subtotal,
    totalGst,
    totalItems,
    productsDetails: productDetails.join('\n\n')
  };
}

function getOrCreateSheet() {
  let spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  if (!spreadsheet) {
    spreadsheet = SpreadsheetApp.create('Bonum Medelae Orders');
  }
  
  let sheet = spreadsheet.getSheetByName('Orders');
  if (!sheet) {
    sheet = createNewSheet(spreadsheet);
  }
  
  return sheet;
}

function createNewSheet(spreadsheet) {
  const sheet = spreadsheet.insertSheet('Orders');
  
  // Batch header setup
  const headerRange = sheet.getRange(1, 1, 1, HEADERS.length);
  headerRange.setValues([HEADERS])
    .setBackground('#4a90e2')
    .setFontColor('white')
    .setFontWeight('bold')
    .setWrap(true);
  
  sheet.setFrozenRows(1);
  
  // Batch set column widths
  Object.entries(COLUMN_WIDTHS).forEach(([col, width]) => {
    sheet.setColumnWidth(parseInt(col), width);
  });
  
  console.log('📋 Created new Orders sheet');
  return sheet;
}

function formatOrderRow(sheet, rowNum) {
  // Batch format currency columns
  const ranges = CURRENCY_COLUMNS.map(col => sheet.getRange(rowNum, col));
  ranges.forEach(range => range.setNumberFormat(CURRENCY_FORMAT));
  
  // Format quantity column
  sheet.getRange(rowNum, 11).setNumberFormat(INTEGER_FORMAT);
  
  // Set row properties
  const rowRange = sheet.getRange(rowNum, 1, 1, 12);
  rowRange.setWrap(false)
    .setBorder(true, true, true, true, true, true)
    .setVerticalAlignment('top');
  
  // Special formatting for products column
  sheet.getRange(rowNum, 7).setWrap(true);
  sheet.setRowHeight(rowNum, 120);
  
  // Auto-resize non-fixed columns
  for (let col = 1; col <= 12; col++) {
    if (!COLUMN_WIDTHS[col]) {
      sheet.autoResizeColumn(col);
    }
  }
}

function createSuccessResponse(data) {
  const response = ContentService.createTextOutput(JSON.stringify({
    success: true,
    ...data
  }))
  .setMimeType(ContentService.MimeType.JSON)
  .setHeader('Access-Control-Allow-Origin', '*')
  .setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
  .setHeader('Access-Control-Allow-Headers', 'Content-Type, Origin')
  .setHeader('Access-Control-Max-Age', '86400');
  
  return response;
}

function createErrorResponse(error) {
  const response = ContentService.createTextOutput(JSON.stringify({
    success: false,
    error: error
  }))
  .setMimeType(ContentService.MimeType.JSON)
  .setHeader('Access-Control-Allow-Origin', '*')
  .setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
  .setHeader('Access-Control-Allow-Headers', 'Content-Type, Origin')
  .setHeader('Access-Control-Max-Age', '86400');
  
  return response;
}

function doGet() {
  return createSuccessResponse({
    message: "Bonum Medelae Order Management API is running",
    timestamp: new Date().toISOString(),
    version: "2.1.0"
  });
} 