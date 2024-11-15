import { Observable, from, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import api from '../api';
import { ClassRoomModel } from '../../interfaces/Classes/Classes';

export const classroomService = {
  getClasses: (): Observable<ClassRoomModel[]> => {
    return from(api.get('/classes')).pipe(
      map((response) => response.data),
      catchError((error) => {
        console.error('Failed to load classes:', error);
        return throwError(
          () => 'Failed to load classes. Please try again later.'
        );
      })
    );
  },

  getClassesManagerial: (): Observable<ClassRoomModel[]> => {
    const token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoicHJvZmVzc29yIiwiaWF0IjoxNzMxNjA0NTY5LCJleHAiOjE3MzE2MDgxNjl9.T3-aQ6u7DR-e4LkbMusnIvAT5j2_6_Tei5sgMOfuJ6M';

    if (!token) {
      return throwError(() => new Error('No token found'));
    }

    return from(
      api.get('/classes/managerial', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
    ).pipe(
      map((response) => response.data),
      catchError((error) => {
        console.error('Failed to load classes:', error);
        return throwError(
          () => 'Failed to load classes. Please try again later.'
        );
      })
    );
  },
};
