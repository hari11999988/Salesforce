import { LightningElement } from 'lwc';
export default class NoticeBoard extends LightningElement {
    notices = [
        { id: 1, message: 'Welcome to the Notice Board!' },
        { id: 2, message: 'Important announcement: Event next week.' },
        { id: 3, message: 'Reminder: Submit your assignments by Friday.' },
        // Add more notices as needed
    ];

    connectedCallback() {
        // Start the notice board animation when the component is connected to the DOM
        this.startNoticeBoardAnimation();
    }

    startNoticeBoardAnimation() {
        setInterval(() => {
            // Rotate the notices in a circular manner
            const rotatedNotices = this.notices.slice(1).concat(this.notices[0]);
            this.notices = rotatedNotices;
        }, 3000); // Rotate notices every 3 seconds (adjust as needed)
    }

}