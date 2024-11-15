import { Observable, from, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import api from '../api';
import { CategoryModel } from '../../interfaces/Categories/Categories';
import { tokenService } from '../Auth/TokenService';

export const categoryService = {
  getCategories: (): Observable<CategoryModel[]> => {
    return from(api.get('/categories')).pipe(
      map((response) => response.data),
      catchError((error) => {
        console.error('Failed to load categories:', error);
        return throwError(
          () => 'Failed to load categories. Please try again later.'
        );
      })
    );
  },

  putCategory: (category: CategoryModel): Observable<CategoryModel> => {
    const token = tokenService.get();

    if (!token) {
      return throwError(() => new Error('No token found'));
    }

    console.log(category);

    return from(
      api.put(`/categories/${category._id}`, category, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
    ).pipe(
      map((response) => response.data),
      catchError((error) => {
        console.error('Failed to update category:', error);
        return throwError(
          () => new Error('Failed to update category. Please try again later.')
        );
      })
    );
  },

  postCategory: (
    category: Omit<CategoryModel, '_id'>
  ): Observable<CategoryModel> => {
    const token = tokenService.get();

    if (!token) {
      return throwError(() => new Error('No token found'));
    }

    return from(
      api.post('/categories', category, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })
    ).pipe(
      map((response) => response.data),
      catchError((error) => {
        const errorMessage =
          error.response?.data?.message ||
          'Failed to create category. Please try again later.';
        console.error('Error details:', error.response || error);
        return throwError(() => new Error(errorMessage));
      })
    );
  },

  deleteCategory: (categoryId: string): Observable<void> => {
    const token = tokenService.get();

    if (!token) {
      return throwError(() => new Error('No token found'));
    }

    return from(
      api.delete(`/categories/${categoryId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })
    ).pipe(
      map(() => {
        console.log('Category deleted successfully');
      }),
      catchError((error) => {
        console.error('Failed to delete category:', error);
        return throwError(
          () => new Error('Failed to delete category. Please try again later.')
        );
      })
    );
  },
};
