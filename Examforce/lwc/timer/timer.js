/*
timer.js
Developer: Samir Kalouf & Matt McCain
Date Created: 06/23/22
Last Modified: 06/23/22
Description: Displays timer when renedered by exam cmp.
*/
  


import { LightningElement, api, track } from 'lwc';

export default class ExamTimer extends LightningElement {

    @api value; // In minutes
    //will need to get exam time from parent
    countDownDate;
    timer = '0:0:0:0';
    remainingTime = 0;
    

    start() {
      this.showStartBtn = false;
      var parentThis = this;
      console.log(this.value);
      this.remainingTime = (this.value * 60) * 1000;
      // Run timer code in every 100 milliseconds
      this.countDownDate = setInterval(function() {

          // Time calculations for hours, minutes, seconds and milliseconds
          var hours = Math.floor((parentThis.remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          var minutes = Math.floor((parentThis.remainingTime % (1000 * 60 * 60)) / (1000 * 60));
          var seconds = Math.floor((parentThis.remainingTime % (1000 * 60)) / 1000);
          
          // Output the result in the timeVal variable
          parentThis.timer = hours + ":" + minutes + ":" + seconds ;
          
          parentThis.remainingTime -= 100;
      }, 100);
  }
    // connectedCallback(){
    //     // this.ExamTimer();

    // }
    renderedCallback(){
      this.start();
    }
}    countDownDate;
timer = '0:0:0:0';
remainingTime = 0;