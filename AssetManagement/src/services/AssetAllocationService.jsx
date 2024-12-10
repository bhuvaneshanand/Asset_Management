import axios from "axios";

class AssetAllocationService {
    BASE_URL = "http://localhost:8080/api/v1/assetapp/assetallocation";

    // Create new Asset Allocation
    createAssetAllocation(assetAllocationObj, token) {
        return axios({
            method: 'post',
            url: this.BASE_URL + '/createAssetAllocation',
            data: assetAllocationObj,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
    }

    // Find Asset Allocations by Employee ID
    findByEmployeeId(employeeId, token) {
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

    // Find Asset Allocations by Asset ID
    findByAssetId(assetId, token) {
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

    // Find Asset Allocation by Allocation ID
    findAssetAllocationById(allocationId, token) {
        return axios({
            method: 'get',
            url: this.BASE_URL + '/findAssetAllocationById?id=' + allocationId,
            responseType: 'json',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Authorization': `Bearer ${token}`
            }
        });
    }

    // Update an Asset Allocation by Allocation ID
    updateAssetAllocation(allocationId, assetAllocationObj, token) {
        return axios({
            method: 'put',
            url: this.BASE_URL + '/updateAssetAllocation?id=' + allocationId,
            data: assetAllocationObj,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
    }

    findAllAssetAllocations(token) {
        return axios({
            method: 'get',
            url: this.BASE_URL + '/findAllAssetAllocation',
            responseType: 'json',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Authorization': `Bearer ${token}`
            }
        });
    }
    deleteAssetAllocation(id, token) {
        return axios({
            method: 'delete',
            url: this.BASE_URL + "/deleteByAllocationId?id=" + id,
            responseType: 'json',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Authorization': `Bearer ${token}`
            }
        })
    }
}


export default new AssetAllocationService();
