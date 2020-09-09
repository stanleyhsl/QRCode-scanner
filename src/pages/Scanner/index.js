import React, { Component } from 'react';
import Model from './Model';
import axios from 'axios';
import './index.scss';

export default class Scanner extends Component {
    state = {
        isScaning: true,
        showModel: false,
        data: '',
        cameras: [],
        camera: {},
    }

    componentDidMount() {
        const gotDevices = (devInfos) => {
            let backCamera;
            devInfos.forEach(info => {
                const { deviceId, label = '' } = info;
                let name = '只有一个摄像头';
                const c = {
                    deviceId, label, name
                };
                if (label.includes('front')) {
                    name = '前置摄像头';
                } else if (label.includes('back')) {
                    name = '后置摄像头';
                    backCamera = c;
                }
                Object.assign(c, { name })
                if (info.kind === "videoinput") {
                    this.state.cameras.push(c);
                }
            });
            this.setState({ camera: backCamera || this.state.cameras[0] })
        }

        if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) {
            throw new Error('不支持webRTC');
        }

        navigator.mediaDevices.enumerateDevices()
            .then(gotDevices)
            .catch(err => console.error('获取设备列表出错：', err));
    }

    componentDidUpdate() {
        const { camera, isScaning } = this.state;
        if (!camera.deviceId || !isScaning) {
            return
        }

        const cfg1 = {
            video: {
                // width: document.body.clientWidth,
                // height: 100,
                frameRate: 5,
                facingMode: 'environment' || 'user',
                deviceId: camera.deviceId
            },
            audio: false
        }

        navigator.mediaDevices.getUserMedia(cfg1)
            .then(stream => {
                // 获取视频约束，debug
                const [vTrack] = stream.getVideoTracks();
                const containts = vTrack.getSettings();
                // debugger
                this.vplayer.srcObject = stream;
                console.log(JSON.stringify(containts, null, 4));
                this.begain();
            })
            .catch(err => console.error('获取流出错：', err));
    }

    begain = () => {
        const { canshot, vplayer } = this;
        if (!vplayer) {
            return;
        }
        const { width, height } = vplayer.getBoundingClientRect();
        canshot.width = width;
        canshot.height = height;
        canshot.getContext('2d').drawImage(vplayer, 0, 0, width, height);


        let base64 = canshot.toDataURL('images/png');
        window.qrcode.decode(base64);
        window.qrcode.callback = data => {
            console.log({ data })
            if (data === 'error decoding QR Code') {
                console.log('failed')

                setTimeout(() => {
                    // 截图重新识别
                    this.begain();
                }, 2000)
            } else {
                this.setState({ showModel: true, data, isScaning: false })
                this.vplayer.pause();
                console.log({barcode:data});
            }
        }
    };

    onChangeCamera = (camera) => () => {
        this.setState({ camera });
    }
    onOk = () => {
        
    }

    onCancel = () => { };
    onClose = () => { this.setState({ showModel: false }) };
    reScan = () => { this.setState({ isScaning: true }, () => { this.vplayer.play() }) }

    render() {
        const { isScaning, showModel, data, cameras, camera } = this.state;
        const { onOk, onCancel, onClose } = this;
        return (
            <div className="scanner">
                <div className="row">
                    {
                        cameras.map(it => <div
                            key={it.deviceId}
                            onClick={this.onChangeCamera(it)}
                            className={`camera ${camera === it && 'active'}`}
                        >{it.name}</div>)
                    }
                </div>
                <video autoPlay id="vplayer" playsInline ref={e => {
                    this.vplayer = e;
                }}></video>
                <canvas id="canshot" width="75" ref={e => { this.canshot = e; }}></canvas>
                <Model
                    title="付款码"
                    {...{ show: showModel, data, onOk, onCancel, onClose }}
                />
                {!isScaning && (<div className="continue" onClick={this.reScan}>再次扫描</div>)}
            </div>
        )
    }
}