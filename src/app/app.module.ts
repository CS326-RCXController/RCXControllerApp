import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { environment as env } from '../environments/environment.prod'
import {
  MqttModule,
  IMqttServiceOptions,
} from 'ngx-mqtt';

export const MQTT_SERVICE_OPTIONS: IMqttServiceOptions = {
  hostname: env.mqtt.hostname,
  port: env.mqtt.port,
  path: env.mqtt.path,
  protocol: env.mqtt.protocol === 'wss' ? 'wss' : 'ws',
  username: env.mqtt.username,
  password: env.mqtt.password
};

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MqttModule.forRoot(MQTT_SERVICE_OPTIONS)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
