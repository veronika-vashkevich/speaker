import axios from 'axios'
import { API_URL, JPA_API_URL } from '../Constants'

class LessonDataService {

    retrieveAllLessons() {
        console.log('executed service')
        return axios.get(`${API_URL}/lessons`,
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

    createLesson(Lesson) {
        //console.log('executed service')
        return axios.post(`${API_URL}/Lessons`, Lesson);
    }

}

export default new LessonDataService