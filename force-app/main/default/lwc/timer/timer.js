/*
timer.js
Developer: Samir Kalouf & Matt McCain
Date Created: 06/23/22
Last Modified: 06/23/22
Description: Displays timer when renedered by exam cmp.
*/
  


import { LightningElement, api } from 'lwc';

export default class ExamTimer extends LightningElement {

    @api duration; // In minutes
    countDownDate;
    
    ExamTimer() {
        this.countDownDate = Date().getTime() + this.duration * 60000;
    }

    start() {

    
    var x = setInterval(function() {

        // Get today's date and time
        var now = new Date().getTime();
      
        // Find the distance between now and the count down date
        var distance = countDownDate - now;
      
        // Time calculations for days, hours, minutes and seconds
        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);
      
        // Display the result in the element with class="timer"
        this.template.querySelector('timer').innerText = days + "d " + hours + "h "
         + minutes + "m " + seconds + "s ";
      
        // If the count down is finished, display time out to user and send event.
        if (distance < 0) {
          clearInterval(x);
          this.template.querySelector('timer').innerText = "TIME OUT";
          this.dispatchEvent(new CustomEvent('time out'));  
        }
      }, 1000);

    }
}



