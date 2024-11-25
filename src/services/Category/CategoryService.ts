import { Observable, from, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import api from '../api';
import { CategoryModel } from '../../interfaces/Category/Category';
import { tokenService } from '../Auth/TokenService';

export const categoryService = {
  getCategories: (): Observable<CategoryModel[]> => {
    return from(api.get('/categories')).pipe(
      map((response) => response.data),
      catchError((error) => {
        return throwError(
          () =>
            new Error(
              error.response?.data?.message ||
                'Failed to load categories. Please try again later.',
            ),
        );
      }),
    );
  },

  postCategory: async (category: CategoryModel) => {
    const token = await tokenService.get();

    return from(
      api.post('/categories', category, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }),
    ).pipe(
      map((response) => response.data),
      catchError((error) => {
        return throwError(
          () =>
            new Error(
              error.response?.data?.message ||
                'Failed to create category. Please try again later.',
            ),
        );
      }),
    );
  },

  putCategory: async (
    category: CategoryModel,
  ): Promise<Observable<CategoryModel>> => {
    const token = await tokenService.get();

    return from(
      api.put(`/categories/${category._id}`, category, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }),
    ).pipe(
      map((response) => {
        const updatedCategory = response.data.id || response.data;
        return updatedCategory;
      }),
      catchError((error) => {
        return throwError(
          () =>
            new Error(
              error.response?.data?.message ||
                'Failed to update category. Please try again later.',
            ),
        );
      }),
    );
  },

  deleteCategory: async (categoryId: string): Promise<Observable<void>> => {
    const token = await tokenService.get();

    return from(
      api.delete(`/categories/${categoryId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }),
    ).pipe(
      map(() => {
        return;
      }),
      catchError(() => {
        return throwError(
          () => new Error('Failed to delete category. Please try again later.'),
        );
      }),
    );
  },
};
