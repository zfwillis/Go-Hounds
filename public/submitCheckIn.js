function submitCheckIn(){
  const submitContinue = window.confirm(
    "Thank you for submitting! Your attendance is being verified.\n\nWould you like to submit another game check-in?"
  );
  if (submitContinue) {
    window.location.assign("http://localhost:8080/public/schedule.html");
  } else {
    window.location.assign("http://localhost:8080/public/index.html");
  }
  return false;
}

// Source of window.location.assign: https://www.w3schools.com/jsref/met_loc_assign.asp
// Running on local host 8080

