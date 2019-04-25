"use strict";

/*
   New Perspectives on HTML5, CSS3, and JavaScript 6th Edition
   Tutorial 13
   Case Problem 2

   Author: Melinda Chirila
   Date:   4/19/2019
   
   Filename: dl_expenses.js
   
   Function List
   =============
   
   validateSummary()
      Validates the data entry in the summary field.
   
   calcClass(sumClass)
      Sums up all of the data values for elements of the sumClass class.
      
   calcExp()
      Calculates the travel expenses from all categories and dates.
      
   formatNumber(val, decimals)
      Formats the value, "val" to the number of decimals indicated 
      by "decimals", adding thousands separators.
      
   formatUSCurrency(val)
      Formats the value, "val", as U.S. currency.
      
*/
//empty function
window.addEventListener("load", function () {
      var changingCells = document.querySelectorAll("table#travelExp input.sum");

      //this will add the event listeners to the array
      for (var i = 0; i < changingCells.length; i++) {
            changingCells[i].addEventListener("change", calcExp);
      }
      document.getElementById("submitButton").addEventListener("click", validateSummary);
})


//displays the custom validation message
function validateSummary() {
      var summary = document.getElementById("summary")
      if (summary.validity.valueMissing) {
            summary.setCustomValidity("You must include a summary of the trip in your report");
      } else {
            summary.setCustomValidity("");
      }
}

//to geet the totals of the item values in the boxes
function calcClass(sumClass) {
      var sumFields = document.getElementsByClassName(sumClass);
      var sumTotal = 0;
      //add it to the sumTotal
      for (var i = 0; i < sumFields.length; i++) {
            var itemValue = parseFloat(sumFields[i].value);
            if (isNaN(itemValue) !== true) {
                  sumTotal += itemValue;
            }
      }
      // returns sumTotal
      return sumTotal;
}

function calcExp() {
      var expTable = document.querySelectorAll("#travelExp tbody tr");
      for (var i = 0; i < expTable.length; i++) {
            document.getElementById(`subtotal${i}`).value = formatNumber(calcClass(`date${i}`), 2)
      }
      //makes it the correct number of decimals and currency
      document.getElementById("transTotal").value = formatNumber(calcClass("trans"), 2);
      document.getElementById("lodgeTotal").value = formatNumber(calcClass("lodge"), 2);
      document.getElementById("mealTotal").value = formatNumber(calcClass("meal"), 2);
      document.getElementById("otherTotal").value = formatNumber(calcClass("other"), 2);
      document.getElementById("expTotal").value = formatUSCurrency(calcClass("sum"))
}




function formatNumber(val, decimals) {
      return val.toLocaleString(undefined, {
            minimumFractionDigits: decimals,
            maximumFractionDigits: decimals
      });
}

function formatUSCurrency(val) {
      return val.toLocaleString('en-US', {
            style: "currency",
            currency: "USD"
      });
}