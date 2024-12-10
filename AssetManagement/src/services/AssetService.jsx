import axios from "axios";

class AssetService {
    BASE_URL = "http://localhost:8080/api/v1/assetapp/asset";

    findAllAssets(token) {
        
        return axios({
            method: 'get',
            url: this.BASE_URL + '/findAllAsset',
            responseType: 'json',
            headers: { 'Access-Control-Allow-Origin': '*',
                 'Authorization': `Bearer ${token}`
             }
        })
    }

    saveAsset(assetObj,token) {
       
        return axios({
            method: 'post',
            url: this.BASE_URL + '/createAsset',
            data: assetObj,
            headers: { 'Content-Type': 'application/json',
                 'Authorization': `Bearer ${token}`
             }

        })
    }

    findByAssetId(id,token) {
        
        return axios({
            method: 'get',
            url: this.BASE_URL + "/findByAssetId?id=" + id,
            responseType: 'json',
            headers: { 'Access-Control-Allow-Origin': '*' ,
                 'Authorization': `Bearer ${token}`
            }
        })
    }

    updateAsset(assetObj, id,token) {
       
        return axios({
            method: 'put',
            url: this.BASE_URL + '/updateAsset?id=' + id,
            data: assetObj,
            headers: { 'Content-Type': 'application/json',
                 'Authorization': `Bearer ${token}`
             }

        })
    }

    deleteByAssetId(id,token) {
        
        return axios({
            method: 'delete',
            url: this.BASE_URL + "/deleteByAseetId?id=" + id,
            responseType: 'json',
            headers: { 'Access-Control-Allow-Origin': '*',
                 'Authorization': `Bearer ${token}`
             }
        })
    }

    findByStatus(status,token) {
        return axios({
            method: 'get',
            url: this.BASE_URL + "/findByStatus?status=" + status,
            responseType: 'json',
            headers: { 'Access-Control-Allow-Origin': '*',
                 'Authorization': `Bearer ${token}`
             }
        });
    }

    findByCategory(category,token) {
        return axios({
            method: 'get',
            url: this.BASE_URL + "/findByCategory?category=" + category,
            responseType: 'json',
            headers: { 'Access-Control-Allow-Origin': '*' ,
                 'Authorization': `Bearer ${token}`
            }
        });
    }

}

export default new AssetService();

