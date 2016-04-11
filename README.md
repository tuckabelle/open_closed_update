# open_closed_update
jQuery plugin that manipulates the user's input of business hours and holiday hours to display a line of text noting the business's current status.

This is a simple little plugin that will tell your website visitors if your business is currently open, will be open later in the day, has already closed for the day, or is closed all day. You can enter information for weekly hours and up to 10 holidays, including customizable messages. The text output can easily be styled in CSS to fit with your website’s design. 

Here’s how to make the magic happen:

- Download the JS file (*openCloseUpdate.js* or *openCloseUpdate.min.js*)

- Link the openCloseUpdate javascript to your html page.
```html
<script src="../file_location/openClosedUpdate.js"></script>
```

- Include the .openCloseUpdate class to the div, header, span, or paragraph where you want the update status to appear. 
```html
<h2 class=“openCloseUpdate:></h2>
```

- In the <header> of your html file, insert the following script:
(Feel free to customize the hours and messages in this area to personalize the code.)
```javascript
<script>
$(function () {
$(document).ready(function () {
$('.OpenClosed').openClosedUpdate({
//Customize Weekly Hours: [Opening time, Closing time] OR ["Closed"]
//NOTE: The code can accomidate several time variations, but please make sure you indicate "am" or "pm".
Sunday: ["Closed"],
Monday: ["3pm", "5:00pm"],
Tuesday: ["9am", "5:00pm"],
Wednesday: ["9am", "5:00pm"],
Thursday: ["9am", "5:00pm"],
Friday: ["9am", "5:00pm"],
Saturday: ["10:30am", "5:00pm"],

//Customize Statuses
openStatus: "We are open until ",
openSoonStatus: "Today we will be opening around ",
closedTodayStatus: "Our business is closed today.",
closedStatus: "We are currently closed for the day. Visit us again later!",

//Customize Holiday Hours: 
//[Month, Day], [Opening time, Closing time] OR ["Closed"], 
//You can customize up to 10 holidays
//Customize Optional Holiday Message
//Example:
//holiday1: [[4, 22], ["Closed"]],
//holiday1Message: “Happy Earth Day! We’re outside hugging trees.",
holiday1: [[12, 25], ["Closed"]],
holiday1Message: "We hope you have a very, very merry Christmas",
holiday2: "",
holiday2Message: "",
holiday3: "",
holiday3Message: "",
holiday4: "",
holiday4Message: "",
holiday5: "",
holiday5Message: "",
holiday6: "",
holiday6Message: "",
holiday7: "",
holiday7Message: "",
holiday8: "",
holiday8Message: "",
holiday9: "",
holiday9Message: "",
holiday10: "",
holiday10Message: "",
});
});
});
</script>
```
