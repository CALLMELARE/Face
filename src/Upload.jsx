import React, { Component } from 'react';
import Api from './Api';
import Temp from './Temp';
import './card.css';

class Upload extends Component {
    constructor(props) {
        super(props);
        this.fileInput = React.createRef();
        this.state = {
            responseData: Temp,
            image: null,
        }
    }

    upload = () => {
        const reqdata = new FormData();
        // reqdata.append('api_key', Api.api_key);
        // reqdata.append('api_secret', Api.api_secret);
        // reqdata.append('image_file', this.fileInput.current.files[0]);
        // reqdata.append('return_landmark', 2);
        // reqdata.append('return_attributes', Api.return_attributes);
        // reqdata.append('beauty_score_min', 0);
        // reqdata.append('beauty_score_max', 100);
        reqdata.append('file', this.fileInput.current.files[0]);
        // fetch('https://api-cn.faceplusplus.com/facepp/v3/detect', {
        //     method: 'POST',
        //     body: reqdata,
        // }).then(function (response) {
        //     return response.json();
        // }).then(data => {
        //     this.setState({
        //         responseData: data,
        //     })
        // }).catch(e => console.log('错误码:', e))
        fetch('https://xuegong.twtstudio.com/api/uploadPic', {
            method: 'POST',
            body: reqdata,
        }).then(function (response) {
            return response.json();
        }).then(data => {
            this.setState({
                responseData: data,
            })
        }).catch(e => console.log('错误码:', e))
    };

    getGender(data) {
        if (data === "Male") { return "男性" }
        if (data === "Female") { return "女性" }
    }
    getEthnicity(data) {
        if (data === "ASIAN") { return "黄种人" }
        if (data === "WHITE") { return "白种人" }
        if (data === "BLACK") { return "黑种人" }
    }
    render() {
        console.log(this.state.responseData.time_used);
        let elements = [];
        if (this.state.responseData.time_used !== -1) {
            for (let i = 0; i < this.state.responseData.faces.length; i++) {
                elements.push(
                    <div className="card">
                        <div className="sm-card">
                            <p className="sm-title">基本情况</p>
                            <p>{this.getGender(this.state.responseData.faces[i].attributes.gender.value) + ","}
                                {this.state.responseData.faces[i].attributes.age.value + "岁,"}
                                {this.getEthnicity(this.state.responseData.faces[i].attributes.ethnicity.value)}</p>
                        </div>
                        <div className="sm-card">
                            <p className="sm-title">微笑系数</p>
                            <p>标准值：{this.state.responseData.faces[i].attributes.smile.threshold}</p>
                            <p>实际值：{this.state.responseData.faces[i].attributes.smile.value}</p>
                        </div>
                        <div className="sm-card">
                            <p className="sm-title">情绪分析</p>
                            <p>愤怒值：{this.state.responseData.faces[i].attributes.emotion.anger}</p>
                            <p>厌恶值：{this.state.responseData.faces[i].attributes.emotion.disgust}</p>
                            <p>恐惧值：{this.state.responseData.faces[i].attributes.emotion.fear}</p>
                            <p>高兴值：{this.state.responseData.faces[i].attributes.emotion.happiness}</p>
                            <p>平静值：{this.state.responseData.faces[i].attributes.emotion.neutral}</p>
                            <p>伤心值：{this.state.responseData.faces[i].attributes.emotion.sadness}</p>
                            <p>惊讶值：{this.state.responseData.faces[i].attributes.emotion.surprise}</p>
                        </div>
                        <div className="sm-card">
                            <p className="sm-title">颜值系数</p>
                            <p>男性评分：{this.state.responseData.faces[i].attributes.beauty.male_score}</p>
                            <p>女性评分：{this.state.responseData.faces[i].attributes.beauty.female_score}</p>
                        </div>
                    </div>
                )
            }
        }

        return (
            <div className="row">
                <div className="left-side">
                    <form>
                        <input type="file" name='image_file' ref={this.fileInput} />
                        <input type="button" value="上传" onClick={this.upload} />
                    </form>
                    {this.state.responseData.face_num === 0 ? null : <div className="time">{"用时" + this.state.responseData.time_used + "毫秒"}</div>}
                </div>
                <div className="right-side">
                    {this.state.responseData.face_num === 0 ? <div className="tips">{"请先在左侧上传图片"}<p>图片格式：JPG(JPEG)，PNG</p><p>图片像素尺寸：最小 48*48 像素，最大 4096*4096 像素</p><p>图片文件大小：2 MB</p></div> : <div className="count">{"共检测到" + this.state.responseData.face_num + "张人脸"}</div>}
                    {elements}

                </div>
            </div>
        )
    }
}

export default Upload;