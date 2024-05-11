import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Survey } from '../models/survey';
import { environment } from "../environments/environments";

@Injectable({
  providedIn: 'root'
})
export class SurveyService {

  private apiUrl = environment.backend+"api/survey"

  constructor(private http: HttpClient){ }

  postSurvey(survey: Survey){
    return this.http.post<boolean>(this.apiUrl + '/', survey)
  }

  putSurvey(id: string,survey: Survey){
    return this.http.put<Survey>(this.apiUrl + '/'+id, survey)
  }

  getSurvey(id: string){
    return this.http.get<Survey>(this.apiUrl + `/unique/${id}`)
  }

  getSurveys(){
    return this.http.get<Survey[]>(this.apiUrl + '/');
  }

}
