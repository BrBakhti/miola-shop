import React, { Component } from 'react';

export default class MyToast extends Component {
    render() {
        const { show, message, type } = this.props.children;
        if (!show) return null;
        const isSuccess = type === 'success';
        return (
            <div className="toast-custom" style={{
                background: isSuccess ? '#1a4731' : '#4a1515',
                border: '1px solid ' + (isSuccess ? '#2ea043' : '#f85149'),
            }}>
                <div style={{
                    padding: '10px 16px',
                    background: isSuccess ? '#238636' : '#f85149',
                    color: '#fff',
                    fontWeight: 600,
                    fontSize: '0.9rem'
                }}>
                    {isSuccess ? 'Succes' : 'Information'}
                </div>
                <div style={{
                    padding: '12px 16px',
                    color: isSuccess ? '#3fb950' : '#f85149',
                    fontSize: '0.95rem'
                }}>
                    {message}
                </div>
            </div>
        );
    }
}
