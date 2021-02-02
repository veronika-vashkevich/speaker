import axios from "axios";
import {API_URL} from "../Constants";



class CourseDataService {

    fetchTeacherCourses(username) {
        axios.interceptors.request.use(
            (config) => {

                    config.headers.Authorization = 'Bearer '  + sessionStorage.getItem('token' )

                return config
            }
        );

        return axios.get(`${API_URL}/courses/all`);
    }

}

export default new CourseDataService()
