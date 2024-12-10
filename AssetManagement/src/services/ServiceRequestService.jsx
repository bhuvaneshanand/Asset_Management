import axios from "axios";

class ServiceRequestService {
    BASE_URL = "http://localhost:8080/api/v1/assetapp/serviceRequest";

    createRequest(serviceRequestDTO,token) {
        return axios({
            method: 'post',
            url: this.BASE_URL + '/createRequest',
            data: serviceRequestDTO,
            responseType: 'json',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Authorization': `Bearer ${token}`
            }
        });
    }

    findAllServiceRequest(token) {
        return axios({
            method: 'get',
            url: this.BASE_URL + '/serviceRequests',
            responseType: 'json',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Authorization': `Bearer ${token}`
            }
        })
    }

    findByRequestId(requestID,token) {
        return axios({
            method: 'get',
            url: this.BASE_URL + '/findbyRequestId?id=' + requestID,
            responseType: 'json',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Authorization': `Bearer ${token}`
            }
        });
    }

    findByEmployeeId(employeeId,token) {
        return axios({
            method: 'get',
            url: this.BASE_URL + '/findByEmployeeId?id=' + employeeId,
            responseType: 'json',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Authorization': `Bearer ${token}`
            }
        });
    }

    findByAssetId(assetId,token) {
        return axios({
            method: 'get',
            url: this.BASE_URL + '/findByAssetId?id=' + assetId,
            responseType: 'json',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Authorization': `Bearer ${token}`
            }
        });
    }

    findByRequestStatus(status,token) {
        return axios({
            method: 'get',
            url: this.BASE_URL + '/findByRequestStatus?status=' + status,
            responseType: 'json',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Authorization': `Bearer ${token}`
            }
        });
    }

    deleteServiceRequestById(requestId,token) {
        return axios({
            method: 'delete',
            url: this.BASE_URL + '/deleteByServiceRequestId?id=' + requestId,
            responseType: 'json',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Authorization': `Bearer ${token}`
            }
        });
    }

    updateServiceRequest(requestId, serviceRequestDTO,token) {
        return axios({
            method: 'put',
            url: this.BASE_URL + '/updateServiceRequest?id=' + requestId,
            data: serviceRequestDTO,
            responseType: 'json',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Authorization': `Bearer ${token}`
            }
        });
    }
}

export default new ServiceRequestService();
