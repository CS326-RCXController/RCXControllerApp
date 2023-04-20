/*
CS326 Final Project
Author: Owen Pruim and David Reidsma
Main file for our Angular web app to control a Lego RCX from a Raspberry Pi.
*/

import { Component, OnDestroy, OnInit } from '@angular/core';
import { IMqttMessage, MqttModule, IMqttServiceOptions, MqttService } from 'ngx-mqtt';
import { Subscription } from 'rxjs';

export interface MotorState {
  left: number;
  right: number;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'RCX Controller';
  currentSpeed = 2;
  
  private subscription: Subscription;
  private topic = 'cs326rcxcontroller';

  constructor(private mqttService: MqttService) {
    this.subscription = mqttService
      .observe(this.topic)
      .subscribe((message: IMqttMessage) => {
        console.log(message.payload.toString());
      });
  }

  remoteButtonPressed(button: string) {
    const halfSpeed = Math.floor(this.currentSpeed / 2);

    let right: number = 0;
    let left: number = 0;

    switch(button) {
      case 'fwdLeft':
        right = this.currentSpeed;
        left = halfSpeed;
        break;
      case 'fwd':
        left = this.currentSpeed;
        right = this.currentSpeed;
        break;
      case 'fwdRight':
        left = this.currentSpeed;
        right = halfSpeed;
        break;
      
      case 'left':
        left = -this.currentSpeed;
        right = this.currentSpeed;
        break;
      case 'stop':
        break;
      case 'right':
        left = this.currentSpeed;
        right = -this.currentSpeed;
        break;
      
      case 'bwdLeft':
        right = -this.currentSpeed;
        left = -halfSpeed;
        break;
      case 'bwd':
        left = -this.currentSpeed;
        right = -this.currentSpeed;
        break;
      case 'bwdRight':
        left = -this.currentSpeed;
        right = -halfSpeed;
        break;
      default:
        break;
    }

    const motorState: MotorState = {
      left,
      right
    };

    this.mqttService.unsafePublish(this.topic, JSON.stringify(motorState));
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
      this.subscription.unsubscribe();
  }
}
