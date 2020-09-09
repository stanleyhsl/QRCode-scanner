import React, { Component } from 'react';
import './About.scss';

export default class About extends Component {
    render() {
        return (
            <div className="about">
                <code className="">
                    功能：<br/>
                    使用手机PC实现纯前端的二维码解码<br/><br/>

                    技术：<br/>
                    1. webRtc实现视频播放<br/>
                    2. canvus截图<br/>
                    3.reqrcode.js解析二维码<br/><br/>

                    使用注意事项：<br/>
                    1.必须使用https协议。<br/>
                    2.手机端使用chrome浏览器，并授权使用摄像头。<br/>
                    3.mac端使用chrome/sarfi,要在mac授权浏览器使用摄像头权限，会自动弹出<br/>“安全隐私->摄像头->允许....”，<br/>
                    还要在浏览器上授权网站使用摄像头权限， 如未提示授权并且无图像，请在网址左侧的“不安全”打开菜单 -> 网站设置 —>权限 -> 摄像头 -> 允许
                </code>
            </div>
        )
    }
}