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

    updateLesson(lessonId, title) {
        return axios.put(`${API_URL}/lessons/update/${lessonId}`, {title});
    }

    createLesson(courseId, orderIndex, title) {
        //console.log('executed service')
        return axios.post(`${API_URL}/lessons/create`, {
            courseId,
            orderIndex,
            title
        });
    }

    deleteLesson(lessonId) {
        return axios.post(`${API_URL}/lessons/delete/${lessonId}`, {
            lessonId
        });
    }
}

export default new LessonDataService
