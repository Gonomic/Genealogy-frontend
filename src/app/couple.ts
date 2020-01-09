import {Person} from './person';

export class Couple {
    ParrentA: Person;
    UpperParrentAConnector: number;
    LowerParrentAConnector: number;
    ParrentB: Person;
    UpperParrentBConnector: number;
    LowerParrentBConnector: number;
    UpperCoupleConnecor: number;
    LowerCoupleConnetor: number;
    ParentsArePartners: boolean;
    CoupleSVGShape: string;

    constructor(){
        this.CoupleSVGShape = `<svg width="190" height="129" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" overflow="hidden">
                               <defs><clipPath id="clip0"><path d="M668 271 858 271 858 400 668 400Z" fill-rule="evenodd" clip-rule="evenodd"/></clipPath>
                               <linearGradient x1="669.5" y1="336" x2="856.5" y2="336" gradientUnits="userSpaceOnUse" spreadMethod="reflect" id="fill1"><stop offset="0" stop-color="#00B0F0"/>
                               <stop offset="0.29" stop-color="#00B0F0"/><stop offset="0.51" stop-color="#FCB8E5"/><stop offset="1" stop-color="#FCB8E5"/></linearGradient></defs><g clip-path="url(#clip0)" transform="translate(-668 -271)">
                               <path d="M725.575 286.75 718.816 273.75 695.785 273.75 669.5 326.25 695.785 379.5 718.566 379.25 725.575 392.75 732.835 379.25 750.358 379.25 762.875 398.5 775.392 379.5 793.416 379.25 800.675 392.75 807.935 
                               379.25 830.215 379.25 856.5 326.5 830.215 273.5 808.185 273.5 800.425 286.75 793.666 273.75 732.584 273.75 725.575 286.75Z" stroke="#2F528F" stroke-miterlimit="8" fill="url(#fill1)" fill-rule="evenodd"/></g></svg>`;
    }
}
