import React from 'react';
import './Model.scss';

export default function Model({ show, title, data, onOk, onCancel, onClose }) {

    const _onOk = () => {
        onOk && onOk();
        onClose && onClose();
    }
    const _onCancel = () => {
        onCancel && onCancel();
        onClose && onClose();
    }

    return (
        <div className={`model ${show && 'show'}`}>
            <div className="content">
                <h3 className="title">{title}</h3>
                <div className="body">
                    内容：{data}

                </div>
                <div className="footer">
                    <div className="cancel" onClick={_onCancel}> 放弃</div>
                    <div className="ok" onClick={_onOk}> 确定</div>

                </div>
            </div>

        </div>
    )
}