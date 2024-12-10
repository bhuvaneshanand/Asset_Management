import axios from "axios";

class EmployeeService {
    BASE_URL = "http://localhost:8080/api/v1/assetapp/employee";
    findByUsername(username, token) {
        return axios({
            method: 'get',
            url: this.BASE_URL + '/findByUsername?username=' + username,
            responseType: 'json',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Authorization': `Bearer ${token}`
            }
        });
    }

    findByEmail(email, token) {

        return axios({
            method: 'get',
            url: this.BASE_URL + '/findByEmail?email=' + email,
            responseType: 'json',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Authorization': `Bearer ${token}`
            }
        });
    }

    findAllEmployees(token) {
        return axios({
            method: 'get',
            url: this.BASE_URL + '/findAllEmployee',
            responseType: 'json',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Authorization': `Bearer ${token}`
            }
        });
    }

    deleteEmployeeById(employeeId, token) {
        return axios({
            method: 'delete',
            url: this.BASE_URL + '/deleteByEmployeeId?id=' + employeeId,
            responseType: 'json',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Authorization': `Bearer ${token}`
            }
        });
    }
    findById(id, token) {
        return axios({
            method: 'get',
            url: this.BASE_URL + "/findByEmployeeId?id=" + id,
            responseType: 'json',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Authorization': `Bearer ${token}`
            }
        })
    }

    updateEmployeeById(employeeID, employeeData, token) {
        return axios({
            method: 'put',
            url: this.BASE_URL + '/updateEmployee?id=' + employeeID,
            data: employeeData,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }

        })
    }

}

export default new EmployeeService();
