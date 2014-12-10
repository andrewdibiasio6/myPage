/* 
   Some code is from the following author, though many changes have been made.
 
   File:  /~heines/91.461/91.461-2014-15f/461-lecs/code/DynamicTabs.html
   Jesse M. Heines, UMass Lowell Computer Science, heines@cs.uml.edu
   Copyright (c) 2014 by Jesse M. Heines.  All rights reserved.  May be freely 
   copied or excerpted for educational purposes with credit to the author.
   updated by JMH on November 14, 2014 at 9:10 PM

   Andrew DiBiasio andrew_dibiasio@student.uml.edu
   I am a Computer Science Major at the University of Massachusetts Lowell. 
   I created this file as part of an assignment for my course 91.461 GUI Programming I. 
   This is my multTabsScript.js file that creates a dynamic multiplication table from values 
   submitted in my form by the user. I also run a validation on my table using the 
   jQuery Validation plugin. The tables are each created in a new tab using the 
   jQuery UI Tab widget. Buttons allow the user to remove a specific table, or all 
   tables at once.  Created on Nov 28, 2014
*/

var i;  //loop indices
var j;
var k;

// the div containing the complete tabs structure
// var tabsdiv = $(this).parent().parent() ; 
var tabsdiv;

// the list of tabs
var tabslist;

// set the number of the next tab to add
var nextTabNo;


//function validateForm(a)  /* Returns true if number is positive */ {   was used before jQuery Validation
//  if (isNaN(a) || a < 0 || a == "") {
//    alert("Please insert a positive number");  // alert the user that a problem has occured
//    return false;
//  }
//  return true;
//}

// generateTable is used to generate the multiplication tables
var generateTable = function () {

  //console.log("In gen table");
  //console.log($("#tbody" + String.fromCharCode(97 + nextTabNo)));

  $("#tbody" + String.fromCharCode(97 + nextTabNo)).append("<tr>"); // Here, I start my first table row
  $("#tbody" + String.fromCharCode(97 + nextTabNo)).append($("<td></td>").text(" "));

  for (i = mStartValue; i <= mEndValue; i++) {   // This loop creates my and completes the data
    $("#tbody" + String.fromCharCode(97 + nextTabNo)).append($("<td></td>").text(i));  // for the rest of the table's first row
  }
  $("#tbody" + String.fromCharCode(97 + nextTabNo)).append("</tr>");  // first table row is finished

  //  All other table rows are pouplated with data with the following code_____________________________________________________

  for (k = mcStartValue; k <= mcEndValue; k++) // This loop moves the the rest of my tbody rows, they all have the same format
  {
    $("#tbody" + String.fromCharCode(97 + nextTabNo)).append($("<tr>"));
    $("#tbody" + String.fromCharCode(97 + nextTabNo)).append($("<td></td>").text(k));      // Here, I start all other rows after the first

    for (j = mStartValue; j <= mEndValue; j++) {   // This loop creates my and completes the data
      $("#tbody" + String.fromCharCode(97 + nextTabNo)).append($("<td></td>").text(k * j)); // for the rest of the table rows  
    }

    $("#tbody" + String.fromCharCode(97 + nextTabNo)).append("</tr>");  // a table row is finished
  }
}

// this function is executed create table is clicked. It calls generateTable()
var AddTabButtonClickHandler = function () {
  console.log("IN add handler");
  // console.log( "parent().parent() id = " + $(this).parent().parent().attr("id") ) ;
  // console.log( $(this).parent().parent().find("ul li").length ) ;

  // the number of tabs - made obsolete by nextTabNo
  // var ntabs = tabslist.find("li").length ;
  // console.log( "ntabs = " + ntabs ) ;

  // create a new tab
  tabslist.append('<li><a href="#' + String.fromCharCode(97 + nextTabNo) + '">' +
      'Table ' + (nextTabNo + 1) + '</a></li>');

  // add content to the new tab
  tabsdiv.append('<div id="' + String.fromCharCode(97 + nextTabNo) + '">' +
      '<p>Multiply Start: ' + mStartValue + '</p><p>' + ' Multiply End: ' + mEndValue + '</p><p>'
       + ' Multiplicand Start: ' + mcStartValue + '</p><p>' + ' Multiplicand End: ' + mcEndValue + '</p>' +
      '<table id="table' + String.fromCharCode(97 + nextTabNo) + '"> <tbody id="tbody' +
      String.fromCharCode(97 + nextTabNo) + '"></tbody></table></div>');

  // add Remove Table buttons to the new tab
  // $("#" + String.fromCharCode( 97+ntabs ) ).append( 
  $("#" + String.fromCharCode(97 + nextTabNo)).append(
      '<button class="remove-tab">Remove Table</button>');

  // refresh the tab structure to make the newly added components appear
  $("#myTabs").tabs("refresh");

  // add click handler to all buttons with class add-tab
  // note that this statement must be executed AFTER the tabs structure is refreshed
  // $("#" + String.fromCharCode( 97+ntabs ) + " .add-tab").click( AddTabButtonClickHandler ) ;
  // $("#" + String.fromCharCode( 97+ntabs ) + " .remove-tab").click( RemoveTabButtonClickHandler ) ;
  $("#" + String.fromCharCode(97 + nextTabNo) + " .remove-tab").click(RemoveTabButtonClickHandler);
  
  // create table when tabs are created
  generateTable();

  // increment number of next tab to add
  nextTabNo++;
};

// this function is executed when an remove-table button is clicked
var RemoveTabButtonClickHandler = function () {

  console.log("ID");
  console.log($(this).parent().attr("id"));

  // remove tab content
  $(this).parent().remove();

  // remove tab itself        
  var id = $(this).parent().attr("id");
  // console.log( "need to remove tab with href = #" + id ) ;
  var tabToRemove = tabslist.find("li a[href='#" + id + "']").parent();
  // console.log( "tabToRemove = " + tabToRemove.html() ) ;
  tabToRemove.remove();

  // refresh the tab structure to make the newly added components appear
  $("#myTabs").tabs("refresh");
};

//This function is executed when the remove-all button is clicked
var removeAllClickHandler = function () {
  //console.log( $(this).parent().attr("id") ) ;

  // remove tab content
  //$("#tabUl").child.remove();

  // remove tab itself        
  //var id = $(this).parent().attr("id");
  // console.log( "need to remove tab with href = #" + id ) ;

  // removes content of in all tabs
  var contentToRemove = tabsdiv.find("div");
  contentToRemove.remove();

  // removes all tabs
  var tabToRemove = tabslist.find("li");
  // console.log( "tabToRemove = " + tabToRemove.html() ) ;
  tabToRemove.remove();

  // refresh the tab structure to make the newly added components appear
  $("#myTabs").tabs("refresh");
};


$(document).ready(function () /* waits till document is ready */ {

  $("#myTabs").tabs();
  // console.log( "parent id = " + $("#a").parent().attr( "id" ) ) ;

  tabsdiv = $("#myTabs");

  // the list of tabs
  tabslist = tabsdiv.find("ul");

  // set the number of the next tab to add
  nextTabNo = tabslist.find("li").length;

  $("#remove-all").click(removeAllClickHandler);

  // without jquery validate

  //if (validateForm(this.multiplyStart.value) == false) {   // validateForm is called on all four values validate mulitplyStart                                            
  //  this.multiplyStart.style.background = "#FC1501";       // if validation fails, foucs is given to the part of the form where the error occured.
  //  this.multiplyStart.getfocus();
  //  return false;
  //}

  //if (validateForm(this.multiplyEnd.value) == false) { // validate mulitplyEnd
  //  this.multiplyEnd.style.background = "#FC1501";
  //  this.multiplyEnd.getfocus();
  //  return false;
  //}

  //if (validateForm(this.mcStartValue) == false) {  // validate mulitplicandStart
  //  this.multiplicandStart.style.background = "#FC1501";
  //  this.multiplicandStart.getfocus();
  //  return false;
  //}

  //if (validateForm(this.multiplicandEnd.value) == false) {  // validate mulitplicandEnd
  //  this.multiplicandEnd.style.background = "#FC1501";
  //  this.multiplicandEnd.getfocus();
  //  return false;
  //}

  // tblValidator dynamically validates my multiplication table.
  // It makes all fields required and makes sure they are numbers.  

  var tblValidator = {

    highlightError: function (strVarToTest) {
      $('#' + strVarToTest).css({ "border": "2px solid red" }); // Errors have their borders changed to red.
      $('#' + strVarToTest).focus();
    },

    unhighlightError: function (strVarToTest) {
      $('#' + strVarToTest).css({ "border": "" });  // borders are returned to normal once they are no longer errors.
    },
  }

  // multiplicationForm validates if all entries are present and all are digits.
  $('#multiplicationForm').validate({
    rules: {
      multiplyStart: {
        required: true,
        digits: true
      },
      multiplyEnd: {
        required: true,
        digits: true
      },
      multiplicandStart: {
        required: true,
        digits: true
      },
      multiplicandEnd: {
        required: true,
        digits: true
      }
    }, // End of rules

    messages: {
      multiplyStart: {
        required: function () {
          tblValidator.highlightError("multiplyStart");
          return " A Multiply Start value is required.&nbsp";
        },
        digits: function () {
          tblValidator.highlightError("multiplyStart");
          return "<br>Please enter only digits for the Multiply Start Value.<br>&nbsp";
        }
      },
      multiplyEnd: {
        required: function () {
          tblValidator.highlightError("multiplyEnd");
          return " A Multiply End value is required.&nbsp";
        },
        digits: function () {
          tblValidator.highlightError("multiplyEnd");
          return "<br>Please enter only digits for the Multiply End Value.<br>&nbsp";
        }
      },
      multiplicandStart: {
        required: function () {
          tblValidator.highlightError("multiplicandStart");
          return " A Multiplicand Start value is required.&nbsp";
        },
        digits: function () {
          tblValidator.highlightError("multiplicandStart");
          return "<br>Please enter only digits for the Multiplicand Start Value.<br>&nbsp";
        }
      },
      multiplicandEnd: {
        required: function () {
          tblValidator.highlightError("multiplicandEnd");
          return " A  Multiplicand End value is required.&nbsp";
        },
        digits: function () {
          tblValidator.highlightError("multiplicandEnd");
          return "<br> Please enter only digits for the Multiplicand End Value.<br>&nbsp";
        }
      }
    },// end of messages

    success: function (errorClass, element) {
      $(element.style.border = ""); // reset the border to its default
    } // end of success
  }); // end of validate

  $("#multiplicationForm").submit(function () { // trap the submit event *before* the action is executed. This is where my tables and tabs will be generated.

    //console.log(nextTabNo);
    //console.log("Valid Form:");
    //console.log($("#multiplicationForm").valid())  // logging if the form is valid to the console

    if ($("#multiplicationForm").valid())  // if the form is valid, make tab and generate table.
    {
      // parsing all strings to ints
      if (parseInt(this.multiplyStart.value) < parseInt(this.multiplyEnd.value)) {
        mStartValue = parseInt(this.multiplyStart.value);
        mEndValue = parseInt(this.multiplyEnd.value);
      }
      if (parseInt(this.multiplyStart.value) > parseInt(this.multiplyEnd.value)) {
        mEndValue = parseInt(this.multiplyStart.value);
        mStartValue = parseInt(this.multiplyEnd.value);
      }

      if (parseInt(this.multiplicandStart.value) < parseInt(this.multiplicandEnd.value)) {
        mcStartValue = parseInt(this.multiplicandStart.value);
        mcEndValue = parseInt(this.multiplicandEnd.value);
      }
      if (parseInt(this.multiplicandStart.value) > parseInt(this.multiplicandEnd.value)) {
        mcEndValue = parseInt(this.multiplicandStart.value);
        mcStartValue = parseInt(this.multiplicandEnd.value);
      }

      // creates tabs and table.
      AddTabButtonClickHandler(mStartValue, mEndValue, mcStartValue, mcEndValue);

    } // End of if statment
  }); // End of submit
});  // end ready


