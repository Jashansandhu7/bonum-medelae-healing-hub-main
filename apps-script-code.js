// Google Apps Script for Bonum Medelae Healing Hub Order Management

function doPost(e) {
  // Set CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Max-Age': '86400'
  };

  // Handle preflight requests
  if (e.postData.type === "options") {
    return ContentService.createTextOutput("")
      .setMimeType(ContentService.MimeType.TEXT)
      .setHeaders(headers);
  }

  try {
    // Log request details for debugging
    console.log('Request received:', JSON.stringify(e, null, 2));
    
    // Validate request data
    if (!e || !e.postData || !e.postData.contents) {
      return createResponse({
        success: false, 
        error: 'Invalid request data'
      }, headers);
    }
    
    // Parse the request data
    let requestData;
    try {
      requestData = JSON.parse(e.postData.contents);
      console.log('📦 Received order data:', JSON.stringify(requestData, null, 2));
    } catch (parseError) {
      console.error('❌ JSON parse error:', parseError);
      return createResponse({
        success: false, 
        error: 'Invalid JSON data'
      }, headers);
    }
    
    // Handle order submission
    if (requestData.action === 'addOrder') {
      return processOrder(requestData.data, headers);
    } else {
      return createResponse({
        success: false, 
        error: 'Unknown action'
      }, headers);
    }
    
  } catch (error) {
    console.error('❌ Server error:', error);
    return createResponse({
      success: false, 
      error: 'Server error: ' + error.toString()
    }, headers);
  }
}

function processOrder(orderData, headers) {
  try {
    // Get the active spreadsheet
    let spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    if (!spreadsheet) {
      spreadsheet = SpreadsheetApp.create('Bonum Medelae Orders');
      console.log('📊 Created new spreadsheet:', spreadsheet.getName());
    }
    
    // Get or create the Orders sheet
    let sheet = spreadsheet.getSheetByName('Orders');
    if (!sheet) {
      sheet = spreadsheet.insertSheet('Orders');
      
      // Add headers
      const headers = [
        'Order ID',
        'Date',
        'Time',
        'Customer Name',
        'Phone',
        'Address',
        'Product Name',
        'Quantity',
        'Trade Price',
        'GST',
        'Product Total',
        'Order Subtotal',
        'Total GST',
        'Grand Total',
        'Status'
      ];
      
      // Style the header row
      const headerRange = sheet.getRange(1, 1, 1, headers.length);
      headerRange.setValues([headers])
        .setBackground('#4a90e2')
        .setFontColor('white')
        .setFontWeight('bold')
        .setWrap(true);
      
      // Freeze the header row
      sheet.setFrozenRows(1);
      console.log('📋 Created new Orders sheet with headers');
    }
    
    // Generate order ID
    const orderId = 'BM' + new Date().getTime();
    const now = new Date();
    const date = Utilities.formatDate(now, Session.getScriptTimeZone(), 'dd/MM/yyyy');
    const time = Utilities.formatDate(now, Session.getScriptTimeZone(), 'HH:mm:ss');
    
    // Calculate totals
    const subtotal = orderData.cartItems.reduce((sum, item) => 
      sum + (item.tradePrice * item.quantity), 0
    );
    
    const totalGst = orderData.cartItems.reduce((sum, item) => {
      const gstRate = parseFloat(item.gst.replace('%', '')) / 100;
      return sum + (item.tradePrice * item.quantity * gstRate);
    }, 0);
    
    const grandTotal = subtotal + totalGst;
    
    // Add each product as a separate row
    orderData.cartItems.forEach((item, index) => {
      const productTotal = item.tradePrice * item.quantity;
      const rowData = [
        orderId,
        date,
        time,
        orderData.customerInfo.name,
        orderData.customerInfo.phone,
        orderData.customerInfo.address,
        item.name,
        item.quantity,
        item.tradePrice,
        item.gst,
        productTotal,
        index === 0 ? subtotal : '', // Show subtotal only in first row
        index === 0 ? totalGst : '', // Show GST only in first row
        index === 0 ? grandTotal : '', // Show grand total only in first row
        'New'
      ];
      
      sheet.appendRow(rowData);
    });
    
    // Format the sheet
    const lastRow = sheet.getLastRow();
    const numRows = orderData.cartItems.length;
    
    // Format currency columns
    const currencyColumns = [9, 11, 12, 13, 14];
    currencyColumns.forEach(col => {
      const range = sheet.getRange(lastRow - numRows + 1, col, numRows, 1);
      range.setNumberFormat('₹#,##0.00');
    });
    
    // Format quantity column
    sheet.getRange(lastRow - numRows + 1, 8, numRows, 1).setNumberFormat('#,##0');
    
    // Add borders
    const orderRange = sheet.getRange(lastRow - numRows + 1, 1, numRows, 15);
    orderRange.setBorder(true, true, true, true, true, true);
    
    console.log('✅ Order processed successfully:', orderId);
    
    return createResponse({
      success: true,
      message: 'Order stored successfully',
      orderId: orderId,
      total: grandTotal,
      timestamp: now.toISOString()
    }, headers);
    
  } catch (error) {
    console.error('❌ Error processing order:', error);
    return createResponse({
      success: false,
      error: 'Failed to process order: ' + error.toString()
    }, headers);
  }
}

function createResponse(data, headers) {
  const output = ContentService.createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
  
  if (headers) {
    output.setHeaders(headers);
  }
  
  return output;
}

// Handle GET requests for testing
function doGet(e) {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Max-Age': '86400'
  };
  
  return createResponse({
    success: true,
    message: 'Bonum Medelae Order Management API is running',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  }, headers);
}

// Test function
function testDeployment() {
  const testData = {
    action: 'addOrder',
    data: {
      customerInfo: {
        name: "Test Customer",
        phone: "9999999999",
        address: "Test Address, Test City"
      },
      cartItems: [
        {
          id: "abf-100",
          name: "ABF 100 Tablet",
          tradePrice: 300.00,
          gst: "12%",
          quantity: 2
        },
        {
          id: "apenosa-spas",
          name: "Apenosa-Spas Tablet",
          tradePrice: 102.00,
          gst: "12%",
          quantity: 1
        }
      ]
    }
  };
  
  // Simulate a POST request
  const e = {
    postData: {
      contents: JSON.stringify(testData),
      type: "application/json"
    }
  };
  
  return doPost(e);
} 