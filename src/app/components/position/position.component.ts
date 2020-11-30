import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';
import {ElementRef,Renderer2,ViewChild, QueryList, AfterViewInit, HostListener} from '@angular/core';



@Component({
  selector: 'app-position',
  templateUrl: './position.component.html',
  styleUrls: ['./position.component.css']
})
export class PositionComponent implements OnInit, AfterViewInit{
//initialisation des variables liées aux dimensions de l'aspirateur , a ça vitesse de déplacement et son orientation
 vitX:number = 1;
 vitY:number = 1;
 hauteur:number = 10;
 largeur:number = 10;
 hGrille:number = 500;
 lGrille : number = 500;
 degres:number = 0;
 nord:string = "N";
 ouest:string = "W";
 est:string = "E";
 sud:string = "S";
 posX: number = 5;
 posY: number = 5;
 direction:any;
 intervalId:any;
 rotate:boolean = false;

 @ViewChild('aspi')
  aspi!: ElementRef<any>; 
 @ViewChild('affiche')
  affiche!: ElementRef<any>;
 @ViewChild('grille')
  grille!: ElementRef<any>;
  
  //gestion des évènements liés au clavier
  @HostListener('document:keydown', ['$event']) keyEvent(event: KeyboardEvent) {
    console.log(event);
    const code = event.keyCode;
    console.log(code);
    switch(code){
      case 68: //(touche D)
          console.log("droite");
          this.degres +=90;
          if(!this.rotate){
              this.rotate = true;
              this.ngAfterViewInit();
          }else{
            
              this.ngAfterViewInit();
          }
        break; 
      case 71: // touche G
          console.log("gauche")
          this.degres -=90;
          if(!this.rotate){
              this.rotate = true;
              this.ngAfterViewInit();
          }else{
              this.ngAfterViewInit();
          }
          
        break;
      case 65: // touche A
        console.log("movvve");
        this.ngAfterViewInit();
       break; 
    
    }

  }

 constructor(private renderer: Renderer2) {

    
  }
  // manipulation des éléments du DOM
  ngAfterViewInit(): void{

    if(this.degres === 0){

      this.aspi.nativeElement.style.webkitTransform = 'rotate(' + this.degres + 'deg)';
    }
    if/*(this.degres += 90)*/(this.degres === 90 || this.degres === 180 || this.degres === 270 || this.degres === 360 || this.degres === 450 || this.degres === 540 || this.degres === 630 || this.degres === 720 || this.degres === 810){

      this.aspi.nativeElement.style.webkitTransform = 'rotate(' + this.degres + 'deg)';
    }

    if/*(this.degres -= 90)*/(this.degres === -90 || this.degres === -180 || this.degres === -270 || this.degres === -360 || this.degres === -450 || this.degres === -540 || this.degres === -630 || this.degres === -720 || this.degres === -810){

      this.aspi.nativeElement.style.webkitTransform = 'rotate(' + this.degres + 'deg)';
    }
    
    const aspiT = parseFloat(this.aspi.nativeElement.style.top);
    const aspiB = aspiT + this.hauteur;
    const aspiL = parseFloat(this.aspi.nativeElement.style.left);
    const aspiR = aspiL + this.largeur;

    
    if(this.degres === 0 || this.degres === 360 || this.degres === -360 || this.degres === 720 || this.degres === -720){
      if(aspiB + this.vitY <= 6){
        this.vitY = 0;
      }else{
        this.vitY = 1;
      }
      this.aspi.nativeElement.style.top = aspiT - this.vitY + "px";
      this.posY += this.vitY;
      this.direction = this.nord;
      } 
    if(this.degres === 90 || this.degres === 450 || this.degres === 810 || this.degres === -270 || this.degres === -630){
      if(aspiL + this.vitX >= this.lGrille - 42){
        this.vitX = 0;
      }else{
        this.vitX = 1;
      }
      this.aspi.nativeElement.style.left = aspiL + this.vitX + "px";
      this.posX += this.vitX;
      this.direction = this.ouest;
      } 

    if( this.degres === -90 || this.degres === -450 || this.degres === -810 || this.degres === 270 || this.degres === 630 ){
      if(aspiR + this.vitX <= 10){
        this.vitX = 0 ;
      }else{
        this.vitX = 1 ;
      }
      this.aspi.nativeElement.style.left = aspiL - this.vitX + "px";
      this.posX -= this.vitX;
      this.direction = this.est;
      } 
    if(this.degres === 180 || this.degres === 540 || this.degres === 900 || this.degres === -180 || this.degres === -540){
      if(aspiT + this.vitY >= this.hGrille - 45 ){
        this.vitY = 0;
      }else{
        this.vitY = 1;
      }
      this.aspi.nativeElement.style.top = aspiT + this.vitY + "px";
      this.posY -= this.vitY;
      this.direction = this.sud;
      } 
       
  
    // gestion de l'affichage
    const message = "position :" + " " + "x=" + " " + this.posX + " " + "y=" + " " + this.posY + " " + "orienté= " + " " + this.direction;
    this.affiche.nativeElement.innerHTML = message;
  
  }
      
  
   
 
  ngOnInit(): void {
    
  }


}
