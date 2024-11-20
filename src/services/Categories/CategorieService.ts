import { Observable, from, throwError } from 'rxjs';
import { timeout, retry, catchError, map } from 'rxjs/operators';

import api from '../api';
import { CategoryModel } from '../../interfaces/Categories/Categories';
import { tokenService } from '../Auth/TokenService';

export const categoryService = {
  getCategories: (): Observable<CategoryModel[]> => {
    return from(api.get('/categories')).pipe(
      timeout(20000),
      retry(2),
      map((response) => response.data),
      catchError((error) => {
        console.error('Failed to load categories:', error.response || error);
        return throwError(
          () =>
            new Error(
              error.response?.data?.message ||
                'Failed to load categories. Please try again later.'
            )
        );
      })
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
      })
    ).pipe(
      timeout(10000),
      retry(2),
      map((response) => response.data),
      catchError((error) => {
        console.error('Failed to create category:', error.response || error);
        return throwError(
          () =>
            new Error(
              error.response?.data?.message ||
                'Failed to create category. Please try again later.'
            )
        );
      })
    );
  },

  putCategory: async (
    category: CategoryModel
  ): Promise<Observable<CategoryModel>> => {
    const token = await tokenService.get();

    return from(
      api.put(`/categories/${category._id}`, category, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })
    ).pipe(
      timeout(20000),
      retry(2),
      map((response) => {
        const updatedCategory = response.data.id || response.data;
        return updatedCategory;
      }),
      catchError((error) => {
        console.error('Failed to update category:', error.response || error);
        return throwError(
          () =>
            new Error(
              error.response?.data?.message ||
                'Failed to update category. Please try again later.'
            )
        );
      })
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
      })
    ).pipe(
      map(() => {
        console.log('Category deleted successfully');
        return;
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
