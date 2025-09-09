import { el } from "redom";
import "./customForm.css";

const buttonAddForm = el("button.btnAddForm");
buttonAddForm.textContent = "Добавить форму";
const fieldMCF = document.getElementById("fieldCustomForm");

class CustomForm extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = `
      <style>
        .overflow {
          position: absolute;
          inset: 0;
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          -webkit-box-pack: center;
              -ms-flex-pack: center;
                  justify-content: center;
          -webkit-box-align: center;
              -ms-flex-align: center;
                  align-items: center;
          border-radius: 17px;
          background-color: rgba(147, 255, 134, 0.3);
          z-index: 9;
          -webkit-animation: add 0.8s cubic-bezier(0.45,0,0.55,1) forwards;
                  animation: add 0.8s cubic-bezier(0.45,0,0.55,1) forwards;
        }

        form {
          position: relative;          
          padding: 20px;
          width: 320px;
          border: 2px solid #ccc;
          border-radius: 10px;
          font-family: Arial, sans-serif;
          -webkit-box-sizing: border-box;
                  box-sizing: border-box;
          background-color: #fafafa;           
          -webkit-transform-style: preserve-3d;           
                  transform-style: preserve-3d;
          -webkit-perspective: 1000px;
                  perspective: 1000px;                
        }

        form.formFace {          
          -webkit-animation: formFace 1.8s cubic-bezier(0.45,0,0.55,1) forwards;          
                  animation: formFace 1.8s cubic-bezier(0.45,0,0.55,1) forwards;
        }
                
        h2 {
          margin: 0;
          margin-bottom: 14px; 
          max-width: 70%;        
          font-size: 24px;
          line-height: 1.3;
          color: black
        }

        h2.hair {
          -webkit-animation: hair 1.2s cubic-bezier(0.45,0,0.55,1) forwards;
                  animation: hair 1.2s cubic-bezier(0.45,0,0.55,1) forwards;
        }
          
        input { 
          position: relative;                     
          margin-bottom: 24px;
          padding: 8px; 
          width: 100%;
          border: 2px solid #ccc;
          border-radius: 5px;
          font-size: 14px;
          -webkit-box-sizing: border-box;
                  box-sizing: border-box;
          -webkit-transition: border-color 0.3s ease;
          -o-transition: border-color 0.3s ease;
          transition: border-color 0.3s ease;                                            
        }        

        .formLeftEyeHF   {            
          -webkit-animation: formLeftEye 1.8s cubic-bezier(0.45,0,0.55,1) forwards,
                      wink 1s cubic-bezier(0.45,0,0.55,1) 3s forwards;            
                  animation: formLeftEye 1.8s cubic-bezier(0.45,0,0.55,1) forwards,
                      wink 1s cubic-bezier(0.45,0,0.55,1) 3s forwards;   
        }           

        .formRightEyeHF {
          -webkit-animation: formRightEye 1.8s cubic-bezier(0.45,0,0.55,1) forwards;
                  animation: formRightEye 1.8s cubic-bezier(0.45,0,0.55,1) forwards;
        }

        .formLeftEyeAF   {                          
          -webkit-animation: formLeftEye 1.8s cubic-bezier(0.45,0,0.55,1) forwards,
                      angryLY 0.5s 1.8s cubic-bezier(0.45,0,0.55,1) forwards;                          
                  animation: formLeftEye 1.8s cubic-bezier(0.45,0,0.55,1) forwards,
                      angryLY 0.5s 1.8s cubic-bezier(0.45,0,0.55,1) forwards;   
        }           

        .formRightEyeAF {
          -webkit-animation: formRightEye 1.8s cubic-bezier(0.45,0,0.55,1) forwards,
                       angryRY 0.5s 1.8s cubic-bezier(0.45,0,0.55,1) forwards;
                  animation: formRightEye 1.8s cubic-bezier(0.45,0,0.55,1) forwards,
                       angryRY 0.5s 1.8s cubic-bezier(0.45,0,0.55,1) forwards;                      
        }

        .formLeftEye::-webkit-input-placeholder, .formRightEye::-webkit-input-placeholder, .formSmile::-webkit-input-placeholder, .formAngry::-webkit-input-placeholder {
            color: transparent;
        }

        .formLeftEye::-moz-placeholder, .formRightEye::-moz-placeholder, .formSmile::-moz-placeholder, .formAngry::-moz-placeholder {
            color: transparent;
        }

        .formLeftEye:-ms-input-placeholder, .formRightEye:-ms-input-placeholder, .formSmile:-ms-input-placeholder, .formAngry:-ms-input-placeholder {
            color: transparent;
        }

        .formLeftEye::-ms-input-placeholder, .formRightEye::-ms-input-placeholder, .formSmile::-ms-input-placeholder, .formAngry::-ms-input-placeholder {
            color: transparent;
        }

        .formLeftEye::placeholder,
        .formRightEye::placeholder,
        .formSmile::placeholder,
        .formAngry::placeholder {
            color: transparent;
        }

        .input-wrapper-rightY::after,
        .input-wrapper-leftY::after,
        .input-wrapper-rightY::before,
        .input-wrapper-leftY::before {
          content: '';
          position: absolute;            
          display: none;
          border-radius: 50%;
          z-index: 1;        
        }

        .input-wrapper-rightY::after {
          top: 105px;
          right: 92px;
        }

        .input-wrapper-rightY::before {
          top: 97px;
          right: 85px;
        }

        .input-wrapper-leftY::after {
          top: 105px;
          left: 92px;
        }

        .input-wrapper-leftY::before {
          top: 97px;
          left: 85px;
        }

        .input-wrapper-rightY::before,
        .input-wrapper-leftY::before {        
          width: 20px;
          height: 20px;
          border: 1px solid black;
          background-color: turquoise;                     
        }

        .input-wrapper-rightY::after,
        .input-wrapper-leftY::after {           
          width: 7px;
          height: 7px;
          background-color: black;                         
        }

        .pupil::after, 
        .pupil::before {  
          display: block;          
          -webkit-animation: pupil 1.8s cubic-bezier(0.45,0,0.55,1) forwards;          
                  animation: pupil 1.8s cubic-bezier(0.45,0,0.55,1) forwards;
        } 
          
        .pupilHF::after, 
        .pupilHF::before {
          display: block;          
          -webkit-animation: pupil 1.8s cubic-bezier(0.45,0,0.55,1) forwards,
                      winkpupil 1s cubic-bezier(0.45,0,0.55,1) 3s forwards;          
                  animation: pupil 1.8s cubic-bezier(0.45,0,0.55,1) forwards,
                      winkpupil 1s cubic-bezier(0.45,0,0.55,1) 3s forwards;
        }             

        .formSmile{
          -webkit-animation: formSmile 1.8s cubic-bezier(0.45,0,0.55,1) forwards;
                  animation: formSmile 1.8s cubic-bezier(0.45,0,0.55,1) forwards;
        }

        .formAngry {
          -webkit-animation: formAngry 1.8s cubic-bezier(0.45,0,0.55,1) forwards;
                  animation: formAngry 1.8s cubic-bezier(0.45,0,0.55,1) forwards;
        }        

        input:focus {
          border-color: #007BFF;
          outline: none;
        }          
          
        button {          
          padding: 10px;
          width: 100%;  
          outline: none;        
          border: none;
          border-radius: 5px;
          font-weight: bold;
          font-size: 16px;
          color: white;
          background-color: #007BFF;         
          cursor: pointer;
          -webkit-transition: background-color 0.3s cubic-bezier(0.45,0,0.55,1);
          -o-transition: background-color 0.3s cubic-bezier(0.45,0,0.55,1);
          transition: background-color 0.3s cubic-bezier(0.45,0,0.55,1);
          -webkit-clip-path: polygon(0 0, 100% 0, 100% 100%, 0% 100%);
                  clip-path: polygon(0 0, 100% 0, 100% 100%, 0% 100%); 
        }

        .formNose {
          -webkit-animation: formNose 1.8s cubic-bezier(0.45,0,0.55,1) forwards;
                  animation: formNose 1.8s cubic-bezier(0.45,0,0.55,1) forwards;
        }
                  
        button:focus {          
          background-color: #004494;                       
        }

        @media screen and (min-width: 1024px) {
          button:hover {
            background-color: #0056b3;           
          }
        }        

        .message {
          position: absolute;
          left: 60%;
          top: 285px; 
          display: -webkit-box; 
          display: -ms-flexbox; 
          display: flex;
          -webkit-box-pack: center;
              -ms-flex-pack: center;
                  justify-content: center;
          -webkit-box-align: center;
              -ms-flex-align: center;
                  align-items: center;
          -webkit-transform: translateX(-50%);
              -ms-transform: translateX(-50%);
                  transform: translateX(-50%);
          padding: 17px;
          width: 320px;
          min-height: 40px;
          border: 1px solid black;
          border-radius: 25% / 50%;
          text-align: center;
          font-size: 12px;
          line-height: 1.2;          
          color: #333;
          background-color: #fffbe7;          
          -webkit-box-shadow: 0 2px 8px rgba(0,0,0,0.08);
                  box-shadow: 0 2px 8px rgba(0,0,0,0.08);          
          opacity: 0;
          -webkit-transform: scaleX(0);
              -ms-transform: scaleX(0);
                  transform: scaleX(0);
          z-index: 10;                  
        }
          
        .addMess {
          -webkit-animation: addBubble 0.9s 3s cubic-bezier(0.45,0,0.55,1) forwards;
                  animation: addBubble 0.9s 3s cubic-bezier(0.45,0,0.55,1) forwards;  
        }
          
        .speaking::before,
        .speaking::after {
          content: '';
          position: absolute;         
          border: 1px solid black;
          border-radius: 50%;
          background-color: #fffbe7;
          opacity: 0;
          -webkit-transform: scaleX(0);
              -ms-transform: scaleX(0);
                  transform: scaleX(0);
          pointer-events: none;
          z-index: 8;
        }

        .speaking::before {
          bottom: 70px;  
          left: 50%;
          width: 16px;
          height: 16px;         
          -webkit-animation: addBubble 0.7s 2s cubic-bezier(0.45,0,0.55,1) forwards;
                  animation: addBubble 0.7s 2s cubic-bezier(0.45,0,0.55,1) forwards;          
        }

        .speaking::after {
          bottom: 30px;  
          left: 55%;
          width: 30px;
          height: 30px;                 
          -webkit-animation: addBubble 0.6s 2.5s cubic-bezier(0.45,0,0.55,1) forwards;       
                  animation: addBubble 0.6s 2.5s cubic-bezier(0.45,0,0.55,1) forwards;         
        }

        .deleteMess {
          -webkit-animation: delete 1.1s cubic-bezier(0.45,0,0.55,1) forwards;
                  animation: delete 1.1s cubic-bezier(0.45,0,0.55,1) forwards; 
        }
        .deleteOver {
          -webkit-animation: delete 1.1s 1s cubic-bezier(0.45,0,0.55,1) forwards;
                  animation: delete 1.1s 1s cubic-bezier(0.45,0,0.55,1) forwards;
        }        

        @-webkit-keyframes add {
          from {                
            -webkit-transform: scaleX(0);                
                    transform: scaleX(0);
          }
          to {
            -webkit-transform-origin: right center;
                    transform-origin: right center;
            -webkit-transform: scaleX(1);
                    transform: scaleX(1);
          }
        }        

        @keyframes add {
          from {                
            -webkit-transform: scaleX(0);                
                    transform: scaleX(0);
          }
          to {
            -webkit-transform-origin: right center;
                    transform-origin: right center;
            -webkit-transform: scaleX(1);
                    transform: scaleX(1);
          }
        }

            
        @-webkit-keyframes formFace {
          0% {
            -webkit-transform: scale(1);
                    transform: scale(1);                
          }
          50% {
            -webkit-transform: scale(1.1);
                    transform: scale(1.1);            
            border-radius: 50% / 50%;
          }
          100% {
            -webkit-transform: scale(1.2) translateZ(0);
                    transform: scale(1.2) translateZ(0);;            
            border-radius: 100% / 70%;
          }
        }

            
        @keyframes formFace {
          0% {
            -webkit-transform: scale(1);
                    transform: scale(1);                
          }
          50% {
            -webkit-transform: scale(1.1);
                    transform: scale(1.1);            
            border-radius: 50% / 50%;
          }
          100% {
            -webkit-transform: scale(1.2) translateZ(0);
                    transform: scale(1.2) translateZ(0);;            
            border-radius: 100% / 70%;
          }
        }

        @-webkit-keyframes hair {
          0% {
            opacity: 1;                
          }

          50% {
            opacity: 0.5;  
          }
          100% {                           
            opacity: 0;  
          }
        }

        @keyframes hair {
          0% {
            opacity: 1;                
          }

          50% {
            opacity: 0.5;  
          }
          100% {                           
            opacity: 0;  
          }
        }
          
        @-webkit-keyframes formLeftEye {
          0% {           
            -webkit-transform: scaleX(1);           
                    transform: scaleX(1);                
          }          
          30% {
            -webkit-transform: scaleX(0.75) scaleY(1.1);
                    transform: scaleX(0.75) scaleY(1.1);
            color: transparent;                 
          }
          60% {
            -webkit-transform: scaleX(0.5) scaleY(1.5) translateX(-150px);
                    transform: scaleX(0.5) scaleY(1.5) translateX(-150px);               
            border-radius: 40%;                    
          }
          100% {          
            -webkit-transform: scaleX(0.25) scaleY(1.5) translateX(-250px) translateY(-5px) translateZ(0px);          
                    transform: scaleX(0.25) scaleY(1.5) translateX(-250px) translateY(-5px) translateZ(0px);
            border-radius: 100%;
            border-color: black;
            color: transparent;           
            -webkit-text-fill-color: transparent;
            background-color: rgb(232, 240, 254);
          }
        }
          
        @keyframes formLeftEye {
          0% {           
            -webkit-transform: scaleX(1);           
                    transform: scaleX(1);                
          }          
          30% {
            -webkit-transform: scaleX(0.75) scaleY(1.1);
                    transform: scaleX(0.75) scaleY(1.1);
            color: transparent;                 
          }
          60% {
            -webkit-transform: scaleX(0.5) scaleY(1.5) translateX(-150px);
                    transform: scaleX(0.5) scaleY(1.5) translateX(-150px);               
            border-radius: 40%;                    
          }
          100% {          
            -webkit-transform: scaleX(0.25) scaleY(1.5) translateX(-250px) translateY(-5px) translateZ(0px);          
                    transform: scaleX(0.25) scaleY(1.5) translateX(-250px) translateY(-5px) translateZ(0px);
            border-radius: 100%;
            border-color: black;
            color: transparent;           
            -webkit-text-fill-color: transparent;
            background-color: rgb(232, 240, 254);
          }
        }

        @-webkit-keyframes formRightEye {
          0% {            
            -webkit-transform: scaleX(1);            
                    transform: scaleX(1);                
          }
          30% {
            -webkit-transform: scaleX(0.75) scaleY(1.1);
                    transform: scaleX(0.75) scaleY(1.1);
            color: transparent;                 
          }
          60% {
            -webkit-transform: scaleX(0.5) scaleY(1.5)  translateX(150px) translateY(-25px);
                    transform: scaleX(0.5) scaleY(1.5)  translateX(150px) translateY(-25px);               
            border-radius: 40%;                    
          }
          100% {              
            -webkit-transform: scaleX(0.25) scaleY(1.5) translateX(250px) translateY(-45px) translateZ(0px);              
                    transform: scaleX(0.25) scaleY(1.5) translateX(250px) translateY(-45px) translateZ(0px);
            border-radius: 100%;
            border-color: black;
            color: transparent;         
            -webkit-text-fill-color: transparent;
            background-color: rgb(232, 240, 254);
          }
        }

        @keyframes formRightEye {
          0% {            
            -webkit-transform: scaleX(1);            
                    transform: scaleX(1);                
          }
          30% {
            -webkit-transform: scaleX(0.75) scaleY(1.1);
                    transform: scaleX(0.75) scaleY(1.1);
            color: transparent;                 
          }
          60% {
            -webkit-transform: scaleX(0.5) scaleY(1.5)  translateX(150px) translateY(-25px);
                    transform: scaleX(0.5) scaleY(1.5)  translateX(150px) translateY(-25px);               
            border-radius: 40%;                    
          }
          100% {              
            -webkit-transform: scaleX(0.25) scaleY(1.5) translateX(250px) translateY(-45px) translateZ(0px);              
                    transform: scaleX(0.25) scaleY(1.5) translateX(250px) translateY(-45px) translateZ(0px);
            border-radius: 100%;
            border-color: black;
            color: transparent;         
            -webkit-text-fill-color: transparent;
            background-color: rgb(232, 240, 254);
          }
        }

        @-webkit-keyframes pupil {
          0% {
            opacity: 0;
            -webkit-transform: scale(0);
                    transform: scale(0);                
          }
          50% {
            opacity: 0.5;
            -webkit-transform: scale(0.5);
                    transform: scale(0.5);     
          }
          100% {                           
            opacity: 1;
            -webkit-transform: scale(1);
                    transform: scale(1);   
          }
        }

        @keyframes pupil {
          0% {
            opacity: 0;
            -webkit-transform: scale(0);
                    transform: scale(0);                
          }
          50% {
            opacity: 0.5;
            -webkit-transform: scale(0.5);
                    transform: scale(0.5);     
          }
          100% {                           
            opacity: 1;
            -webkit-transform: scale(1);
                    transform: scale(1);   
          }
        }

        @-webkit-keyframes wink {          

          50% {  
            -webkit-transform: scaleX(0.3) scaleY(0.1) translateZ(6px) translateX(-250px) translateY(-15px);  
                    transform: scaleX(0.3) scaleY(0.1) translateZ(6px) translateX(-250px) translateY(-15px);
            background-color: white; 
            color: transparent;               
            -webkit-text-fill-color: transparent;
          }
        }

        @keyframes wink {          

          50% {  
            -webkit-transform: scaleX(0.3) scaleY(0.1) translateZ(6px) translateX(-250px) translateY(-15px);  
                    transform: scaleX(0.3) scaleY(0.1) translateZ(6px) translateX(-250px) translateY(-15px);
            background-color: white; 
            color: transparent;               
            -webkit-text-fill-color: transparent;
          }
        }

        @-webkit-keyframes winkpupil {
          50% {  
            -webkit-transform: scaleX(0) scaleY(0);  
                    transform: scaleX(0) scaleY(0);                                
          }
        }

        @keyframes winkpupil {
          50% {  
            -webkit-transform: scaleX(0) scaleY(0);  
                    transform: scaleX(0) scaleY(0);                                
          }
        }

        @-webkit-keyframes angryLY {          
          100% {              
            border-radius: 0% 100% / 0% 60%;            
          }
        }

        @keyframes angryLY {          
          100% {              
            border-radius: 0% 100% / 0% 60%;            
          }
        }

        @-webkit-keyframes angryRY {          
          100% {             
            border-radius: 100% 0% / 60% 0%;            
          }
        }

        @keyframes angryRY {          
          100% {             
            border-radius: 100% 0% / 60% 0%;            
          }
        }

        @-webkit-keyframes formNose {              
          100% {
            -webkit-clip-path: polygon(50% 0%, 60% 40%, 70% 120%, 33% 120%, 41% 40%);
                    clip-path: polygon(50% 0%, 60% 40%, 70% 120%, 33% 120%, 41% 40%);
            -webkit-transform: translateX(0) translateY(-127px);
                    transform: translateX(0) translateY(-127px);
            color: transparent;
            border-radius: 100%; 
          }
        }

        @keyframes formNose {              
          100% {
            -webkit-clip-path: polygon(50% 0%, 60% 40%, 70% 120%, 33% 120%, 41% 40%);
                    clip-path: polygon(50% 0%, 60% 40%, 70% 120%, 33% 120%, 41% 40%);
            -webkit-transform: translateX(0) translateY(-127px);
                    transform: translateX(0) translateY(-127px);
            color: transparent;
            border-radius: 100%; 
          }
        }

        @-webkit-keyframes formSmile{   
          0% {
            -webkit-transform: scaleY(1);
                    transform: scaleY(1);
            border-radius: 0 0 0 0 / 0 0 10% 10%;                 
          } 
        
          50% {
            border-radius: 0 0 30% 30% / 0 0 50% 50%; 
            -webkit-transform: translateY(10px) scaleY(1.5); 
                    transform: translateY(10px) scaleY(1.5); 
            border-color: #66bb6f;
          }

          100% {
            border-radius: 0 0 50% 50% / 0 0 100% 100%; 
            -webkit-transform: translateY(20px) scaleY(2); 
                    transform: translateY(20px) scaleY(2); 
            border-color: #4caf50;
            color: transparent;
            background-color: transparent;
            -webkit-text-fill-color: transparent;
          }
        }

        @keyframes formSmile{   
          0% {
            -webkit-transform: scaleY(1);
                    transform: scaleY(1);
            border-radius: 0 0 0 0 / 0 0 10% 10%;                 
          } 
        
          50% {
            border-radius: 0 0 30% 30% / 0 0 50% 50%; 
            -webkit-transform: translateY(10px) scaleY(1.5); 
                    transform: translateY(10px) scaleY(1.5); 
            border-color: #66bb6f;
          }

          100% {
            border-radius: 0 0 50% 50% / 0 0 100% 100%; 
            -webkit-transform: translateY(20px) scaleY(2); 
                    transform: translateY(20px) scaleY(2); 
            border-color: #4caf50;
            color: transparent;
            background-color: transparent;
            -webkit-text-fill-color: transparent;
          }
        }

        @-webkit-keyframes formAngry { 
          100% {
            border-radius: 50% 50% 10% 10% / 100% 100% 20% 20%;  
            border-color: #c33;
            color: transparent;
            background-color: transparent;
            -webkit-text-fill-color: transparent;
          }             
        }

        @keyframes formAngry { 
          100% {
            border-radius: 50% 50% 10% 10% / 100% 100% 20% 20%;  
            border-color: #c33;
            color: transparent;
            background-color: transparent;
            -webkit-text-fill-color: transparent;
          }             
        }       

        @-webkit-keyframes addBubble {
          0% {
            opacity: 0.3;
            -webkit-transform: translateX(-50%) scale(0.01) translateY(-190px) translateZ(0);
                    transform: translateX(-50%) scale(0.01) translateY(-190px) translateZ(0);
          }          
          100% {
            opacity: 1;
            -webkit-transform: translateX(-50%) scale(1.01) translateY(0) translateZ(190px);
                    transform: translateX(-50%) scale(1.01) translateY(0) translateZ(190px);
          }
        }       

        @keyframes addBubble {
          0% {
            opacity: 0.3;
            -webkit-transform: translateX(-50%) scale(0.01) translateY(-190px) translateZ(0);
                    transform: translateX(-50%) scale(0.01) translateY(-190px) translateZ(0);
          }          
          100% {
            opacity: 1;
            -webkit-transform: translateX(-50%) scale(1.01) translateY(0) translateZ(190px);
                    transform: translateX(-50%) scale(1.01) translateY(0) translateZ(190px);
          }
        }
          
         @-webkit-keyframes delete {
          0% {
            opacity: 1;
            -webkit-transform: scale(1) translateZ(300px);
                    transform: scale(1) translateZ(300px);                          
          }
          50% {
            opacity: 0.5;
            -webkit-transform: scale(0.5) translateZ(150px);
                    transform: scale(0.5) translateZ(150px);     
          }
          100% {                           
           opacity: 0;
          -webkit-transform: scale(0) translateZ(-150px);
                  transform: scale(0) translateZ(-150px);      
          }
        }
          
         @keyframes delete {
          0% {
            opacity: 1;
            -webkit-transform: scale(1) translateZ(300px);
                    transform: scale(1) translateZ(300px);                          
          }
          50% {
            opacity: 0.5;
            -webkit-transform: scale(0.5) translateZ(150px);
                    transform: scale(0.5) translateZ(150px);     
          }
          100% {                           
           opacity: 0;
          -webkit-transform: scale(0) translateZ(-150px);
                  transform: scale(0) translateZ(-150px);      
          }
        }

        @media (max-width: 992px) {
          .message {           
            width: 150px;
            font-size: 10px;            
          }
        }

        @media (max-width: 576px) {
          form {
            display: -webkit-box;       
            -webkit-box-orient: vertical;
            -webkit-box-direction: normal;
            -webkit-box-align: center;

            display: -ms-flexbox;       
            -ms-flex-direction: column;
            -ms-flex-align: center;
            
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 10px;
            width: 220px;
            text-align: center;
          }

          .message {            
            top: 240px;            
          }

          h2 {            
            font-size: 16px;
            line-height: 1.1;
          }
        
          input {                               
            margin-bottom: 22px;
          }

          .input-wrapper-rightY::before,
          .input-wrapper-leftY::before {        
            width: 18px;
            height: 18px;                              
          }

          .input-wrapper-rightY::after {
            top: 74px;
            right: 51px;
          }

          .input-wrapper-rightY::before {
            top: 67px;
            right: 44px;
          }

          .input-wrapper-leftY::after {
            top: 74px;
            left: 51px;
          }

          .input-wrapper-leftY::before {
            top: 67px;
            left: 44px;
          }

          @-webkit-keyframes formLeftEye {
          0% {           
            -webkit-transform: scaleX(1);           
                    transform: scaleX(1);                
          }          
          30% {
            -webkit-transform: scaleX(0.75) scaleY(1.1);
                    transform: scaleX(0.75) scaleY(1.1);
            color: transparent;                 
          }
          60% {
            -webkit-transform: scaleX(0.5) scaleY(1.5) translateX(-90px);
                    transform: scaleX(0.5) scaleY(1.5) translateX(-90px);               
            border-radius: 40%;                    
          }
          100% {          
            -webkit-transform: scaleX(0.25) scaleY(1.5) translateX(-230px) translateY(-15px) translateZ(0px);          
                    transform: scaleX(0.25) scaleY(1.5) translateX(-230px) translateY(-15px) translateZ(0px);
            border-radius: 100%;
            border-color: black;
            color: transparent;           
            -webkit-text-fill-color: transparent;
            background-color: rgb(232, 240, 254);
          }
        }
          
        @keyframes formLeftEye {
          0% {           
            -webkit-transform: scaleX(1);           
                    transform: scaleX(1);                
          }          
          30% {
            -webkit-transform: scaleX(0.75) scaleY(1.1);
                    transform: scaleX(0.75) scaleY(1.1);
            color: transparent;                 
          }
          60% {
            -webkit-transform: scaleX(0.5) scaleY(1.5) translateX(-90px);
                    transform: scaleX(0.5) scaleY(1.5) translateX(-90px);               
            border-radius: 40%;                    
          }
          100% {          
            -webkit-transform: scaleX(0.25) scaleY(1.5) translateX(-220px) translateY(0) translateZ(0px);          
                    transform: scaleX(0.25) scaleY(1.5) translateX(-220px) translateY(0) translateZ(0px);
            border-radius: 100%;
            border-color: black;
            color: transparent;           
            -webkit-text-fill-color: transparent;
            background-color: rgb(232, 240, 254);
          }
        }

        @-webkit-keyframes formRightEye {
          0% {            
            -webkit-transform: scaleX(1);            
                    transform: scaleX(1);                
          }
          30% {
            -webkit-transform: scaleX(0.75) scaleY(1.1);
                    transform: scaleX(0.75) scaleY(1.1);
            color: transparent;                 
          }
          60% {
            -webkit-transform: scaleX(0.5) scaleY(1.5)  translateX(90px) translateY(-15px);
                    transform: scaleX(0.5) scaleY(1.5)  translateX(90px) translateY(-15px);                
            border-radius: 40%;                    
          }
          100% {              
            -webkit-transform: scaleX(0.25) scaleY(1.5) translateX(220px) translateY(-40px) translateZ(0px);              
                    transform: scaleX(0.25) scaleY(1.5) translateX(220px) translateY(-40px) translateZ(0px);
            border-radius: 100%;
            border-color: black;
            color: transparent;         
            -webkit-text-fill-color: transparent;
            background-color: rgb(232, 240, 254);
          }
        }

        @keyframes formRightEye {
          0% {            
            -webkit-transform: scaleX(1);            
                    transform: scaleX(1);                
          }
          30% {
            -webkit-transform: scaleX(0.75) scaleY(1.1);
                    transform: scaleX(0.75) scaleY(1.1);
            color: transparent;                 
          }
          60% {
            -webkit-transform: scaleX(0.5) scaleY(1.5)  translateX(90px) translateY(-15px);
                    transform: scaleX(0.5) scaleY(1.5)  translateX(90px) translateY(-15px);               
            border-radius: 40%;                    
          }
          100% {              
            -webkit-transform: scaleX(0.25) scaleY(1.5) translateX(220px) translateY(-40px) translateZ(0px);              
                    transform: scaleX(0.25) scaleY(1.5) translateX(220px) translateY(-40px) translateZ(0px);
            border-radius: 100%;
            border-color: black;
            color: transparent;         
            -webkit-text-fill-color: transparent;
            background-color: rgb(232, 240, 254);
          }
        }
        }
      </style>

      <div class="overflow">
      <form novalidate aria-label="Пользовательская форма регистрации">
        <h2><slot></slot></h2>
        
        <label class="wrap input-wrapper-leftY">
          <input type="text" name="name" required minlength="2" placeholder="Имя:  >2 символов" aria-label="Имя" autocomplete="given-name"/>
        </label>

        <label class="wrap input-wrapper-rightY">
          <input type="email" name="email" required placeholder="Почта:  @ и точка обязательны" aria-label="Почта" autocomplete="email"/>
        </label>
        
        <label id="mouseSpeak" class="input-wrapper-mouse">
          <input type="password" name="password" required minlength="6" placeholder="Пароль:  >5 символов" aria-label="Пароль" autocomplete="new-password"/>
        </label>
        
        <button type="submit">Отправить</button>

        <div id="message" class="message" role="alert"></div>
      </form>
      </div>
    `;

    this.overflow = this.shadowRoot.querySelector(".overflow");
    this.form = this.shadowRoot.querySelector("form");
    this.inputs = Array.from(this.shadowRoot.querySelectorAll("input"));
    this.messageDiv = this.shadowRoot.getElementById("message");
    this.hasErrors = null;
    this.nameInput = this.form.querySelector('input[name="name"]');
    this.emailInput = this.form.querySelector('input[name="email"]');
    this.passwordInput = this.form.querySelector('input[name="password"]');
  }

  connectedCallback() {
    this.form.addEventListener("submit", this.handleSubmit.bind(this));
  }

  formData() {
    // Отправка формы
    return;
  }

  validateForm() {
    let errors = [];

    if (
      !this.nameInput.value.trim() ||
      this.nameInput.value.trim().length < 2
    ) {
      errors.push("Имя должно содержать минимум 2 символа.");
    }
    if (
      !this.emailInput.value.trim() ||
      this.emailInput.validity.typeMismatch
    ) {
      errors.push("Введите корректный email.");
    }
    if (!this.passwordInput.value || this.passwordInput.value.length < 6) {
      errors.push("Пароль должен содержать минимум 6 символов.");
    }

    if (errors.length) {
      errors.push("Тапни на нос и заполни форму внимательно!");
    }

    return errors;
  }

  animateHappyFace() {
    setTimeout(() => {
      this.form.classList.add("formFace");
      this.form.getElementsByTagName("h2")[0].classList.add("hair");
      this.nameInput.classList.add("formLeftEyeHF");
      this.emailInput.classList.add("formRightEyeHF");
      this.form.getElementsByTagName("button")[0].classList.add("formNose");
      this.passwordInput.classList.add("formSmile");
      this.nameInput.closest("label").classList.add("pupilHF");
      this.emailInput.closest("label").classList.add("pupil");
    }, 20);
  }

  animateAngryFace() {
    setTimeout(() => {
      this.form.classList.add("formFace");
      this.form.getElementsByTagName("h2")[0].classList.add("hair");
      this.nameInput.classList.add("formLeftEyeAF");
      this.emailInput.classList.add("formRightEyeAF");
      this.form.getElementsByTagName("button")[0].classList.add("formNose");
      this.passwordInput.classList.add("formAngry");
      this.nameInput.closest("label").classList.add("pupil");
      this.emailInput.closest("label").classList.add("pupil");
    }, 20);
  }

  animateResetForm() {
    this.form.classList.remove("formFace");
    this.form.getElementsByTagName("h2")[0].classList.remove("hair");
    this.nameInput.classList.remove("formLeftEyeAF");
    this.emailInput.classList.remove("formRightEyeAF");
    this.form.getElementsByTagName("button")[0].classList.remove("formNose");
    this.passwordInput.classList.remove("formAngry");
    this.nameInput.closest("label").classList.remove("pupil");
    this.emailInput.closest("label").classList.remove("pupil");
    this.messageDiv.classList.remove("addMess");
    this.form.querySelector("#mouseSpeak").classList.remove("speaking");
  }

  animateSpeechBubbles() {
    this.messageDiv.classList.add("addMess");
    this.form.querySelector("#mouseSpeak").classList.add("speaking");
  }

  handleSubmit(event) {
    event.preventDefault();

    const errors = this.validateForm();

    if (errors.length && this.hasErrors === null) {
      this.messageDiv.innerHTML = errors.join("<br>");
      this.messageDiv.classList.add("message");
    } else if (!errors.length && this.hasErrors === null) {
      this.messageDiv.textContent =
        "Данные успешно отправлены!\nТапни на нос, чтобы выйти!";
      this.messageDiv.classList.add("message");
    }

    if (errors.length && this.hasErrors === null) {
      this.animateAngryFace();
      this.animateSpeechBubbles();
      this.hasErrors = true;
    } else if (errors.length && this.hasErrors === true) {
      this.hasErrors = null;
      this.animateResetForm();
    } else if (!errors.length && this.hasErrors === null) {
      this.animateHappyFace();
      this.animateSpeechBubbles();
      this.formData();
      this.hasErrors = false;
    } else if (!errors.length && this.hasErrors === false) {
      this.delFormAddButton();
    }
  }

  delFormAddButton() {
    this.messageDiv.classList.add("deleteMess");
    this.overflow.classList.add("deleteOver");

    setTimeout(() => {
      document.getElementsByTagName("my-custom-form")[0].remove();

      buttonAddForm.classList.remove("del-anim");
      buttonAddForm.classList.add("add-anim");
      fieldMCF.append(buttonAddForm);
    }, 2200);
  }
}

customElements.define("my-custom-form", CustomForm);

buttonAddForm.addEventListener("click", function () {
  this.classList.remove("add-anim");

  setTimeout(() => {
    this.classList.add("del-anim");
  }, 200);

  setTimeout(
    function () {
      const myForm = new CustomForm();
      myForm.textContent = "Это заголовок формы";
      fieldMCF.innerHTML = "";
      fieldMCF.append(myForm);

      this.remove();
    }.bind(this),
    800
  );
});

fieldMCF.append(buttonAddForm);
