import { Observable, from, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import api from '../api';
import { ClassRoomModel } from '../../interfaces/Classes/Classes';
import { tokenService } from '../Auth/TokenService';

export const classroomService = {
  getClasses: (): Observable<ClassRoomModel[]> => {
    return from(api.get('/classes')).pipe(
      map((response) => response.data),
      catchError((error) => {
        console.error('Failed to load classes:', error);
        return throwError(
          () => new Error('Failed to load classes. Please try again later.'),
        );
      }),
    );
  },

  getClassesManagerial: async (): Promise<Observable<ClassRoomModel[]>> => {
    const token = await tokenService.get();

    return from(
      api.get('/classes/managerial', {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }),
    ).pipe(
      map((response) => response.data),
      catchError((error) => {
        console.error('Failed to load classes:', error.response || error);
        return throwError(
          () =>
            new Error(
              error.response?.data?.message ||
                'Failed to load classes. Please try again later.',
            ),
        );
      }),
    );
  },

  postClassRoom: async (classRoom: ClassRoomModel) => {
    const token = await tokenService.get();

    return from(
      api.post('/classes', classRoom, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }),
    ).pipe(
      map((response) => response.data),
      catchError((error) => {
        console.error('Failed to create classroom:', error.response || error);
        return throwError(
          () =>
            new Error(
              error.response?.data?.message ||
                'Failed to create classroom. Please try again later.',
            ),
        );
      }),
    );
  },

  putClassRoom: async (
    classRoom: ClassRoomModel,
  ): Promise<Observable<ClassRoomModel>> => {
    const token = await tokenService.get();

    return from(
      api.put(`/classes/${classRoom._id}`, classRoom, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }),
    ).pipe(
      map((response) => {
        const updatedCLassRoom = response.data.id || response.data;
        return updatedCLassRoom;
      }),
      catchError((error) => {
        console.error('Failed to update classroom:', error.response || error);
        return throwError(
          () =>
            new Error(
              error.response?.data?.message ||
                'Failed to update classroom. Please try again later.',
            ),
        );
      }),
    );
  },

  deleteClassRoom: async (classRoomId: string): Promise<Observable<void>> => {
    const token = await tokenService.get();

    return from(
      api.delete(`/classes/${classRoomId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }),
    ).pipe(
      map(() => {
        return;
      }),
      catchError((error) => {
        console.error('Failed to delete classroom:', error);
        return throwError(
          () =>
            new Error('Failed to delete classroom. Please try again later.'),
        );
      }),
    );
  },
};
