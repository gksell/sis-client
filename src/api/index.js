import axios from 'axios'

export const BASE_URL = 'http://localhost:5016/';

export const ENDPOINTS = {
    auth: 'auth',
    teachers: 'teachers',
    courses: 'course',
    students: 'students',
    studentcourses: 'student-courses',
    teachersCourses: 'teachers/{teacherId}/courses',
    notes: 'notes'
}

export const createAPIEndpoint = (endpoint, header) => {

    let url = BASE_URL + 'api/' + endpoint + '/';

    return {
        fetch: () => axios.get(url,header),
        fetchById: id => axios.get(url + id),
        post: newRecord => axios.post(url, newRecord, header),
        put: (id, updatedRecord) => axios.put(url + id, updatedRecord),
        delete: id => axios.delete(url + id),
        fetchWithParams: params => axios.get(url, { ...header, params })
    }
}

export const setRouteWithRole = (role) => {
    let roleList = [];
    switch (role) {
        case "Admin":
            roleList.push("/ana-sayfa");
            roleList.push("/kullanici-ekle");
            roleList.push("/kurs-ekle");
            roleList.push("/kursa-ogrenci-ekle");
            break;
        case "Teacher":
            roleList.push("/ana-sayfa");
            roleList.push("/kurslarim-ogretmen");
            
            break;
        case "Student":
            roleList.push("/ana-sayfa");
            roleList.push("/kurslarim-ogrenci");
            break;

        default:
            break;
    }
    localStorage.setItem("RoleList", roleList);

}