import {
  render,
  fireEvent,
  screen,
  waitFor,
} from '@testing-library/react-native';
import ClassRoomList from '../../../../src/pages/ClassRoom/List';
// eslint-disable-next-line max-len
import { classroomService } from '../../../../src/services/Classes/ClassRoomService';
import Toast from 'react-native-toast-message';
import { ClassRoomModel } from '../../../../src/interfaces/Classes/Classes';

// Mock das salas de aula
const mockClassRooms: ClassRoomModel[] = [
  {
    _id: '1',
    title: 'Class 1',
    resume: 'Resume 1',
    detail: 'Detail 1',
    category: { name: 'Category 1' },
    user: { user: 'User 1' },
    updatedAt: '2024-01-01',
    image: 'image1.jpg',
  },
];

jest.mock('../../../../src/services/Classes/ClassRoomService', () => ({
  classroomService: {
    getClassesManagerial: jest.fn(),
    postClassRoom: jest.fn(),
    putClassRoom: jest.fn(),
    deleteClassRoom: jest.fn(),
  },
}));

jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(() => Promise.resolve(null)),
  setItem: jest.fn(() => Promise.resolve()),
  removeItem: jest.fn(() => Promise.resolve()),
}));

beforeEach(() => {
  (classroomService.getClassesManagerial as jest.Mock).mockReturnValue({
    subscribe: jest.fn().mockImplementation(({ next }) => next(mockClassRooms)),
  });

  (classroomService.postClassRoom as jest.Mock).mockResolvedValue({
    id: '2',
  });

  (classroomService.putClassRoom as jest.Mock).mockResolvedValue(
    mockClassRooms[0],
  );

  (classroomService.deleteClassRoom as jest.Mock).mockResolvedValue({});

  (classroomService.postClassRoom as jest.Mock).mockRejectedValueOnce(
    new Error('Failed to create classroom'),
  );
});

describe('ClassRoomList', () => {
  it('should render the list of classrooms', async () => {
    render(<ClassRoomList />);

    const titleElement = await screen.findByText('Title: Class 1');
    expect(titleElement).toBeTruthy();
  });
});
