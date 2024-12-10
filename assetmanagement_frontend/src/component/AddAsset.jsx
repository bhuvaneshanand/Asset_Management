import React, { useEffect, useRef, useState } from 'react';
import { Button, Form, Row, Col } from 'react-bootstrap';
import { Link, useNavigate, useParams } from 'react-router-dom';
import AssetService from '../services/AssetService';
import { useAuth } from '../context/useAuth';
import { Sidenav } from './Sidenav';

const AddAsset = () => {
    const [assetName, setAssetName] = useState('');
    const [assetCategory, setAssetCategory] = useState('');
    const [assetModel, setAssetModel] = useState('');
    const [manufacturingDate, setManufacturingDate] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [assetValue, setAssetValue] = useState('');
    const [status, setStatus] = useState('');
    const [imgUrl,setImgUrl]=useState('');
    const navigate = useNavigate();
    const { id } = useParams();
    const statusOptions = ['Available', 'Assigned', 'In Service'];
    const {auth}= useAuth();
    const token=auth.token;
    const [error, setError] = React.useState("")
    const errorRef = useRef()
    
    const formatDateToDDMMYYYY = (dateString) => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
    };

    useEffect(() => {
        if (id) {
            AssetService.findByAssetId(id,token).then((response) => {
                const asset = response.data;
                setImgUrl(asset.imgUrl);
                setAssetName(asset.assetName);
                setAssetCategory(asset.assetCategory);
                setAssetModel(asset.assetModel);
                setManufacturingDate(asset.manufacturingDate);
                setExpiryDate(asset.expiryDate);
                setAssetValue(asset.assetValue);
                setStatus(asset.status);
            }).catch((error) => {
                console.error("Error fetching asset:", error);
                if (error.response?.status === 403) {
                    console.log("error 403 occured")
                    setError("You cannot add assets")
                }
                else {
                    setError("No Server Response")
                }
            });
        }

        
    }, [id]);

    const handleSaveOrUpdate = (e) => {
        e.preventDefault();
        const formattedManufacturingDate = formatDateToDDMMYYYY(manufacturingDate);
        const formattedExpiryDate = formatDateToDDMMYYYY(expiryDate);
        const asset = {
            imgUrl,
            assetName,
            assetCategory,
            assetModel,
            manufacturingDate: formattedManufacturingDate,
            expiryDate: formattedExpiryDate,
            assetValue,
            status
        };

        if (id) {
            AssetService.updateAsset(asset, id,token).then(() => {
                navigate('/assets');
            }).catch((error) => {
                console.error("Error updating asset:", error);
                if (error.response?.status === 403) {
                    console.log("error 403 occured")
                    setError("You cannot update the assets")
                }
                else {
                    setError("No Server Response")
                }
            });
        } else {
    AssetService.saveAsset(asset,token).then(() => {
            navigate("/assets")
            }).catch((error) => {
                console.error("Error saving asset:", error);
            });
        }
    };

    return (
        <div className="d-flex">
        <Sidenav />
        <div className="content-container d-flex flex-column align-items-center w-100">
        <div className="container">
            <h2 className="text-center" style={{ paddingTop: '25px' }}>{id ? 'Update Asset' : 'Add Asset'}</h2>
            <p ref={errorRef} className={error ? 'errmsg' : 'offscreen'}
                aria-live='assertive'>{error}
            </p>
            <Form onSubmit={handleSaveOrUpdate} style={{ paddingBottom: '25px'}}>
                <Row>
                    <Form.Label column lg={2}>Asset Name</Form.Label>
                    <Col>
                        <Form.Control
                            type="text"
                            value={assetName}
                            onChange={(e) => setAssetName(e.target.value)}
                            placeholder="Enter Asset Name"
                            required
                        />
                    </Col>
                </Row>
                <br />
                <Row>
                    <Form.Label column lg={2}>Asset Image Url</Form.Label>
                    <Col>
                        <Form.Control
                            type="text"
                            value={imgUrl}
                            onChange={(e) => setImgUrl(e.target.value)}
                            placeholder="Enter Asset Image Url"
                            required
                        />
                    </Col>
                </Row>
                <br />
                <Row>
                    <Form.Label column lg={2}>Category</Form.Label>
                    <Col>
                        <Form.Control
                            type="text"
                            value={assetCategory}
                            onChange={(e) => setAssetCategory(e.target.value)}
                            placeholder="Enter Asset Category"
                            required
                        />
                    </Col>
                </Row>
                <br />
                <Row>
                    <Form.Label column lg={2}>Model</Form.Label>
                    <Col>
                        <Form.Control
                            type="text"
                            value={assetModel}
                            onChange={(e) => setAssetModel(e.target.value)}
                            placeholder="Enter Asset Model"
                            required
                        />
                    </Col>
                </Row>
                <br />
                <Row>
                    <Form.Label column lg={2}>Manufacturing Date</Form.Label>
                    <Col>
                        <Form.Control
                            type="date"
                            value={manufacturingDate}
                            onChange={(e) => setManufacturingDate(e.target.value)}
                            placeholder="Enter Manufacturing Date (YYYY-MM-DD)"
                            required
                        />
                    </Col>
                </Row>
                <br />
                <Row>
                    <Form.Label column lg={2}>Expiry Date</Form.Label>
                    <Col>
                        <Form.Control
                            type="date"
                            value={expiryDate}
                            onChange={(e) => setExpiryDate(e.target.value)}
                            placeholder="Enter Expiry Date (YYYY-MM-DD)"
                            required
                        />
                    </Col>
                </Row>
                <br />
                <Row>
                    <Form.Label column lg={2}>Asset Value</Form.Label>
                    <Col>
                        <Form.Control
                            type="number"
                            value={assetValue}
                            onChange={(e) => setAssetValue(e.target.value)}
                            placeholder="Enter Asset Value"
                            required
                        />
                    </Col>
                </Row>
                <br />
                <Row>
                    <Form.Label column lg={2}>Status</Form.Label>
                    <Col>
                        <Form.Control
                            as="select"
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            required
                        >
                            <option value="">Select Status</option>
                            {statusOptions.map((option) => (
                                <option key={option} value={option}>{option}</option>
                            ))}
                        </Form.Control>
                    </Col>
                </Row>
                <br />
                <div className='text-center'>
                <Button type="submit" variant="primary" style={{ width: '250px' }}>{id ? 'Update' : 'Submit'}</Button>
                <br />
                <br />
                <Link to="/assets" className="btn btn-danger" style={{ width: '250px' }}>Cancel</Link>
                </div>
            </Form>
            </div>
        </div>
        </div>
    );
};

export default AddAsset;
