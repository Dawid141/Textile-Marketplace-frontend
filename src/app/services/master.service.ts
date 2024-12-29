import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import * as http from 'node:http';

@Injectable({
  providedIn: 'root'
})
export class MasterService {

  constructor(private http: HttpClient) { }


}
