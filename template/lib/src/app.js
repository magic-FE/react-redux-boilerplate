"use strict";

function handleResponse(response) {
  if (response.success) {
    var value = response.value; // Works!
  } else {
    var error = response.message; // Works!
  }
}


function handleResponse1(response) {
  if (response.success) {
    var value = response.value; // Works!
  } else {
    var error = response.error; // Works!
  }
}