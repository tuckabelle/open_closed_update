;
(function ($, window, document, undefined) {

	"use strict";

	$.fn.openClosedUpdate = function (options) {
		var closing;
		// Default options
		var settings = $.extend({
			//Day of the week: [Opening time, Closing time]
			//NOTE: The code can accomidate several time variations, but please make sure you indicate "am" or "pm".
			Sunday: ["Closed"],
			Monday: ["10am", "5:00pm"],
			Tuesday: ["9am", "5:00pm"],
			Wednesday: ["9am", "5:00pm"],
			Thursday: ["9am", "5:00pm"],
			Friday: ["9am", "5:00pm"],
			Saturday: ["10:30am", "5:00pm"],

			//Statuses
			openStatus: "We are open until ",
			openSoonStatus: "Today we will being opening at ",
			closedTodayStatus: "We are closed today",
			closedStatus: "We are currently closed for the day. Visit us again later!",


			//Customize Holiday Hours: 
			//[[Month, Day], [Opening time, Closing time] OR ["Closed"]], 
			//You can customize up to 10 holidays
			//Customize Optional Holiday Message
			//Example:
			//holiday1: [[12, 25], ["Closed"]],
			//holiday1Message: "We hope you have a very, very merry Christmas",

			holiday1: "",
			holiday1Message: "",
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
		}, options);

		//CALCULATE NORMAL WORK HOURS
		var today = new Date();
		var todayWeekDay = today.getDay();
		var todayDay = today.getDate();
		var todayMonth = today.getMonth() + 1;
		var todayYear = today.getFullYear();
		var todayHour = today.getHours();
		var todayMinutes = today.getMinutes();

		var weekday = new Array;
		weekday[0] = settings.Sunday;
		weekday[1] = settings.Monday;
		weekday[2] = settings.Tuesday;
		weekday[3] = settings.Wednesday;
		weekday[4] = settings.Thursday;
		weekday[5] = settings.Friday;
		weekday[6] = settings.Saturday;

		var storeHours = [];
		var storeHours = calculateHours(weekday[todayWeekDay]);


		//CALCULATE HOLIDAY HOURS
		var todayCal = new Date(todayYear, todayMonth, todayDay);

		var holidayArray = [settings.holiday1, settings.holiday2, settings.holiday3, settings.holiday4, settings.holiday5, settings.holiday6, settings.holiday7, settings.holiday8, settings.holiday9, settings.holiday10];

		var holidayMesArray = [settings.holiday1Message, settings.holiday2Message, settings.holiday3Message, settings.holiday4Message, settings.holiday5Message, settings.holiday6Message, settings.holiday7Message, settings.holiday8Message, settings.holiday9Message, settings.holiday10Message];

		for (var i = 0; i < holidayArray.length; i++) {
			var index = i;
			if (holidayArray[i] == undefined || holidayArray[i] == "") {
				holidayArray.splice(index);
			}
		}
		var holidayArrayCal = [];
		var holidayMessage = "";

		for (var c = 0; c < holidayArray.length; c++) {
			var cHoliday = holidayArray[c];
			var holidayCal = new Date(todayYear, cHoliday[0][0], cHoliday[0][1])

			if (todayCal.getTime() > holidayCal.getTime()) {
				var holidayCal = new Date(todayYear + 1, cHoliday[0][0], cHoliday[0][1]);
			}
			if (todayCal.getTime() == holidayCal.getTime()) {
				var storeHours = [];
				storeHours = calculateHours(cHoliday[1]);

				if (holidayMesArray[c] != "" || holidayMesArray[c] != undefined) {
					holidayMessage = holidayMesArray[c];

				} else {
					holidayMessage = "";
				};
			}
		}



		function calculateHours(times) {
			var str = String(times);
			//alert(typeof str);
			var hoursArray = [];
			var hoursArray = str.split(",");
			var open = hoursArray[0];
			var close = hoursArray[1];
			if (open.toLowerCase() != "closed") {
				//alert(open);
				(ConvertTimeformat("24", open, storeHours));
				(ConvertTimeformat("24", close, storeHours));
				storeHours.push(open);
				storeHours.push(close);
			} else {
				storeHours.push("Closed");

			}
			return (storeHours);

			function ConvertTimeformat(format, time, array) {
				var hours = Number(time.match(/^(\d+)/)[1]);
				if (time.indexOf(":") > -1) {
					var minutes = Number(time.match(/:(\d+)/)[1]);
				} else {
					var minutes = Number(0);;
				}

				var AMPM = time.match(/(a|p|A|P)(m|M)?/)[0];
				if (AMPM.toUpperCase() == "PM" && hours < 12) hours = hours + 12;
				if (AMPM.toUpperCase() == "AM" && hours == 12) hours = hours - 12;
				var sHours = hours.toString();
				var sMinutes = minutes.toString();
				if (hours < 10) sHours = "0" + sHours;
				if (minutes < 10) sMinutes = "0" + sMinutes;
				array.push(sHours.concat(sMinutes));

			};
		}

		if (storeHours[0] != "Closed") {
			var open = Number(storeHours[0]);
			var close = Number(storeHours[1]);
			var now = Number(todayHour + "" + todayMinutes);
			if (now > open && now < close) {
				//The business is open right now
				var status = settings.openStatus + storeHours[3];
			} else if (now < open) {
				//The business will be open later today
				var status = settings.openSoonStatus + storeHours[2];
			} else {
				//The business already closed for the day
				var status = settings.closedStatus;
			}
		} else {
			//The business was closed all day
			var status = settings.closedTodayStatus;

		}
		if (holidayMessage == "") {

			var fullStatus = status;
		} else {
			var fullStatus = status + "<br>" + holidayMessage;

		}
		return this.html(fullStatus);
	};
})(jQuery, window, document);