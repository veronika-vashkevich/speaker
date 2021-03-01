import axios from 'axios'
import { API_URL, JPA_API_URL } from '../Constants'

class LessonDataService {

    retrieveAllLessons(username, courseId) {
        console.log('executed service for course Id ', {courseId});
        return axios.get(`${API_URL}/courses/${courseId}/lessons`,
            {
                headers: {
                    isAuthRequired: 'true'
                }
            }
        );
    }

    retrieveLesson(name, id) {
        //console.log('executed service')
        return axios.get(`${API_URL}/Lessons/${id}`);
    }

    startLesson(name) {
        const params = {
            userName:name
        };
        return axios.get(`${API_URL}/Lessons/start`, { params });
    }

    deleteLesson(name, Lesson) {
        //console.log('executed service')
        return axios.delete(`${API_URL}/Lessons/${Lesson}`);
    }

    updateLesson(name, id, todo) {
        //console.log('executed service')
        return axios.put(`${JPA_API_URL}/users/${name}/todos/${id}`, todo);
    }

    createLesson(courseId, orderIndex, title) {
        //console.log('executed service')
        return axios.post(`${API_URL}/lessons/create`, {
            courseId,
            orderIndex,
            title
        });
    }

//     try {
//     yield put(CourseActions.loading(true));
//     const response = yield call(axios.post, `/courses/${courseID}/lessons`, {
//         title,
//         content,
//         url,
//         type: lessonType,
//     });
//     if (response.status === 200) {
//     yield put(CourseActions.createLessonSuccess());
// }
// yield put(CourseActions.loading(false));
// yield call(history.push, AppRoutes.COURSE.DETAILS(courseID));
// } catch (error) {
//     yield put(CourseActions.loading(false));
//     yield put(CourseActions.createLessonFailure());
// }
}

export default new LessonDataService
