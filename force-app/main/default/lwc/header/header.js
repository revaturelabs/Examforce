import { LightningElement } from 'lwc';

export default class Header extends LightningElement {

    menuOptions;
    menuItems;
    messageFromParent;


    handleNav(){
        console.log('testing');
        // classList references class list in css 
        this.menuOptions.classList.toggle('navSelected');
        this.menuOptions.classList.toggle('menuOptions');
        for(let elem of this.menuItems){
            elem.classList.toggle('navSelected');
            elem.classList.toggle('menuItem');
        }
        
    }
    // Lifecycle Hooks
    // Rendered
    renderedCallback(){
        this.menuOptions = this.template.querySelector('.menuOptions');
        this.menuItems = this.template.querySelectorAll('.menuItem');

    }

    handlePageChange(e){
        console.log(e.target.textContent);
        this.handleNav(); //Will close hamburger menu when you choose a different page
        // References onClick from header.html
        // Sending a custom event to our appContainer lwc (child to parent communication)
        // pass in event with 'e' then use dispatchEvent method
        // first param is name of new Custom Event, second optional param is data you want to pass 
        // Use the key word detail for the key (represents data)
        // the second value is the actual data, in this case e.target.textContent
        this.dispatchEvent(new CustomEvent('pagechange', {detail : e.target.textContent}));
    }

}