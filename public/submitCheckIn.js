function submitCheckIn(){
  const submitContinue = window.confirm(
    "Thank you for submitting! Your attendance is being verified.\n\nWould you like to submit another game check-in?"
  );
  if (submitContinue) {
    window.location.assign("http://localhost:4000/schedule.html");
  } else {
    window.location.assign("http://localhost:4000/index.html");
  }
  return false;
}

// Source of window.location.assign: https://www.w3schools.com/jsref/met_loc_assign.asp
// Running on local host 4000

