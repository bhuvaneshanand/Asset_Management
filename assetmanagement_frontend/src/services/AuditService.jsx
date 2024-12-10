import axios from "axios";

class AuditService {
    BASE_URL = "http://localhost:8080/api/v1/assetapp/audit";

    // Create a new Audit
    createAudit(auditObj,token) {
        return axios({
            method: 'post',
            url: this.BASE_URL + '/createAudit',
            data: auditObj,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
    }

    findAllAudit(token) {
        return axios({
            method: 'get',
            url: this.BASE_URL + '/findAllAudit',
            responseType: 'json',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Authorization': `Bearer ${token}`
            }
        })
    }

    findByAuditId(auditID,token) {
        return axios({
            method: 'get',
            url: this.BASE_URL + "/findByAuditId?id=" + auditID,
            responseType: 'json',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Authorization': `Bearer ${token}`
            }
        })
    }

    // Find Audit entries by Employee ID
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

    // Find Audit entries by Asset ID
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

    // Find Audit entries by Audit Status
    findByAuditStatus(status,token) {
        return axios({
            method: 'get',
            url: this.BASE_URL + '/findByAuditStatus?status=' + status,
            responseType: 'json',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Authorization': `Bearer ${token}`
            }
        });
    }

    // Update an existing Audit by Audit ID
    updateAudit(auditId, auditObj,token) {
        return axios({
            method: 'put',
            url: this.BASE_URL + '/updateAudit?id=' + auditId,
            data: auditObj,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
    }

    deleteAuditById(id,token) {
        return axios({
            method: 'delete',
            url: this.BASE_URL + "/deleteByAuditId?id=" + id,
            responseType: 'json',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Authorization': `Bearer ${token}`
            }
        })
    }
}

export default new AuditService();
